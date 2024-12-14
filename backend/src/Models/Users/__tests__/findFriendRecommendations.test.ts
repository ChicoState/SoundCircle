import { findFriendRecommendations, findUserByEmail } from '../user.model';
import { User } from '../../../../Types/users';

// Mock the database methods
const mockWhereNot = jest.fn().mockReturnThis();
const mockOrderByRaw = jest.fn().mockReturnThis();
const mockLimit = jest.fn().mockReturnThis();
const mockSelect = jest.fn().mockReturnThis();

// Mock the findUserByEmail function
jest.mock('../user.model', () => ({
  ...jest.requireActual('../user.model'),
  findUserByEmail: jest.fn(),
}));

// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    whereNot: mockWhereNot,
    orderByRaw: mockOrderByRaw,
    limit: mockLimit,
    select: mockSelect,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('findFriendRecommendations', () => {
  // Test Case #1: Successfully get friend recommendations
  test('should return friend recommendations successfully', async () => {
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

    const mockRecommendations: User[] = [
      {
        id: 5,
        username: 'user_1',
        email: 'user1@example.com',
        userPostIds: [],
        locationName: 'Los Angeles',
        longitude: 0,
        latitude: 0,
        created_at: new Date(),
        friends: [],
      },
      {
        id: 6,
        username: 'user_2',
        email: 'user2@example.com',
        userPostIds: [],
        locationName: 'Chicago',
        longitude: 0,
        latitude: 0,
        created_at: new Date(),
        friends: [],
      },
    ];

    // Mock the findUserByEmail function to return the mockUser
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    
    // Mock the limit method to return the mockRecommendations
    (mockLimit as jest.Mock).mockResolvedValueOnce(mockRecommendations);

    // Call the function to be tested
    const result = await findFriendRecommendations('john.doe@example.com', 2, 1);

    // Verify that the result matches the mock data
    expect(result).toEqual(mockRecommendations);
  });

  // Test Case #2: Empty username provided
  test('should throw an error if userEmail is empty', async () => {
    // Verify that the function throws the expected error when userEmail is empty
    await expect(findFriendRecommendations('', 2, 1)).rejects.toThrow('Empty or null username provided');
  });

  // Test Case #3: User not found
  test('should throw an error if user is not found', async () => {
    // Mock the findUserByEmail function to return an empty array to simulate user not found
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([]);

    // Verify that the function throws the expected error
    await expect(findFriendRecommendations('nonexistent@example.com', 2, 1)).rejects.toThrow('Unable to find user nonexistent@example.com');
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
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    
    // Mock the limit method to throw an error
    (mockLimit as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(findFriendRecommendations('john.doe@example.com', 2, 1)).rejects.toThrow('Unable to get friend recommendations');
  });
});
