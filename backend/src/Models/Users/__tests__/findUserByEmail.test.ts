import { findUserByEmail } from '../user.model';
import { User } from '../../../../Types/users';

// Mock the database select and where methods
const mockSelect = jest.fn().mockReturnThis();
const mockWhere = jest.fn().mockReturnThis();

// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    select: mockSelect,
    where: mockWhere,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks();
});

describe('findUserByEmail', () => {
  // Test Case #1: Successfully find user by email
  test('should find a user by email', async () => {
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

    // Mock the where method to resolve with the mockUser
    mockWhere.mockResolvedValueOnce([mockUser]);

    // Call the function under test
    const result = await findUserByEmail('john.doe@example.com');

    // Verify that the result matches the mock data
    expect(result).toEqual([mockUser]);
  });

  // Test Case #2: No user found by email
  test('should return an empty array if no user is found', async () => {
    // Mock the where method to resolve with an empty array
    mockWhere.mockResolvedValueOnce([]);

    // Call the function under test
    const result = await findUserByEmail('nonexistent@example.com');

    // Verify that the result is an empty array
    expect(result).toEqual([]);
  });

  // Test Case #3: Database failure
  test('should throw an error on database failure', async () => {
    // Mock the where method to reject with an error
    mockWhere.mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(findUserByEmail('john.doe@example.com')).rejects.toThrow('Failed to fetch user by email');
  });
});
