import { Controller, Get, Post, Query, Body, Route } from 'tsoa';
import { createUserPost, findUsersByPosts, findPostsByLocation } from '../../Models/Posts/post.model';
import { UserPost } from '../../../Types/posts';

// @SuccessResponse('200', 'Ok')
@Route('posts')
// @Tags('Posts')
export class PostController extends Controller {

  /**
   * Fetch all posts with their associated comments
   * @returns Array of posts with comments
   */
  @Get('/')
  public async getPostsWithComments(
    @Query('limit') limitStr?: string,  // Accept a limit passed as a string
    @Query('offset') offsetStr?: string // Accept an offset passed as a string
  ): Promise<UserPost[]> {
    try {
      const limit = parseInt(limitStr || '5');    // Parse limit string, default to 5
      const offset = parseInt(offsetStr || '0');  // Parse offset string, default to 0

      // Run the 'findUsersByPosts' db function and return the results
      const result = await findUsersByPosts(limit, offset);

      // Throw different errors for different results
      if (result.length === 0)
      {
        // 204 = No Content status
        this.setStatus(204);
      } else {
        // 200 = OK status (not always needed, but helpful)
        this.setStatus(200);
      }

      return result;

    } catch (error) {
      // Throw an error to both the backend, HTTP error, and frontend
      console.error('Error in getPostsWithComments:', error);
      this.setStatus(500);
      throw new Error('Failed to fetch posts with comments');
    }
  }


  @Get('/feed')
  public async getPostsByLocation(
    @Query('limit') limitStr?: string,  // Accept a limit passed as a string
    @Query('offset') offsetStr?: string, // Accept an offset passed as a string
    @Query('latitude') latitudeNum?: number,
    @Query('longitude') longitudeNum?: number,
    @Query('searchDistance') searchDistanceNum?: number
  ): Promise<UserPost[]> {
    try {
      const limit = parseInt(limitStr || '5');    // Parse limit string, default to 5
      const offset = parseInt(offsetStr || '0');  // Parse offset string, default to 0
      const latitude = latitudeNum || 0.0;
      const longitude = longitudeNum || 0.0;
      const searchDistance = searchDistanceNum || 25;

      // Run the function to get the data by location
      const result = await findPostsByLocation(limit, offset, latitude, longitude, searchDistance);

      // Throw different errors for different results
      if (result.length === 0)
        {
          // 204 = No Content status
          this.setStatus(204);
        } else {
          // 200 = OK status (not always needed, but helpful)
          this.setStatus(200);
        }
  
        return result;

    } catch (error) {
      // Throw an error to both the backend, HTTP error, and frontend
      console.error('Error in getPostsByLocation:', error);
      this.setStatus(500);
      throw new Error('Failed to fetch posts by location.');
    }
  }


  /*
   * Create a new post and shove it in the DB
   * !!! TECHNICAL DEBT: Currently interpreting data as a pure string. Not sure if this works for api calls, but for now will work.
   */
  @Post('/')
  public async postNewUserPost(
    // HTTP likes to use @Body for POST requests
    @Body() body: { usernameStr?: string; postDataStr?: string; }
  ): Promise<UserPost> {
    try {
      const username = body.usernameStr || 'Default User'; // Default to 'Default User' if no username provided
      const postData = body.postDataStr || '';             // Default to empty string if no postData provided

      // Call the database function to insert new post information
      const newPost = await createUserPost(username, postData);

      this.setStatus(201); // Set HTTP status to 201 for success on new information added

      // Return the post
      return newPost;

    } catch (error) {
      // Throw an error to both the backend, HTTP error, and frontend
      console.error('Error in postNewUserPost: ', error);
      this.setStatus(500);
      throw new Error('Failed to create new user post');
    }
  }
}
