import { createUserPost } from '../post.model';
import { UserPost } from '../../../../Types/posts';

// Mocking the knex object with method chaining
const mockInsert = jest.fn().mockReturnThis();
const mockReturning = jest.fn().mockResolvedValue([]);

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

afterEach(() => {
  jest.clearAllMocks();
});

describe('createUserPost', () => {
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

    // Mock the database response
    mockReturning.mockResolvedValueOnce([mockPost]);

    const username = 'user1';
    const postText = 'New Post';
    const result = await createUserPost(username, postText);

    expect(result).toEqual(mockPost);
    expect(mockInsert).toHaveBeenCalledWith({
      username,
      post_content: postText,
      created_at: expect.any(Date),
    });
    expect(mockReturning).toHaveBeenCalledWith(expect.arrayContaining([
      'id', 'comments', 'user_id', 'reactions', 'username', 'post_content', 'created_at', 'locationName', 'latitude', 'longitude',
    ]));
  });

  test('should throw an error if the database query fails', async () => {
    mockReturning.mockRejectedValueOnce(new Error('Database error'));

    await expect(createUserPost('user1', 'New Post')).rejects.toThrow('Failed to create post.');
  });

  test('should throw an error if no post is created', async () => {
    mockReturning.mockResolvedValueOnce([]);

    await expect(createUserPost('user1', 'New Post')).rejects.toThrow('Failed to create post.');
  });
});
