import { findUserByID } from '../user.model';
import { User } from '../../../../Types/users';

// Mock the db methods
const mockSelect = jest.fn().mockReturnThis();
const mockWhere = jest.fn().mockReturnThis();
const mockFirst = jest.fn();

// Mocking the database module to return the mocked db methods
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    select: mockSelect,
    where: mockWhere,
    first: mockFirst,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks();
});

describe('findUserByID', () => {
  // Test Case #1: Successfully find user by ID
  test('should find a user by ID', async () => {
    const mockUser: User = {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      userPostIds: [],
      locationName: 'New York',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    // Mock the first method to resolve with the mockUser
    mockFirst.mockResolvedValueOnce(mockUser);

    // Call the function under test
    const result = await findUserByID(1);

    // Verify that the result matches the mock data
    expect(result).toEqual(mockUser);
    // Verify interactions with the mock db methods
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockWhere).toHaveBeenCalledWith('id', 1);
    expect(mockFirst).toHaveBeenCalled();
  });

  // Test Case #2: Handle database error
  test('should throw an error if the database query fails', async () => {
    // Mock the first method to reject with an error
    mockFirst.mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(findUserByID(1)).rejects.toThrow('Failed to fetch user by id');
  });
});
