// Content script for HLS Player Chrome Extension

// 监听页面上的点击事件，检测.m3u8链接
document.addEventListener('click', function (e) {
  const target = e.target as HTMLElement;
  
  // 检查点击的元素是否有href属性且指向.m3u8文件
  if (target && 'href' in target && typeof target.href === 'string') {
    const href = target.href.split('?')[0];
    
    if (href.endsWith("m3u8")) {
      e.preventDefault();
      e.stopPropagation();
      
      // 发送消息到background script
      chrome.runtime.sendMessage(
        { command: 'CMD_PLAY_M3U8', url: target.href }, 
        function (response) {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
          } else {
            console.log('Message sent successfully:', response);
          }
        }
      );
    }
  }
}, true);

// 页面加载完成后，为所有.m3u8链接添加视觉提示
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href*=".m3u8"]');
  
  links.forEach(link => {
    const element = link as HTMLAnchorElement;
    
    // 添加视觉提示样式
    element.style.borderBottom = '2px solid #ff6b6b';
    element.style.position = 'relative';
    
    // 添加提示文本
    const tooltip = document.createElement('span');
    tooltip.textContent = ' 🎥 点击使用HLS Player播放';
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      left: 50%;
      transform: translateX(-50%);
      bottom: 100%;
      margin-bottom: 5px;
    `;
    
    element.appendChild(tooltip);
    
    // 鼠标悬停显示提示
    element.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
});

console.log('HLS Player content script loaded');
