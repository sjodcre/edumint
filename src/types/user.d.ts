
interface User {
  id: string;
  username: string;
  profileImage: string;
  tier: string;
  followers: number;
  following: number;
}

interface Like {
  AutoID: number;    
  PostID: number;    
  UserPID: string;   
  Timestamp: number; 
}

interface PostLikesSummary {
  PostID: number;    
  LikeCount: number; 
}

interface Video {
  id: string;
  videoUrl: string;
  user: User;
  likes: number;              
  likeSummary: PostLikesSummary; 
  comments: number;
  description: string;
}