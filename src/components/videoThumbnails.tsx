import { useEffect, useRef, useState } from 'react'
interface thumbnailProps {
    videoUrl: string;
    className?: string;
}
export default function VideoThumbnails({videoUrl, className}: thumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string| null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    const generateThumbnail = async() => {
        const video = videoRef.current;
        if (!video) return
        
        return new Promise<void>((resolve) => {
            video.addEventListener("loadeddata", () => {
                const randomTime = Math.floor(Math.random() * video.duration)
                video.currentTime = randomTime;
            });

            video.addEventListener("seeked", ()=> {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d")
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

                const dataUrl = canvas.toDataURL("image/jpg")
                setThumbnail(dataUrl)
                resolve()
            })
        })
    }
    generateThumbnail()
  }, [videoUrl])

  return (
    <div className={`relative aspect-square bg-zinc-800 rounded-lg overflow-hidden ${className}`}>
        {thumbnail ? (
            <img 
                src={thumbnail}
                alt='video thumbnail'
                className='w-full h-full object-cover'
            />
        ) : (
            <>
                <video 
                  ref={videoRef}
                  src={videoUrl}
                  className='hidden'
                  crossOrigin='anonymous'
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
                </div>
            </>
        )}
    </div>
  )
}
