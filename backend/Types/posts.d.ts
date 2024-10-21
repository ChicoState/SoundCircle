export interface UserPost {
  id: number;
  user_id: number;
  username: string;
  post_content: string;
  created_at: Date;
  comments: string[]; // Needs to be chaneged to a 'comment' type
  reactions: number;
}
