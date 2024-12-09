export type UDLLicense =
  | "CC0"
  | "CC-BY"
  | "CC-BY-SA"
  | "CC-BY-NC"
  | "CC-BY-ND"
  | "CC-BY-NC-SA"
  | "CC-BY-NC-ND";

export type UserTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

interface User {
  id: string;
  displayName: string;
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
interface Post {
  Id: number;
  Likes: Like;
  Comments: string;
  VideoTxId: string;
  user: User;
  Description: string;
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

interface UserDetails {
  id: string | undefined;
  name: string;
  score: number;
  bazarId: string;
  walletAddress: string;
  displayName: string;
  username: string;
  bio: string;
  avatar: string;
  banner: string;
  tier?: string;
  version: number;
  followers?: number;
  following?: number;
}
