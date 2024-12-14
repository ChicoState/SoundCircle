import { getUserFriends, findUserByEmail } from '../user.model';
import { User } from '../../../../Types/users';

// Mock the database methods
const mockWhere = jest.fn().mockReturnThis();
const mockSelect = jest.fn().mockReturnThis();
const mockFirst = jest.fn();

// Mock the findUserByEmail function
jest.mock('../user.model', () => ({
  ...jest.requireActual('../user.model'),
  findUserByEmail: jest.fn(),
}));

// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    where: mockWhere,
    select: mockSelect,
    first: mockFirst,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('getUserFriends', () => {
  beforeEach(() => {
    console.log = jest.fn(); // Mock console.log
    console.error = jest.fn(); // Mock console.error
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  // Test Case #1: Successfully retrieve user friends
  test('should return the list of user friends', async () => {
    const mockUser: User = {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      userPostIds: [],
      locationName: 'New York',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [2, 3, 4],
    };

    const mockFriendList = { friends: [2, 3, 4] };

    // Mock the findUserByEmail function to return the mockUser
    (findUserByEmail as jest.Mock).mockResolvedValue([mockUser]);

    // Mock the first method to return the mockFriendList
    mockFirst.mockResolvedValue(mockFriendList);

    // Call the function to be tested
    const result = await getUserFriends('john.doe@example.com');

    // Verify that the result matches the mock data
    expect(result).toEqual([2, 3, 4]);

    // Check the logs
    expect(console.log).toHaveBeenCalledWith(`Getting john.doe@example.com's friend IDs`);
  });

  // Test Case #2: User not found
  test('should throw an error if user is not found', async () => {
    // Mock the findUserByEmail function to return an empty array
    (findUserByEmail as jest.Mock).mockResolvedValue([]);

    // Verify that the function throws the expected error
    await expect(getUserFriends('nonexistent@example.com')).rejects.toThrow('User not found');

    // Check the logs
    expect(console.error).toHaveBeenCalledWith(`Error retrieving user friends Error: User not found`);
  });

  // Test Case #3: Empty userEmail
  test('should throw an error if userEmail is empty', async () => {
    // Verify that the function throws the expected error when userEmail is empty
    await expect(getUserFriends('')).rejects.toThrow('Unable to get user friends, empty userEmail');

    // Check the logs
    expect(console.error).toHaveBeenCalledWith(`Error retrieving user friends Error: Unable to get user friends, empty userEmail`);
  });

  // Test Case #4: Database failure
  test('should throw an error on database failure', async () => {
    const mockUser: User = {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      userPostIds: [],
      locationName: 'New York',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [2, 3, 4],
    };

    // Mock the findUserByEmail function to return the mockUser
    (findUserByEmail as jest.Mock).mockResolvedValue([mockUser]);

    // Mock the first method to throw an error
    mockFirst.mockRejectedValue(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(getUserFriends('john.doe@example.com')).rejects.toThrow('Failed to retrieve user friends');

    // Check the logs
    expect(console.error).toHaveBeenCalledWith(`Database error retrieving user friends: Error: Database error`);
  });
});
