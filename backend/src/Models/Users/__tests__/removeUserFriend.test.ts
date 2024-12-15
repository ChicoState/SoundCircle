import { removeUserFriend, findUserByEmail, getUserFriends } from '../user.model'; 
import { User } from '../../../../Types/users';

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

describe('removeUserFriend', () => {
  // Test Case #1: Successfully remove a user friend
  test('should remove a user friend successfully', async () => {
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

    const mockDelUserFriend: User = {
      id: 4,
      username: 'del_user_friend',
      email: 'del.user@example.com',
      userPostIds: [],
      locationName: 'Los Angeles',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    const updatedUser = {
      ...mockCurrentUser,
      friends: [2, 3],
    };

    // Mock the findUserByEmail function to return the mockCurrentUser and mockDelUserFriend
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockCurrentUser]);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockDelUserFriend]);
    
    // Mock the getUserFriends function to return the mockCurrentUser's friends list
    (getUserFriends as jest.Mock).mockResolvedValueOnce(mockCurrentUser.friends);
    
    // Mock the returning method to return the updatedUser
    (mockReturning as jest.Mock).mockResolvedValueOnce([updatedUser]);

    // Call the function to be tested
    const result = await removeUserFriend('current.user@example.com', 'del.user@example.com');

    // Verify that the result matches the mock data
    expect(result).toEqual(updatedUser);
  });

  // Test Case #2: Empty username passed
  test('should throw an error if currentUser or delUserFriend is empty', async () => {
    // Verify that the function throws the expected error when currentUser or delUserFriend is empty
    await expect(removeUserFriend('', 'del.user@example.com')).rejects.toThrow('Cannot remove friend, empty username passed');
    await expect(removeUserFriend('current.user@example.com', '')).rejects.toThrow('Cannot remove friend, empty username passed');
  });

  // Test Case #3: Current user and del user friend are the same
  test('should throw an error if currentUser and delUserFriend are the same', async () => {
    // Verify that the function throws the expected error when currentUser and delUserFriend are the same
    await expect(removeUserFriend('current.user@example.com', 'current.user@example.com')).rejects.toThrow('Current user and new user friend are the same');
  });

  // Test Case #4: User not found
  test('should throw an error if the user is not found', async () => {
    // Mock the findUserByEmail function to return an empty array to simulate user not found
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([]);

    // Verify that the function throws the expected error
    await expect(removeUserFriend('current.user@example.com', 'nonexistent@example.com')).rejects.toThrow('Unable to find user current.user@example.com');
  });

  // Test Case #5: Users are not friends
  test('should throw an error if users are not friends', async () => {
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

    const mockDelUserFriend: User = {
      id: 4,
      username: 'del_user_friend',
      email: 'del.user@example.com',
      userPostIds: [],
      locationName: 'Los Angeles',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    // Mock the findUserByEmail function to return the mockCurrentUser and mockDelUserFriend
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockCurrentUser]);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockDelUserFriend]);
    
    // Mock the getUserFriends function to return the mockCurrentUser's friends list
    (getUserFriends as jest.Mock).mockResolvedValueOnce(mockCurrentUser.friends);

    // Verify that the function throws the expected error when users are not friends
    await expect(removeUserFriend('current.user@example.com', 'del.user@example.com')).rejects.toThrow('del.user@example.com is not friends with current.user@example.com, cannot remove friend');
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
      friends: [2, 3, 4],
    };

    const mockDelUserFriend: User = {
      id: 4,
      username: 'del_user_friend',
      email: 'del.user@example.com',
      userPostIds: [],
      locationName: 'Los Angeles',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    // Mock the findUserByEmail function to return the mockCurrentUser and mockDelUserFriend
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockCurrentUser]);
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockDelUserFriend]);
    
    // Mock the getUserFriends function to return the mockCurrentUser's friends list
    (getUserFriends as jest.Mock).mockResolvedValueOnce(mockCurrentUser.friends);
    
    // Mock the returning method to throw an error
    (mockReturning as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(removeUserFriend('current.user@example.com', 'del.user@example.com')).rejects.toThrow(`Unable to remove del.user@example.com from current.user@example.com's friends list`);
  });
});
