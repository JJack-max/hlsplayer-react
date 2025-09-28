import React, { useEffect, useRef, useState } from 'react';
import './HLSPlayer.css';
import Hls from 'hls.js';

interface HLSPlayerProps {
  url: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    const m3u8Url = decodeURIComponent(url);
    setIsLoading(true);
    setError(null);

    // 清理之前的HLS实例
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const initializePlayer = () => {
      if (Hls.isSupported()) {
        // 使用HLS.js
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        
        hlsRef.current = hls;
        
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          video.play().catch(console.error);
        });
        
        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          console.error('HLS error:', data);
          if (data.fatal) {
            setError(`播放错误: ${data.details}`);
            setIsLoading(false);
          }
        });
        
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari原生支持
        video.src = m3u8Url;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          video.play().catch(console.error);
        });
        
        video.addEventListener('error', () => {
          setError('视频加载失败');
          setIsLoading(false);
        });
      } else {
        setError('当前浏览器不支持HLS播放');
        setIsLoading(false);
      }
    };

    initializePlayer();

    // 设置页面标题
    document.title = m3u8Url;

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url]);

  return (
    <div className="hls-player-container">
      <video
        ref={videoRef}
        className="hls-video"
        controls
        autoPlay
        muted
        playsInline
      />
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>正在加载视频...</p>
        </div>
      )}
      
      {error && (
        <div className="error-overlay">
          <div className="error-content">
            <h3>播放错误</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              重试
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HLSPlayer;
