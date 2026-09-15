# Personal Portfolio Website

[中文](README.md) | **English**

> Tianli Zeng's personal portfolio website, presenting research and project experience in water engineering

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## Introduction

A modern personal portfolio built with Next.js 15, combining a professional background in water engineering with current web technologies to present:

- 🚀 **Projects** - Digital twins, water-resource assessment, GIS applications, and more
- 📚 **Research** - Academic papers, patents, and software copyrights
- 📝 **Technical blog** - Development experience and technical knowledge
- 👤 **Resume** - A multi-version online resume system
- 🛠️ **Development tools** - Neovim configuration, Shell scripts, and more

## Technology Stack

### Core Frameworks
- **Next.js 15** - Full-stack React framework (App Router)
- **React 19** - Modern UI library
- **TypeScript** - Type safety

### UI and Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Content Management
- **Markdown** - Content authoring format
- **Gray Matter** - Metadata parsing
- **Remark** - Markdown processing

### Features
- **Resend** - Email service
- **Zod** - Data validation
- **next-themes** - Theme switching
- **Google Analytics** - Website analytics

## Quick Start

### Requirements
- Node.js >= 18
- pnpm (recommended) or npm

### Local Development

```bash
# 克隆项目
git clone https://github.com/zengtianli/web.git
cd portfolio

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填写必要的 API 密钥

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3005
```

### Available Commands

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 代码检查
```

## Project Documentation

Full development documentation is in `docs/`:

- **[System architecture](docs/ARCHITECTURE.md)** - Technical architecture, directory structure, and component relationships
- **[Development guide](docs/DEVELOPMENT.md)** - Development workflow, testing, deployment, and troubleshooting
- **[Content management](docs/CONTENT_MANAGEMENT.md)** - Adding posts and projects, and updating resumes

### Quick Navigation

- **Add a blog post** → [Content management guide](docs/CONTENT_MANAGEMENT.md#添加博客文章)
- **Add a project** → [Content management guide](docs/CONTENT_MANAGEMENT.md#添加项目案例)
- **Update personal information** → [Content management guide](docs/CONTENT_MANAGEMENT.md#更新个人信息)
- **Deploy to Vercel** → [Development guide](docs/DEVELOPMENT.md#部署流程)
- **Troubleshooting** → [Development guide](docs/DEVELOPMENT.md#故障排查)

## Project Structure

```
portfolio/
├── app/                    # Next.js 应用页面
├── components/             # React 组件
│   ├── atoms/              # 原子组件
│   ├── molecules/          # 分子组件
│   ├── resume/             # 简历组件
│   └── ui/                 # 基础 UI 组件
├── content/                # Markdown 内容
│   ├── about/              # 关于页面
│   ├── blog/               # 博客文章
│   ├── projects/           # 项目案例
│   ├── research/           # 研究成果
│   └── resume/             # 简历内容
├── lib/                    # 工具库
├── public/                 # 静态资源
├── docs/                   # 项目文档
└── scripts/                # 构建脚本
```

## Core Features

### 🎨 Modern Design
- Responsive layout for all devices
- Light/dark theme switching
- Smooth page animations
- Accessibility standards

### 📝 Content-Driven
- Markdown content management
- Dynamic route generation
- Metadata support
- SEO optimization

### 🚀 Performance Optimization
- Static generation (SSG)
- Image optimization (WebP)
- Code splitting
- Font optimization

### 📄 Resume System
- Multiple resume versions (general/work/academic/sports)
- Online preview and PDF export
- Modular data management
- Print optimization

## Commit and Deploy

The project deploys automatically through Vercel. A push to `main` triggers a build and release.

```bash
# 1. 本地构建验证（必须通过再推送，避免线上构建失败）
pnpm build

# 2. 查看改动
git status
git diff

# 3. 暂存文件（指定具体文件，避免误提交敏感文件）
git add <文件名>

# 4. 提交（使用语义化前缀）
git commit -m "feat: 描述你的修改"

# 5. 推送到 GitHub，Vercel 自动部署
git push origin main
```

Commit prefixes: `feat:` new features / `fix:` fixes / `docs:` documentation / `chore:` miscellaneous / `refactor:` refactoring

Check deployment status in the [Vercel Dashboard](https://vercel.com/dashboard); it usually finishes in 1-2 minutes.

### Environment Variables

Configure in Vercel or `.env.local`:

```bash
# Resend API (联系表单)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@gmail.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Contributing

This is a personal project primarily for showcasing personal work. Suggestions and issue reports are welcome.

## License

© 2025 曾田力. All rights reserved.

---

**Visit online**: [tianlizeng.cloud](https://tianlizeng.cloud)
