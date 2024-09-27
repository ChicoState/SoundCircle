import db from '../../db/db';
import { Post } from '../../../Types/posts';

  export const findUsersByPosts = async () => {
    try {
      // Replace 'posts' with your actual posts table name
      const postsWithComments = await db<Post[]>('posts')
        .select('posts.id', 'posts.username', 'post_content'); // Adjust fields as necessary
      return postsWithComments;
    } catch (error) {
      console.error('Error fetching posts with comments:', error);
      throw new Error('Failed to fetch posts with comments');
    }
  }




