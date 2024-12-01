import { findPostsByLocation } from '../post.model';

// Mock the db module with correct chaining behavior
const mockSelect = jest.fn().mockReturnThis();
const mockWhere = jest.fn().mockReturnThis();
const mockAndWhere = jest.fn().mockReturnThis();
const mockOrderBy = jest.fn().mockReturnThis();
const mockLimit = jest.fn().mockReturnThis();
const mockOffset = jest.fn().mockResolvedValue([]);

jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    select: mockSelect,
    where: mockWhere,
    andWhere: mockAndWhere,
    orderBy: mockOrderBy,
    limit: mockLimit,
    offset: mockOffset,
  }))
}));

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});

describe('findPostsByLocation', () => {
  test('should return posts within the location range when the database query succeeds', async () => {
    const mockPosts = [
      {
        id: 1,
        user_id: 123,
        username: 'user1',
        post_content: 'Nearby Post',
        created_at: new Date(),
        comments: 0,
        reactions: 0,
        locationName: 'Park',
        latitude: 10,
        longitude: 20,
      },
    ];

    // Mock the 'offset' method to return posts when called
    mockOffset.mockResolvedValueOnce(mockPosts);

    const limit = 5;
    const offset = 0;
    const latitude = 10;
    const longitude = 20;
    const searchDistance = 10;

    const latRange = searchDistance / 69;
    const lngRange = searchDistance / (69 * Math.cos((latitude * Math.PI) / 180));

    // Call the function under test
    const result = await findPostsByLocation(limit, offset, latitude, longitude, searchDistance);

    // Verify the results and interactions with the mock database methods
    expect(result).toEqual(mockPosts); // Ensure the result matches mock data
    expect(mockWhere).toHaveBeenCalledWith('latitude', '>=', latitude - latRange); // Check latitude range check
    expect(mockAndWhere).toHaveBeenCalledWith('latitude', '<=', latitude + latRange); // Ensure latitude upper bound check
    expect(mockAndWhere).toHaveBeenCalledWith('longitude', '>=', longitude - lngRange); // Ensure longitude lower bound check
    expect(mockAndWhere).toHaveBeenCalledWith('longitude', '<=', longitude + lngRange); // Ensure longitude upper bound check
    expect(mockOrderBy).toHaveBeenCalledWith('created_at', 'desc'); // Ensure ordering is correct
  });

  test('should throw an error if the database query fails', async () => {
    // Mock the offset method to reject with an error
    mockOffset.mockRejectedValueOnce(new Error('Database error'));

    const limit = 5;
    const offset = 0;
    const latitude = 10;
    const longitude = 20;
    const searchDistance = 10;

    // Verify that the error is thrown
    await expect(findPostsByLocation(limit, offset, latitude, longitude, searchDistance)).rejects.toThrow('Database error');
  });
});
