import React from 'react';
import { createRoot } from 'react-dom/client';
import HLSPlayer from '../components/HLSPlayer';

const App: React.FC = () => {
  // 从URL hash中获取m3u8链接
  const url = window.location.href.split("#")[1];
  
  if (!url) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#000',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>无效的视频链接</h2>
          <p>请通过扩展的弹出窗口输入有效的m3u8链接</p>
        </div>
      </div>
    );
  }

  return <HLSPlayer url={url} />;
};

const container = document.getElementById('player-root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
