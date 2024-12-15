// import { findUsersByPosts } from '../post.model';
// import { UserPost } from '../../../../Types/posts';

// // Define individual mock functions for the chained methods
// const mockSelect = jest.fn().mockReturnThis();
// const mockOrderBy = jest.fn().mockReturnThis();
// const mockLimit = jest.fn().mockReturnThis();
// const mockOffset = jest.fn().mockResolvedValue([]);

// // Mock the default export of knex/db
// jest.mock('../../../db/db', () => {
//   return {
//     __esModule: true,
//     default: jest.fn(() => ({
//       select: mockSelect,
//       orderBy: mockOrderBy,
//       limit: mockLimit,
//       offset: mockOffset,
//     })),
//   };
// });

// // Clear all mocks after each test to ensure a clean slate for each test case
// afterEach(() => {
//   jest.clearAllMocks();
// });

// describe('findUsersByPosts', () => {
//   // Test Case #1: Successfully return posts when the database query is successful
//   test('should return posts when the database query is successful', async () => {
//     // Explicitly type mockPosts as UserPost[]
//     const mockPosts: UserPost[] = [
//       { id: 1, user_id: 123, username: 'user1', post_content: 'Post content 1', created_at: new Date(), comments: ["comment1", "comment2"], reactions: 10, locationName: 'Park', latitude: 10, longitude: 20 },
//       { id: 2, user_id: 456, username: 'user2', post_content: 'Post content 2', created_at: new Date(), comments: ["comment3", "comment4"], reactions: 8, locationName: 'Mall', latitude: 12, longitude: 22 }
//     ];

//     // Mock the 'offset' method to return the mock posts
//     mockOffset.mockResolvedValueOnce(mockPosts);

//     const limit = 5;
//     const offset = 0;

//     // Call the function under test
//     const result = await findUsersByPosts(limit, offset);

//     // Verify that the result matches the mock data
//     expect(result).toEqual(mockPosts);
//     expect(mockSelect).toHaveBeenCalledWith('id', 'user_id', 'username', 'post_content', 'created_at', 'comments', 'reactions', 'locationName', 'latitude', 'longitude');
//     expect(mockOrderBy).toHaveBeenCalledWith('created_at', 'desc');
//     expect(mockLimit).toHaveBeenCalledWith(limit);
//     expect(mockOffset).toHaveBeenCalledWith(offset);
//   });

//   // Test Case #2: Database query fails
//   test('should throw an error if the database query fails', async () => {
//     // Mock the 'offset' method to reject with an error
//     mockOffset.mockRejectedValueOnce(new Error('Database error'));

//     const limit = 5;
//     const offset = 0;

//     // Verify that the error is thrown
//     await expect(findUsersByPosts(limit, offset)).rejects.toThrow('Failed to fetch posts with comments');
//   });

//   // Test Case #3: No posts found, return an empty array
//   test('should return an empty array if no posts are found', async () => {
//     const mockPosts: UserPost[] = []; // Empty array for no posts scenario

//     // Mock the 'offset' method to return an empty array
//     mockOffset.mockResolvedValueOnce(mockPosts);

//     const limit = 5;
//     const offset = 0;

//     // Call the function under test
//     const result = await findUsersByPosts(limit, offset);

//     // Verify that the result is an empty array
//     expect(result).toEqual(mockPosts);
//   });

//   // Test Case #4: Handle invalid limit and offset values gracefully
//   test('should handle invalid limit and offset values gracefully', async () => {
//     const mockPosts: UserPost[] = [
//       { id: 1, user_id: 123, username: 'user1', post_content: 'Post content 1', created_at: new Date(), comments: ["comment1"], reactions: 10, locationName: 'Park', latitude: 10, longitude: 20 }
//     ];

//     // Mock the 'offset' method to return the mock posts
//     mockOffset.mockResolvedValueOnce(mockPosts);

//     const limit = -5;  // Invalid limit
//     const offset = -1; // Invalid offset

//     // Call the function under test and expect it to handle the invalid values
//     const result = await findUsersByPosts(limit, offset);

//     // Verify that the result is the mock posts despite invalid inputs
//     expect(result).toEqual(mockPosts);
//   });
// });
