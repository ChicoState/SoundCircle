import { Controller, Get, Post, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { createUserPost, findUsersByPosts } from '../../Models/Posts/post.model';
import { UserPost } from '../../../Types/posts';
import { parseArgs } from 'util';

@SuccessResponse('200', 'Ok')
@Route('posts')
@Tags('Posts')
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
      const result = await findUsersByPosts(limit, offset); // Run the 'findUsersByPosts' db function and return the results
      return result;
    } catch (error) {
      console.error('Error in getPostsWithComments:', error);
      this.setStatus(500);
      throw new Error('Failed to fetch posts with comments');
    }
  }


  /*
   * Create a new post and shove it in the DB
   * !!! TECHNICAL DEBT: Currently interpreting data as a pure string. Not sure if this works for api calls, but for now will work.
   */
  @Post('/')
  public async postNewUserPost(
    @Query('username') usernameStr?: string,
    @Query('postData') postDataStr?: string, 
  ): Promise<void> {
    try {
      const username = usernameStr || 'Default User';
      const postData = postDataStr || '';
      const newPost = await createUserPost(username, postData);


    } catch (error) {
      console.error('Error in postNewUserPost: ', error);
      throw new Error('Failed to create new user post');
    }
  }
}
