// Background script for HLS Player Chrome Extension

let enabled = true;

// 监听网络请求，自动拦截.m3u8链接
chrome.webRequest.onBeforeRequest.addListener(
  function (info) {
    if (enabled && 
        info.type === "main_frame" && 
        info.url.split("?")[0].split("#")[0].endsWith("m3u8")) {
      
      const playerUrl = chrome.runtime.getURL('player.html') + "#" + info.url;
      
      chrome.tabs.create({ url: playerUrl }, () => {
        chrome.tabs.remove(info.tabId);
      });
      
      return { redirectUrl: playerUrl };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// 处理来自content script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === 'CMD_PLAY_M3U8') {
    const playerUrl = chrome.runtime.getURL('player.html') + "#" + request.url;
    chrome.tabs.create({ url: playerUrl });
    sendResponse({ success: true });
  }
  
  if (request.command === 'TOGGLE_ENABLED') {
    enabled = request.enabled;
    sendResponse({ enabled: enabled });
  }
  
  if (request.command === 'GET_STATUS') {
    sendResponse({ enabled: enabled });
  }
  
  return true; // 保持消息通道开放以支持异步响应
});

// 扩展安装时的初始化
chrome.runtime.onInstalled.addListener((details) => {
  console.log('HLS Player React Extension installed:', details);
});
