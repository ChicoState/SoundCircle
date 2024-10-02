import db from '../../db/db';
import { UserPost } from '../../../Types/posts';

  export const findUsersByPosts = async (limit: number, offset: number) => {
    try {
      // Replace 'posts' with your actual posts table name
      const postsWithComments = await db<UserPost[]>('posts')
        .select('posts.id', 'posts.username', 'post_content') // Adjust fields as necessary
        .orderBy('id', 'asc') // Sort by ID in ascending order
        .limit(limit) // Send only a # back
        .offset(offset); // Which records we've already sent
      return postsWithComments;
    } catch (error) {
      console.error('Error fetching posts with comments:', error);
      throw new Error('Failed to fetch posts with comments');
    }
  }


  export const createUserPost = async (username: string, postText: string) => {
    try {
      // Model interface
      // Return interface
    } catch (error) {
      console.error('Error sending post:', error);
      throw new Error('Failed to create post.');
    }
  }

