import db from '../../db/db';
import { UserPost } from '../../../Types/posts';

export const findUsersByPosts = async (limit: number, offset: number) => {
  try {
    // Replace 'posts' with your actual posts table name
    const postsWithComments = await db<UserPost[]>('posts')
      .select('posts.id', 'posts.user_id', 'posts.username', 'posts.post_content', 'posts.created_at', 'posts.comments', 'posts.reactions',
        'posts.locationName', 'posts.latitude', 'posts.longitude') // Adjust fields as necessary
      .orderBy('created_at', 'desc') // Sort by date in descending order (newest first)
      .limit(limit) // Send only a # back
      .offset(offset); // Which records we've already sent
    return postsWithComments;
  } catch (error) {
    console.error('Error fetching posts with comments:', error);
    throw new Error('Failed to fetch posts with comments');
  }
}


export const findPostsByLocation = async(limit: number, offset: number, latitude: number, longitude: number, searchDistance: number) => {
  try {
    const posts = await db<UserPost[]>('posts')
    .select('id', 'user_id', 'username', 'post_content', 'created_at', 'comments', 'reactions', 'locationName', 'latitude', 'longitude')
    
  }
}


export const createUserPost = async (username: string, postText: string) => {
  try {
    // Create and insert the new post into the 'posts' table of our database
    const [newPost] = await db<UserPost>('posts')
    .insert({
      username: username,
      post_content: postText,
      created_at: new Date()
    })
    .returning(['id', 'comments', 'user_id', 'reactions', 'username', 'post_content', 'created_at', 
      'locationName', 'latitude', 'longitude']); // Specify that we also want to return the new post

    if (!newPost)
    {
      throw new Error('No post was created.');
    }

    console.log('New post created succesfully');
    return newPost;

  } catch (error) {
    console.error('Error sending post:', error);
    throw new Error('Failed to create post.');
  }
}

