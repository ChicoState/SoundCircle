import { findComments } from '../post.model';
import { UserPost } from '../../../../Types/posts';

// Mock the db module with correct chaining behavior
const mockSelect = jest.fn().mockReturnThis();
const mockWhereIn = jest.fn().mockReturnThis();
const mockOrderBy = jest.fn().mockReturnThis();
const mockLimit = jest.fn().mockReturnThis();
const mockOffset = jest.fn().mockReturnThis();

// Mocking the database module to return the mocked db methods
jest.mock('../../../db/db', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    select: mockSelect,
    whereIn: mockWhereIn,
    orderBy: mockOrderBy,
    limit: mockLimit,
    offset: mockOffset,
  })),
}));

// Clear all mocks after each test to ensure a clean slate for each test case
afterEach(() => {
  jest.clearAllMocks();
});

describe('findComments', () => {
  // Test Case #1: Successfully fetch comments
  test('should fetch comments successfully', async () => {
    const mockComments: UserPost[] = [
      {
        id: 1,
        user_id: 123,
        username: 'user1',
        post_content: 'First Comment',
        created_at: new Date(),
        comment_ids: [],
        reactions: 0,
        locationName: '',
        latitude: 0,
        longitude: 0,
      },
    ];

    // Mock the offset method to resolve with mockComments
    mockOffset.mockResolvedValueOnce(mockComments);

    const limit = 5;
    const offset = 0;
    const commentIDs = [1];

    // Call the function under test
    const result = await findComments(limit, offset, commentIDs);

    // Verify the result matches the mock data
    expect(result).toEqual(mockComments);

    // Verify interactions with the mock db methods
    expect(mockSelect).toHaveBeenCalledWith('id', 'user_id', 'username', 'comment_content', 'created_at', 'reactions');
    expect(mockWhereIn).toHaveBeenCalledWith('id', commentIDs);
    expect(mockOrderBy).toHaveBeenCalledWith('created_at', 'desc');
    expect(mockLimit).toHaveBeenCalledWith(limit);
    expect(mockOffset).toHaveBeenCalledWith(offset);
  });

  // Test Case #2: Return empty array if commentIDs is empty
  test('should return an empty array if commentIDs is empty', async () => {
    const limit = 5;
    const offset = 0;
    const commentIDs: number[] = [];

    // Call the function under test
    const result = await findComments(limit, offset, commentIDs);

    // Verify that the result is an empty array
    expect(result).toEqual([]);
  });

  // Test Case #3: Handle database error
  test('should throw an error if the database query fails', async () => {
    // Mock the offset method to reject with an error
    mockOffset.mockRejectedValueOnce(new Error('Database error'));

    const limit = 5;
    const offset = 0;
    const commentIDs = [1];

    // Verify that the function throws the expected error
    await expect(findComments(limit, offset, commentIDs)).rejects.toThrow('Failed to fetch comments');
  });
});
