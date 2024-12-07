import { addUserFriend, findUserByEmail, getUserFriends } from '../user.model'; // Adjust the path if needed
import { User } from '../../../../Types/users'; // Correct import path for User type

// Mock the database methods
const mockWhere = jest.fn().mockReturnThis();
const mockUpdate = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockReturnThis();

// Mock the findUserByEmail and getUserFriends functions
jest.mock('../user.model', () => ({
  ...jest.requireActual('../user.model'),
  findUserByEmail: jest.fn(),
  getUserFriends: jest.fn(),
}));

// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    where: mockWhere,
    update: mockUpdate,
    returning: mockReturning,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('addUserFriend', () => {
  // Test Case #1: Successfully add a new user friend
  test('should add a new user friend successfully', async () => {
    const mockCurrentUser: User = {
      id: 1,
      username: 'current_user',
      email: 'current.user@example.com',
      userPostIds: [],
      locationName: 'New York',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [2, 3],
    };

    const mockNewUserFriend: User = {
      id: 4,
      username: 'new_user_friend',
      email: 'new.user@example.com',
      userPostIds: [],
      locationName: 'Los Angeles',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    const updatedUser = {
      ...mockCurrentUser,
      friends: [2, 3, 4],
    };

    // Mock the findUserByEmail function to return the mockCurrentUser and mockNewUserFriend
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockCurrentUser]);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockNewUserFriend]);
    
    // Mock the getUserFriends function to return the mockCurrentUser's friends list
    (getUserFriends as jest.Mock).mockResolvedValueOnce(mockCurrentUser.friends);
    
    // Mock the returning method to return the updatedUser
    (mockReturning as jest.Mock).mockResolvedValueOnce([updatedUser]);

    // Call the function to be tested
    const result = await addUserFriend('current.user@example.com', 'new.user@example.com');

    // Verify that the result matches the mock data
    expect(result).toEqual(updatedUser);
  });

  // Test Case #2: Empty username passed
  test('should throw an error if currentUser or newUserFriend is empty', async () => {
    // Verify that the function throws the expected error when currentUser or newUserFriend is empty
    await expect(addUserFriend('', 'new.user@example.com')).rejects.toThrow('Cannot add new friend, empty username passed');
    await expect(addUserFriend('current.user@example.com', '')).rejects.toThrow('Cannot add new friend, empty username passed');
  });

  // Test Case #3: Current user and new user friend are the same
  test('should throw an error if currentUser and newUserFriend are the same', async () => {
    // Verify that the function throws the expected error when currentUser and newUserFriend are the same
    await expect(addUserFriend('current.user@example.com', 'current.user@example.com')).rejects.toThrow('Current user and new user friend are the same');
  });

  // Test Case #4: User not found
  test('should throw an error if the user is not found', async () => {
    // Mock the findUserByEmail function to return null to simulate user not found
    (findUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    // Verify that the function throws the expected error
    await expect(addUserFriend('current.user@example.com', 'nonexistent@example.com')).rejects.toThrow('Unable to find user current.user@example.com');
  });

  // Test Case #5: Users are already friends
  test('should throw an error if users are already friends', async () => {
    const mockCurrentUser: User = {
      id: 1,
      username: 'current_user',
      email: 'current.user@example.com',
      userPostIds: [],
      locationName: 'New York',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [2, 3, 4],
    };

    const mockNewUserFriend: User = {
      id: 4,
      username: 'new_user_friend',
      email: 'new.user@example.com',
      userPostIds: [],
      locationName: 'Los Angeles',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    // Mock the findUserByEmail function to return the mockCurrentUser and mockNewUserFriend
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockCurrentUser]);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockNewUserFriend]);
    
    // Mock the getUserFriends function to return the mockCurrentUser's friends list
    (getUserFriends as jest.Mock).mockResolvedValueOnce(mockCurrentUser.friends);

    // Verify that the function throws the expected error when users are already friends
    await expect(addUserFriend('current.user@example.com', 'new.user@example.com')).rejects.toThrow('new.user@example.com already friends with current.user@example.com, cannot add duplicate');
  });

  // Test Case #6: Database failure
  test('should throw an error on database failure', async () => {
    const mockCurrentUser: User = {
      id: 1,
      username: 'current_user',
      email: 'current.user@example.com',
      userPostIds: [],
      locationName: 'New York',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [2, 3],
    };

    const mockNewUserFriend: User = {
      id: 4,
      username: 'new_user_friend',
      email: 'new.user@example.com',
      userPostIds: [],
      locationName: 'Los Angeles',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    // Mock the findUserByEmail function to return the mockCurrentUser and mockNewUserFriend
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockCurrentUser]);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockNewUserFriend]);
    
    // Mock the getUserFriends function to return the mockCurrentUser's friends list
    (getUserFriends as jest.Mock).mockResolvedValueOnce(mockCurrentUser.friends);
    
    // Mock the returning method to throw an error
    (mockReturning as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(addUserFriend('current.user@example.com', 'new.user@example.com')).rejects.toThrow(`Unable to add user new.user@example.com to current.user@example.com's friends list`);
  });
});
