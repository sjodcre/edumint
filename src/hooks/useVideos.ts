import { useState, useEffect } from 'react';
import type { Video } from '@/types/user';

const placeholderVideo = '/video.mp4';
const placeholderImages = ['/placeholder.jpg'];

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newVideos: Video[] = Array.from({ length: 5 }, (_, i) => ({
      id: `video-${videos.length + i}`,
      videoUrl: placeholderVideo,
      user: {
        id: `user-${videos.length + i}`,
        username: `user${videos.length + i}`,
        profileImage: placeholderImages[i % placeholderImages.length],
        tier: 'B',
        followers: 100,
        following: 50,
      },
      likes: 0, 
      likeSummary: {
        PostID: videos.length + i,
        LikeCount: 0,
      },
      comments: 0,
      description: 'Sample video description',
    }));

    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, loading, fetchVideos };
}