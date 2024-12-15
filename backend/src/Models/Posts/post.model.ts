import db from '../../db/db';
import { UserComment, UserPost } from '../../../Types/posts';
import { User } from '../../../Types/users';

export const findPosts = async (limit: number, offset: number) => {
  try {
    // Replace 'posts' with your actual posts table name
    const posts = await db<UserPost[]>('posts')
      .select('id', 'user_id', 'username', 'post_content', 'created_at', 'comment_ids', 'reactions','locationName', 'latitude', 'longitude') // Define posts info to get
      .orderBy('created_at', 'desc') // Sort by date in descending order (newest first)
      .limit(limit) // Send only a # back
      .offset(offset); // Which records we've already sent

    console.log('Posts fetched:', posts.length);

    return posts;
  } catch (error) {
    console.error('Error fetching posts with comments:', error);
    throw new Error('Failed to fetch posts with comments');
  }
}


export const findPostsByLocation = async(limit: number, offset: number, latitude: number, longitude: number, searchDistance: number) => {
  try {
    console.log('findPostsByLocation called at: ', latitude, ', ', longitude, ' | With distance radius of: ', searchDistance);
    // Calculate the lat/lng range from our distance
    const latRange = searchDistance / 69; // 69 = about 1 mile
    const lngRange = searchDistance / (69 * Math.cos((latitude * Math.PI) / 180)); // Math for globe adjustment

    // Try to sort posts in the DB
    const posts = await db<UserPost[]>('posts')
      .select('id', 'user_id', 'username', 'post_content', 'created_at', 'comment_ids', 'reactions', 'locationName', 'latitude', 'longitude')
      // Find posts only within the boundaries of our given latitude and longitude
      .where('latitude', '>=', latitude - latRange)
      .andWhere('latitude', '<=', latitude + latRange)
      .andWhere('longitude', '>=', longitude - lngRange)
      .andWhere('longitude', '<=', longitude + lngRange)
      // Order by time created and limit return count of posts to keep db indexing from straining memory
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    console.log('Location-based Posts fetched:', posts.length);

    return posts;
  } catch (error) {
    console.error('Error fetching posts by location:', error);
    throw error;
  }
}


export const createUserPost = async (userObj: User, postText: string) => {
  try {
    // Create and insert the new post into the 'posts' table of our database
    const [newPost] = await db<UserPost>('posts')
    .insert({
      user_id: userObj.id,
      username: userObj.username,
      post_content: postText,
      reactions: 0,
      locationName: userObj.locationName,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
      created_at: new Date()
    })
    .returning(['id', 'comment_ids', 'user_id', 'reactions', 'username', 'post_content', 'created_at', 
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


export const findComments = async (limit: number, offset: number, commentIDs: number[]) => {
  try {
    if (commentIDs.length === 0) {
      return [];
    }

    const comments = await db<UserPost[]>('comments')
      .select('id', 'user_id', 'username', 'comment_content', 'created_at', 'reactions')
      .whereIn('id', commentIDs)
      .orderBy('created_at', 'desc') // Sort by date in descending order (newest first)
      .limit(limit) // Send only a # back
      .offset(offset); // Which records we've already sent

    console.log('Comments fetched:', comments.length);

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments');
  }
}

export const createNewComment = async (userObj: User, postData: UserPost, commentText: string) => {
  try {
    if (!userObj) {
      throw new Error('No userObj included for createNewComment')
    }

    if (!postData) {
      throw new Error('No postData included for createNewComment')
    }

    // Create and insert the new comment into the 'comments' table of our database
    const [newComment] = await db<UserComment>('comments')
    .insert({
      user_id: userObj.id,
      username: userObj.username,
      comment_content: commentText,
      reactions: 0,
      created_at: new Date()
    })
    .returning(['id', 'user_id', 'username', 'comment_content', 'reactions', 'created_at']); // Specify that we also want to return the new post

    if (!newComment)
    {
      throw new Error('No comment was created.');
    }

    console.log('userObj.id:', userObj.id);
    console.log('newComment.id:', newComment.id);
    console.log('postData.id:', postData.id);

    // Append the original post with the new comment id
    await db<UserPost>('posts')
    .where({id: postData.id})
    .update({
      comment_ids: db.raw('array_append(comment_ids, ?)', [newComment.id]),
    })

    console.log('New omment added succesfully');
    return newComment;

  } catch (error) {
    console.error('Error with comment:', error);
    throw new Error('Failed to create comment.');
  }
}