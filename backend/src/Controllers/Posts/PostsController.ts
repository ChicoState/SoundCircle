import { Controller, Get, Query, Route, SuccessResponse, Tags } from 'tsoa';
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
  public async getPostsWithComments(
    @Query('limit') limitStr?: string,
    @Query('offset') offsetStr?: string
  ): Promise<Post[]> {
    try {
      const limit = parseInt(limitStr || '5', 10);
      const offset = parseInt(offsetStr || '0, 10');
      const result = await findUsersByPosts(limit, offset);
      return result;
    } catch (error) {
      console.error('Error in getPostsWithComments:', error);
      this.setStatus(500);
      throw new Error('Failed to fetch posts with comments');
    }
  }

}
