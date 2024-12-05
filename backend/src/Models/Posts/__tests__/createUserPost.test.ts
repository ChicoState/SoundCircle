import { createUserPost } from '../post.model';
import { UserPost } from '../../../../Types/posts';

// Mocking the knex object with method chaining
const mockInsert = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockResolvedValue([]);

// Mocking the database module to return the mocked knex object
jest.mock('../../../db/db', () => {
  const mockDbInstance = () => ({
    insert: mockInsert,
    returning: mockReturning,
  });
  return {
    __esModule: true,
    default: mockDbInstance,
  };
});

// Clear all mocks after each test to ensure clean slate for each test case
afterEach(() => {
  jest.clearAllMocks();
});

describe('createUserPost', () => {
  // Test Case #1: Successfully create and return a new post
  test('should create and return a new post when the database query succeeds', async () => {
    const mockPost: UserPost = {
      id: 1,
      user_id: 123,
      username: 'testuser',
      post_content: 'New Post',
      created_at: new Date(),
      comments: [],
      reactions: 1,
      locationName: '',
      latitude: 0,
      longitude: 0,
    };

    // Mock the database response for the insert and returning methods
    mockReturning.mockResolvedValueOnce([mockPost]);

    const username = 'user1';
    const postText = 'New Post';
    
    // Call the function to be tested
    const result = await createUserPost(username, postText);

    // Assert that the function returns the expected post
    expect(result).toEqual(mockPost);

    // Assert that the insert method was called with the correct arguments
    expect(mockInsert).toHaveBeenCalledWith({
      username,
      post_content: postText,
      created_at: expect.any(Date),
    });

    // Assert that the returning method was called with the correct fields
    expect(mockReturning).toHaveBeenCalledWith(expect.arrayContaining([
      'id', 'comments', 'user_id', 'reactions', 'username', 'post_content', 'created_at', 'locationName', 'latitude', 'longitude',
    ]));
  });

  // Test Case #2: Database query fails
  test('should throw an error if the database query fails', async () => {
    // Mock the database response to throw an error
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    // Assert that the function throws the expected error
    await expect(createUserPost('user1', 'New Post')).rejects.toThrow('Failed to create post.');
  });

  // Test Case #3: No post created
  test('should throw an error if no post is created', async () => {
    // Mock the database response to return an empty array
    mockReturning.mockResolvedValueOnce([]);

    // Assert that the function throws the expected error
    await expect(createUserPost('user1', 'New Post')).rejects.toThrow('Failed to create post.');
  });
});
