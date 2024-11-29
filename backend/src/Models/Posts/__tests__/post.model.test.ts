import db from '../../../db/db'; // Importing the mock database information
import { findUsersByPosts, findPostsByLocation, createUserPost } from '../post.model';

// Mocking the db module with proper chaining and mock values
jest.mock('../../../db/db', () => {
  const mockDbInstance = {
    select: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn(),                      // not chained
    insert: jest.fn(),                      // not chained
    returning: jest.fn().mockReturnThis(),
  };
  return jest.fn(() => mockDbInstance);
});

// Explicitly type the mock for TypeScript compatibility
const mockDb = db as jest.MockedFunction<typeof db>;

// Clear all the mocks present to ensure test isolation
describe('Post Model Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Ensure mocks are cleared after each test
  });

  // ------------------------------------( findUsersByPosts )------------------------------------
  describe('findUsersByPosts', () => {
    test('should return posts when the database query succeeds', async () => {
      const mockPosts = [
        { id: 1, user_id: 123, username: 'user1', post_content: 'Hello World', created_at: new Date(), comments: [], reactions: [], locationName: '', latitude: 0, longitude: 0 },
        { id: 2, user_id: 124, username: 'user2', post_content: 'Another Post', created_at: new Date(), comments: [], reactions: [], locationName: '', latitude: 0, longitude: 0 },
      ];

      (mockDb().offset as jest.Mock).mockResolvedValueOnce(mockPosts); // Type assertion for offset

      const limit = 10;
      const offset = 0;
      const result = await findUsersByPosts(limit, offset);

      expect(result).toEqual(mockPosts);
      expect(mockDb().select).toHaveBeenCalledTimes(1);
      expect(mockDb().orderBy).toHaveBeenCalledWith('created_at', 'desc');
      expect(mockDb().limit).toHaveBeenCalledWith(limit);
      expect(mockDb().offset).toHaveBeenCalledWith(offset);
    });

    test('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database error');
      (mockDb().offset as jest.Mock).mockRejectedValueOnce(dbError); // Type assertion for rejected value

      await expect(findUsersByPosts(10, 0)).rejects.toThrow('Failed to fetch posts with comments');
      expect(mockDb().offset).toHaveBeenCalledWith(0);
    });
  });

  // ------------------------------------( findPostsByLocation )------------------------------------
  describe('findPostsByLocation', () => {
    test('should return posts within the location range when the database query succeeds', async () => {
      const mockPosts = [
        { id: 1, user_id: 123, username: 'user1', post_content: 'Nearby Post', created_at: new Date(), comments: [], reactions: [], locationName: 'Park', latitude: 10, longitude: 20 },
      ];
      (mockDb().offset as jest.Mock).mockResolvedValueOnce(mockPosts); // Type assertion for offset

      const limit = 5;
      const offset = 0;
      const latitude = 10;
      const longitude = 20;
      const searchDistance = 10;

      const result = await findPostsByLocation(limit, offset, latitude, longitude, searchDistance);

      expect(result).toEqual(mockPosts);
      expect(mockDb().where).toHaveBeenCalledWith('latitude', '>=', expect.any(Number));
      expect(mockDb().andWhere).toHaveBeenCalledTimes(3);
      expect(mockDb().orderBy).toHaveBeenCalledWith('created_at', 'desc');
    });

    test('should throw an error if the database query fails', async () => {
      (mockDb().offset as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(findPostsByLocation(5, 0, 10, 20, 10)).rejects.toThrow();
    });
  });

  // ------------------------------------( createUserPost )------------------------------------
  describe('createUserPost', () => {
    test('should create and return a new post when the database query succeeds', async () => {
      const mockPost = {
        id: 1,
        user_id: 123,
        username: 'user1',
        post_content: 'New Post',
        created_at: new Date(),
        comments: [],
        reactions: [],
        locationName: '',
        latitude: 0,
        longitude: 0,
      };

      // Mock the database insert method to return the mock post
      (mockDb().insert as jest.Mock).mockResolvedValueOnce([mockPost]);

      const username = 'user1';
      const postText = 'New Post';

      // Call the function and check if the result matches the mock post
      const result = await createUserPost(username, postText);

      // Verify the result is as expected
      expect(result).toEqual(mockPost);
      // Check that insert was called with the correct parameters
      expect(mockDb().insert).toHaveBeenCalledWith({
        username,
        post_content: postText,
        created_at: expect.any(Date), // Expect any Date object for created_at
      });
    });

    test('should throw an error if the database query fails', async () => {
      // Mock the insert method to throw an error
      (mockDb().insert as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      // Expect the function to throw an error when insert fails
      await expect(createUserPost('user1', 'New Post')).rejects.toThrow('Failed to create post.');
    });

    test('should throw an error if no post is created', async () => {
      // Mock the insert method to return an empty array, simulating no post creation
      (mockDb().insert as jest.Mock).mockResolvedValueOnce([]);

      // Expect the function to throw an error when no post is created
      await expect(createUserPost('user1', 'New Post')).rejects.toThrow('No post was created.');
    });
  });
});
