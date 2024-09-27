import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { findUsersByPosts } from '../../Models/Posts/post.model';
import { Post } from '../../../Types/posts';

@SuccessResponse('200', 'Ok')
@Route('posts')
@Tags('Posts')
export class PostController extends Controller {

  /**
   * Fetch all posts with their associated comments
   * @returns Array of posts with comments
   */
  @Get('/')
  public async getPostsWithComments(): Promise<Post[]> {
    try {
      const result = await findUsersByPosts();
      return result;
    } catch (error) {
      console.error('Error in getPostsWithComments:', error);
      this.setStatus(500);
      throw new Error('Failed to fetch posts with comments');
    }
  }

}
