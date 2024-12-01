import { createNewUserProfile } from '../user.model'; // Adjust the path if needed
import { User } from '../../../../Types/users'; // Importing User type

// Mock the database insert and returning methods
const mockInsert = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockReturnThis();

// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    insert: mockInsert,
    returning: mockReturning,
  })),
}));

afterEach(() => {
  jest.clearAllMocks();  // Reset mocks after each test
});

describe('createNewUserProfile', () => {
  // Test Case #1: Successful user creation
  test('should create a new user', async () => {
    const mockNewUser: User = {
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

    // Mock the insert method to resolve with the mockNewUser
    mockReturning.mockResolvedValueOnce([mockNewUser]);

    const result = await createNewUserProfile('john_doe', 'New York', 'john.doe@example.com');
    expect(result).toEqual(mockNewUser);
  });

  // Test Case #2: Missing username or email
  test('should throw error if username or email is missing', async () => {
    await expect(createNewUserProfile('', 'New York', 'john.doe@example.com')).rejects.toThrow('Username and email cannot be null or empty');
    await expect(createNewUserProfile('john_doe', 'New York', '')).rejects.toThrow('Username and email cannot be null or empty');
  });

  // Test Case #3: Database failure
  test('should throw error on database failure', async () => {
    // Mock database failure on insert
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    await expect(createNewUserProfile('john_doe', 'New York', 'john.doe@example.com')).rejects.toThrow('Failed to create user');
  });
});
