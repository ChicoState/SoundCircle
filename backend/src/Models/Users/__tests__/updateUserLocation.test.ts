<<<<<<< HEAD
import { updateUserLocation } from '../user.model';
import { User } from '../../../../Types/users';

// Mock the database methods
const mockWhere = jest.fn().mockReturnThis();
const mockFirst = jest.fn();
const mockUpdate = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockReturnThis();

=======
import { updateUserLocation, findUserByEmail } from '../user.model'; // Adjust the path if needed
import { User } from '../../../../Types/users'; // Correct import path for User type

// Mock the database methods
const mockWhere = jest.fn().mockReturnThis();
const mockUpdate = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockReturnThis();

// Mock the findUserByEmail function
jest.mock('../user.model', () => ({
  ...jest.requireActual('../user.model'),
  findUserByEmail: jest.fn(),
}));

>>>>>>> newTesting
// Mock the db instance
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    where: mockWhere,
<<<<<<< HEAD
    first: mockFirst,
=======
>>>>>>> newTesting
    update: mockUpdate,
    returning: mockReturning,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('updateUserLocation', () => {
<<<<<<< HEAD
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

=======
>>>>>>> newTesting
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

<<<<<<< HEAD
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
=======
    // Mock the findUserByEmail function to return the mockUser
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    
    // Mock the returning method to return the updatedUser
    (mockReturning as jest.Mock).mockResolvedValueOnce([updatedUser]);

    // Call the function to be tested
    const result = await updateUserLocation('john.doe@example.com', 40.7128, -74.0060, 'New York');

    // Verify that the result matches the mock data
    expect(result).toEqual(updatedUser);
>>>>>>> newTesting
  });

  // Test Case #2: User not found
  test('should throw an error if user is not found', async () => {
<<<<<<< HEAD
    // Mock the first method to return null
    mockFirst.mockResolvedValueOnce(null);

    // Verify that the function throws the expected error
    await expect(updateUserLocation(999, 40.7128, -74.0060, 'New York')).rejects.toThrow('User with ID 999 does not exist.');
    
    // Check that console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating user location', new Error('User with ID 999 does not exist.'));
=======
    // Mock the findUserByEmail function to return an empty array
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([]);

    // Verify that the function throws the expected error
    await expect(updateUserLocation('nonexistent@example.com', 40.7128, -74.0060, 'New York')).rejects.toThrow('User nonexistent@example.com not found');
>>>>>>> newTesting
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

<<<<<<< HEAD
    // Mock the first method to return the mockUser
    mockFirst.mockResolvedValueOnce(mockUser);

    // Mock the returning method to throw an error
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(updateUserLocation(1, 40.7128, -74.0060, 'New York')).rejects.toThrow('Failed to update user location');
    
    // Check that console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating user location', new Error('Database error'));
=======
    // Mock the findUserByEmail function to return the mockUser
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    
    // Mock the returning method to throw an error
    (mockReturning as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Verify that the function throws the expected error
    await expect(updateUserLocation('john.doe@example.com', 40.7128, -74.0060, 'New York')).rejects.toThrow('Failed to update user location');
>>>>>>> newTesting
  });
});
