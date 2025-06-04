"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  style?: React.CSSProperties
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  disableRemotePlayback?: boolean
  controlsList?: string
  children?: React.ReactNode
  onLoadStart?: () => void
  onLoadedData?: () => void
  onError?: () => void
  threshold?: number // Intersection observer threshold
  rootMargin?: string // Intersection observer root margin
}

export function OptimizedVideo({
  src,
  poster,
  className,
  style,
  muted = true,
  loop = true,
  playsInline = true,
  disableRemotePlayback = true,
  controlsList = "nodownload noremoteplayback",
  children,
  onLoadStart,
  onLoadedData,
  onError,
  threshold = 0.1,
  rootMargin = "50px"
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true)
          setIsLoading(true)
          onLoadStart?.()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(videoElement)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, hasLoaded, onLoadStart])

  const handleLoadedData = () => {
    setIsLoading(false)
    setHasLoaded(true)
    onLoadedData?.()
    
    // Auto-play when loaded and in view
    if (videoRef.current && isInView) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay failures (browser policy)
      })
    }
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        disableRemotePlayback={disableRemotePlayback}
        controlsList={controlsList}
        poster={poster}
        preload={isInView ? "metadata" : "none"}
        src={isInView ? src : undefined}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px', ...style }}
      >
        {isInView && (
          <source src={src} type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </video>
      
      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Loading video...</span>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-gray-400 text-2xl mb-2">⚠️</div>
            <span className="text-sm text-gray-600">Unable to load video</span>
          </div>
        </div>
      )}
      
      {/* Poster Image Fallback */}
      {!isInView && poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      
      {children}
    </div>
  )
} 