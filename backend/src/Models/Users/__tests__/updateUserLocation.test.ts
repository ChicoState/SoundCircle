import { updateUserLocation } from '../user.model';
import { User } from '../../../../Types/users';

// Mock the database methods
const mockWhere = jest.fn().mockReturnThis();
const mockFirst = jest.fn();
const mockUpdate = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockReturnThis();

// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    where: mockWhere,
    first: mockFirst,
    update: mockUpdate,
    returning: mockReturning,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('updateUserLocation', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  // Test Case #1: Successfully update user location
  test('should update user location successfully', async () => {
    const mockUser: User = {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      userPostIds: [],
      locationName: 'Old Location',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    const updatedUser: User = {
      ...mockUser,
      latitude: 40.7128,
      longitude: -74.0060,
      locationName: 'New York',
    };

    // Mock the first method to return the mockUser
    mockFirst.mockResolvedValueOnce(mockUser);

    // Mock the returning method to return the updatedUser
    mockReturning.mockResolvedValueOnce([updatedUser]);

    // Call the function to be tested
    const result = await updateUserLocation(mockUser.id, 40.7128, -74.0060, 'New York');

    // Verify that the result matches the mock data
    expect(result).toEqual(updatedUser);

    // Verify interactions with the mock db methods
    expect(mockWhere).toHaveBeenCalledWith('id', mockUser.id);
    expect(mockFirst).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledWith({
      latitude: 40.7128,
      longitude: -74.0060,
      locationName: 'New York'
    });
    expect(mockReturning).toHaveBeenCalledWith(['id', 'username', 'userPostIds', 'created_at', 'latitude', 'longitude', 'email', 'locationName', 'friends']);
  });

  // Test Case #2: User not found
  test('should throw an error if user is not found', async () => {
    // Mock the first method to return null
    mockFirst.mockResolvedValueOnce(null);

    // Verify that the function throws the expected error
    await expect(updateUserLocation(999, 40.7128, -74.0060, 'New York')).rejects.toThrow('User with ID 999 does not exist.');
    
    // Check that console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating user location', new Error('User with ID 999 does not exist.'));
  });

  // Test Case #3: Database failure during update
  test('should throw an error on database failure', async () => {
    const mockUser: User = {
      id: 1,
      username: 'john_doe',
      email: 'john.doe@example.com',
      userPostIds: [],
      locationName: 'Old Location',
      longitude: 0,
      latitude: 0,
      created_at: new Date(),
      friends: [],
    };

    // Mock the first method to return the mockUser
    mockFirst.mockResolvedValueOnce(mockUser);

    // Mock the returning method to throw an error
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(updateUserLocation(1, 40.7128, -74.0060, 'New York')).rejects.toThrow('Failed to update user location');
    
    // Check that console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating user location', new Error('Database error'));
  });
});
