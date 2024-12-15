import { findPosts } from '../post.model';

// Mock the db module with correct chaining behavior
const mockSelect = jest.fn().mockReturnThis();
const mockOrderBy = jest.fn().mockReturnThis();
const mockLimit = jest.fn().mockReturnThis();
const mockOffset = jest.fn().mockReturnThis();

// Mocking the database module to return the mocked db methods
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    select: mockSelect,
    orderBy: mockOrderBy,
    limit: mockLimit,
    offset: mockOffset,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks();
});

describe('findPosts', () => {
  // Test Case #1: Successfully fetch posts
  test('should fetch posts successfully', async () => {
    const mockPosts = [
      {
        id: 1,
        user_id: 123,
        username: 'user1',
        post_content: 'First Post',
        created_at: new Date(),
        comment_ids: [],
        reactions: 0,
        locationName: '',
        latitude: 0,
        longitude: 0,
      },
    ];

    // Mock the offset method to resolve with mockPosts
    mockOffset.mockResolvedValueOnce(mockPosts);

    const limit = 5;
    const offset = 0;

    // Call the function under test
    const result = await findPosts(limit, offset);

    // Verify the result matches the mock data
    expect(result).toEqual(mockPosts);

    // Verify interactions with the mock db methods
    expect(mockSelect).toHaveBeenCalledWith('id', 'user_id', 'username', 'post_content', 'created_at', 'comment_ids', 'reactions', 'locationName', 'latitude', 'longitude');
    expect(mockOrderBy).toHaveBeenCalledWith('created_at', 'desc');
    expect(mockLimit).toHaveBeenCalledWith(limit);
    expect(mockOffset).toHaveBeenCalledWith(offset);
  });

  // Test Case #2: Handle database error
  test('should throw an error if the database query fails', async () => {
    // Mock the offset method to reject with an error
    mockOffset.mockRejectedValueOnce(new Error('Database error'));

    const limit = 5;
    const offset = 0;

    // Verify that the function throws the expected error
    await expect(findPosts(limit, offset)).rejects.toThrow('Failed to fetch posts with comments');
  });
});
