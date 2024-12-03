import { useState, useEffect } from 'react'

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

const placeholderVideo = '/video.mp4'
const placeholderImages = ['/placeholder.jpg ']

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  const fetchVideos = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newVideos: Video[] = Array.from({ length: 5 }, (_, i) => ({
      id: `video-${videos.length + i}`,
      videoUrl: placeholderVideo, // Use the same placeholder video for all entries
      user: {
        id: `user-${videos.length + i}`,
        username: `user${videos.length + i}`,
        profileImage: placeholderImages[i % placeholderImages.length], // Cycle through placeholder images
        tier: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)], // Random tier
        followers: Math.floor(Math.random() * 10000),
        following: Math.floor(Math.random() * 1000)
      },
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 1000),
      description: `This is video ${videos.length + i} description. #trending #fyp`
    }))

    setVideos(prevVideos => [...prevVideos, ...newVideos])
    setLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return { videos, loading, fetchVideos }
}

