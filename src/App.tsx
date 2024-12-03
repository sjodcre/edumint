'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Share2, User } from 'lucide-react'
import { useVideos } from "./hooks/useVideos"
import { UserProfile } from "./components/userProfiles"

function VideoCard({ video :any, onLike: any, onProfileClick : any}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play()
        } else {
          videoRef.current?.pause()
        }
      })
    }, options)

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(video.id, !isLiked)
  }

  return (
    <div className="relative h-screen w-full bg-black snap-start">
      <video 
        ref={videoRef}
        className="h-full w-full object-cover"
        loop 
        muted 
        playsInline
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute bottom-20 left-4 right-4">
        <p className="text-white text-sm mb-2">{video.description}</p>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center">
        <button onClick={() => onProfileClick(video.user)} className="flex items-center">
          <div className="relative">
            <img 
              src={video.user.profileImage}
              alt={`${video.user.username}'s profile`}
              className="h-12 w-12 rounded-full border-2 border-white"
            />
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
              {video.user.tier}
            </div>
          </div>
          <span className="ml-2 text-lg font-semibold text-white">@{video.user.username}</span>
        </button>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-4">
        <button 
          className="flex flex-col items-center"
          onClick={handleLike}
        >
          <Heart className={`h-8 w-8 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          <span className="text-sm text-white">{video.likes + (isLiked ? 1 : 0)}</span>
        </button>
        <button className="flex flex-col items-center">
          <MessageCircle className="h-8 w-8 text-white" />
          <span className="text-sm text-white">{video.comments}</span>
        </button>
        <button className="flex flex-col items-center">
          <Share2 className="h-8 w-8 text-white" />
          <span className="text-sm text-white">Share</span>
        </button>
      </div>
    </div>
  )
}

export default function ScrollableShortVideoFeed() {
  const { videos, loading, fetchVideos } = useVideos()
  const [localVideos, setLocalVideos] = useState(videos)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    setLocalVideos(videos)
  }, [videos])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight
    if (bottom && !loading) {
      fetchVideos()
    }
  }

  const handleLike = (videoId: string, liked: boolean) => {
    setLocalVideos(prevVideos => 
      prevVideos.map(video => 
        video.id === videoId 
          ? { ...video, likes: video.likes + (liked ? 1 : -1) }
          : video
      )
    )
  }

  const handleProfileClick = (user) => {
    setSelectedUser(user)
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory" onScroll={handleScroll}>
      {localVideos.map(video => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onLike={handleLike} 
          onProfileClick={handleProfileClick}
        />
      ))}
      {loading && <div className="h-screen w-full flex items-center justify-center bg-black text-white">Loading...</div>}
      {selectedUser && (
        <UserProfile user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}
