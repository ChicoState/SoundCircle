import { Controller, Get, Route, Tags } from 'tsoa';
import postsWithComments from '../../Models/Posts/post.model';

interface Post {
  postID: number;
  comments: number[];
}

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
      return postsWithComments();
    } catch (error) {
      this.setStatus(500);
      throw new Error('Failed to fetch posts with comments');
    }
  }
}
