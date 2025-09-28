# HLS Player Chrome Extension (React)

一个基于 React 和 TypeScript 开发的 Chrome 扩展，用于播放 HLS (HTTP Live Streaming) 视频流。

## 功能特性

- 🎥 **HLS 视频播放**：支持 m3u8 格式的 HLS 视频流播放
- 🔗 **自动检测**：自动检测网页中的.m3u8 链接并添加播放提示
- 🎛️ **弹窗控制**：通过扩展弹窗快速输入和播放视频链接
- 📱 **响应式设计**：适配不同屏幕尺寸的播放界面
- ⚡ **高性能**：使用 HLS.js 库提供流畅的播放体验
- 🛡️ **类型安全**：基于 TypeScript 开发，提供完整的类型支持

## 技术栈

- **前端框架**：React 19.1.1
- **开发语言**：TypeScript
- **构建工具**：Webpack 5
- **HLS 播放**：hls.js (通过 npm 依赖)
- **样式**：CSS3
- **扩展 API**：Chrome Extension Manifest V3

## 项目结构

```
hlsplayer-react/
├── public/
│   ├── manifest.json          # 扩展配置文件
│   ├── popup.html            # 弹窗页面模板
│   ├── player.html           # 播放器页面模板
│   └── static/
│       └── icon128.png       # 扩展图标
├── src/
│   ├── components/
│   │   ├── HLSPlayer.tsx     # HLS播放器组件
│   │   ├── HLSPlayer.css     # 播放器样式
│   │   ├── Popup.tsx         # 弹窗组件
│   │   └── Popup.css         # 弹窗样式
│   ├── pages/
│   │   ├── popup.tsx         # 弹窗页面入口
│   │   └── player.tsx        # 播放器页面入口
│   ├── background.ts         # 后台脚本
│   └── content.ts            # 内容脚本
├── dist/                     # 构建输出目录
├── package.json
├── webpack.config.js
└── tsconfig.json
```

## 安装和开发

### 环境要求

- Node.js 16+
- pnpm (推荐) 或 npm
- Chrome 浏览器

### 安装 pnpm

如果还没有安装 pnpm，可以通过以下方式安装：

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm

# 或使用其他包管理器
# yarn global add pnpm
# brew install pnpm (macOS)
```

### 开发步骤

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd hlsplayer-react
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **开发模式**

   ```bash
   pnpm dev
   ```

4. **生产构建**
   ```bash
   pnpm build
   ```

### 安装扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的 `dist` 目录

## 使用方法

### 通过弹窗播放

1. 点击浏览器工具栏中的扩展图标
2. 在弹窗中输入 m3u8 视频链接
3. 点击"Play"按钮开始播放

### 自动检测播放

1. 访问包含.m3u8 链接的网页
2. 扩展会自动为链接添加视觉提示
3. 点击链接即可直接播放

## 开发说明

### 扩展架构

- **Manifest V3**：使用最新的 Chrome 扩展规范
- **Service Worker**：后台脚本使用 Service Worker
- **Content Scripts**：内容脚本用于页面交互
- **Web Accessible Resources**：资源文件可被网页访问

### 权限说明

- `webRequest`：拦截网络请求，自动处理.m3u8 链接
- `host_permissions`：访问所有网站以检测 HLS 链接

### 构建配置

- **Webpack 5**：模块打包和代码分割
- **TypeScript**：类型检查和编译
- **CSS Loader**：样式文件处理
- **Copy Plugin**：静态资源复制

## 浏览器兼容性

- Chrome 88+
- 支持 HLS.js 的所有现代浏览器
- Safari 原生 HLS 支持

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 更新日志

### v4.0.0

- 升级到 React 19
- 集成 hls.js 作为 npm 依赖
- 优化 TypeScript 类型定义
- 改进错误处理机制

## 常见问题

### Q: 为什么某些视频无法播放？

A: 可能是由于 CORS 限制或视频源不支持。请检查浏览器控制台的错误信息。

### Q: 扩展在某个网站上不工作？

A: 确保网站允许扩展访问，检查 host_permissions 配置。

### Q: 如何调试扩展？

A: 使用 Chrome 开发者工具，在扩展页面点击"检查视图"来调试 popup 和 content scripts。

## 技术支持

如有问题或建议，请通过以下方式联系：

- 创建 Issue
- 发送邮件至项目维护者
- 访问项目主页：https://www.hlsplayer.org/

---

**注意**：本项目仅供学习和研究使用，请遵守相关法律法规和视频版权规定。
