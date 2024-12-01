import { getUserFriends, findUserByEmail } from '../user.model'; // Adjust the path if needed
import { User } from '../../../../Types/users'; // Correct import path for User type

// Mock the database methods
const mockWhere = jest.fn().mockReturnThis();
const mockSelect = jest.fn().mockReturnThis();
const mockFirst = jest.fn();

// Mock the findUserByEmail function
jest.mock('../user.model', () => ({
  ...jest.requireActual('../user.model'),
  findUserByEmail: jest.fn(),
}));

jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    where: mockWhere,
    select: mockSelect,
    first: mockFirst,
  })),
}));

afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('getUserFriends', () => {
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

    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    (mockFirst as jest.Mock).mockResolvedValueOnce(mockFriendList);

    const result = await getUserFriends('john.doe@example.com');
    expect(result).toEqual([2, 3, 4]);
  });

  // Test Case #2: User not found
  test('should throw an error if user is not found', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([]);

    await expect(getUserFriends('nonexistent@example.com')).rejects.toThrow('User not found');
  });

  // Test Case #3: Empty userEmail
  test('should throw an error if userEmail is empty', async () => {
    await expect(getUserFriends('')).rejects.toThrow('Unable to get user friends, empty userEmail');
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

    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    (mockFirst as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    await expect(getUserFriends('john.doe@example.com')).rejects.toThrow('Failed to retrieve user friends');
  });
});
