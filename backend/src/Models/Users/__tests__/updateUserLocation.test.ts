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

jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    where: mockWhere,
    update: mockUpdate,
    returning: mockReturning,
  })),
}));

afterEach(() => {
  jest.clearAllMocks(); // Reset mocks after each test
});

describe('updateUserLocation', () => {
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

    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    mockReturning.mockResolvedValueOnce([updatedUser]);

    const result = await updateUserLocation('john.doe@example.com', 40.7128, -74.0060, 'New York');
    expect(result).toEqual(updatedUser);
  });

  // Test Case #2: User not found
  test('should throw an error if user is not found', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValueOnce([]);

    await expect(updateUserLocation('nonexistent@example.com', 40.7128, -74.0060, 'New York')).rejects.toThrow('User nonexistent@example.com not found');
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

    (findUserByEmail as jest.Mock).mockResolvedValueOnce([mockUser]);
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    await expect(updateUserLocation('john.doe@example.com', 40.7128, -74.0060, 'New York')).rejects.toThrow('Failed to update user location');
  });
});
