export interface UserPost {
  id: number
  user_id: number
  username: string
  post_content: string
  created_at: Date
  comment_ids: number[]
  reactions: number
  locationName: string
  latitude: number
  longitude: number
}

export interface UserComment {
  id: number
  user_id: number
  username: string
  comment_content: string
  created_at: Date
  reactions: number
}