import { useState, useEffect } from 'react'

interface Video {
  id: string
  videoUrl: string
  user: {
    username: string
    profileImage: string
    tier: string
  }
  likes: number
  comments: number
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  const fetchVideos = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newVideos: Video[] = Array.from({ length: 5 }, (_, i) => ({
      id: `video-${videos.length + i}`,
      videoUrl: `/placeholder-${(videos.length + i) % 3 + 1}.mp4`, // Cycle through 3 placeholder videos
      user: {
        username: `user${videos.length + i}`,
        profileImage: `/placeholder-${(videos.length + i) % 3 + 1}.jpg`, // Cycle through 3 placeholder images
        tier: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] // Random tier
      },
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 1000)
    }))

    setVideos(prevVideos => [...prevVideos, ...newVideos])
    setLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return { videos, loading, fetchVideos }
}

