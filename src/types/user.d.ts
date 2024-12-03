interface User {
  id: string
  username: string
  profileImage: string
  tier: string
  followers: number
  following: number
}

interface Video {
  id: string
  videoUrl: string
  user: User
  likes: number
  comments: number
  description: string
}

