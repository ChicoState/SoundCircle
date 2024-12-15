import { createNewUserProfile } from '../user.model';
import { User } from '../../../../Types/users';

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

// Clear all mocks after each test to ensure a clean slate for each test case
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

    // Call the function to be tested
    const result = await createNewUserProfile('john_doe', 'New York', 0, 0, 'john.doe@example.com');

    // Verify that the result matches the mock data
    expect(result).toEqual(mockNewUser);
  });

  // Test Case #2: Missing username or email
  test('should throw error if username or email is missing', async () => {
    // Verify that the function throws the expected error when username is missing
    await expect(createNewUserProfile('', 'New York', 0, 0, 'john.doe@example.com')).rejects.toThrow('Username and email cannot be null or empty');
    // Verify that the function throws the expected error when email is missing
    await expect(createNewUserProfile('john_doe', 'New York', 0, 0, '')).rejects.toThrow('Username and email cannot be null or empty');
  });

  // Test Case #3: Database failure
  test('should throw error on database failure', async () => {
    // Mock database failure on insert
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(createNewUserProfile('john_doe', 'New York', 0, 0, 'john.doe@example.com')).rejects.toThrow('Failed to create user');
  });
});
