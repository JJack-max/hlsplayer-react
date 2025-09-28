import React, { useState } from 'react';
import './Popup.css';

const Popup: React.FC = () => {
  const [url, setUrl] = useState('');

  const handlePlay = () => {
    if (url.trim()) {
      const playerUrl = chrome.runtime.getURL('player.html') + "#" + encodeURIComponent(url);
      chrome.tabs.create({ url: playerUrl });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePlay();
    }
  };

  return (
    <div className="popup-container">
      <div className="header">
        <h1>HLS Player</h1>
      </div>
      
      <div className="body">
        <div className="input-section">
          <label htmlFor="url-input">URL</label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter m3u8 URL..."
            className="url-input"
          />
          <button 
            onClick={handlePlay}
            className="play-button"
            disabled={!url.trim()}
          >
            Play
          </button>
        </div>
      </div>
      
      <div className="footer">
        <a 
          href="https://www.hlsplayer.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="home-link"
        >
          https://www.hlsplayer.org/
        </a>
      </div>
    </div>
  );
};

export default Popup;
