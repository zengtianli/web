# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

水利工程师（曾田力）的个人作品集网站。基于 Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + shadcn/ui。部署在 Vercel。

## 常用命令

```bash
pnpm dev          # 开发服务器，端口 3005
pnpm build        # 生产构建（推送前必须本地验证）
pnpm start        # 启动生产服务器
pnpm lint         # ESLint 检查
```

包管理器使用 pnpm，不要用 npm。

## 架构

### 内容驱动

所有页面内容存储在 `content/` 目录的 Markdown 文件中，通过 `lib/content.ts` 加载：
- `getContent<T>(path)` — 解析单个 md 文件（gray-matter frontmatter + remark 转 HTML）
- `getNestedContent<T>(path)` — 仅提取 YAML frontmatter 数据（用于 skills、timeline、research 等结构化内容）
- `getAllBlogPosts()` / `getBlogPostBySlug(slug)` — 博客专用
- `getAllProjects()` / `getProjectBySlug(slug)` — 项目专用，优先读 `content/project-source/`，回退到 `content/projects/items/`

### 外部 Symlinks（重要）

部分内容通过符号链接引入外部目录：
- `content/project-source/` → `~/cursor-shared/personal/projects`
- `content/resume-source/` → `~/cursor-shared/personal/resume`
- `public/archives/` → `~/cursor-shared/archives/`

修改这些目录的内容会影响外部仓库。

### 页面路由

动态路由使用 `generateStaticParams()` 实现 SSG：
- `/projects/[slug]` — 项目详情
- `/blog/[slug]` — 博客文章
- `/resume/[version]` — 简历版本（comprehensive, work, sports）
- `/tools/irrigation` — 农灌需水计算工具

### 组件结构

- `components/ui/` — shadcn/ui 基础组件（通过 `npx shadcn-ui@latest add` 管理）
- `components/resume/` — 简历渲染组件
- 页面级组件直接放 `components/` 根目录（navbar, footer, hero-section 等）
- 路径别名 `@/*` 映射到项目根目录

### 样式

- Tailwind CSS + CSS 变量实现明暗主题（class-based dark mode）
- `cn()` 工具函数（`lib/utils.ts`）合并类名
- 项目详情页有独立 CSS：`app/projects/[slug]/project-content.css`
- 全局 Markdown 渲染样式在 `app/globals.css`

### 简历系统

模块化简历：`lib/resume-data.ts`（数据）→ `lib/resume-builder.ts`（构建器）→ `components/resume/`（渲染组件）。支持多版本简历模板。

### 数据验证与表单

联系表单：react-hook-form + zod 验证 → `/api/contact` → Resend 发送邮件。

## 内容格式

### 博客文章 frontmatter

```yaml
title: "标题"
date: "2025-10-11"
excerpt: "摘要"
tags: ["tag1", "tag2"]
image: "/images/blog/cover.jpg"  # 可选
published: true                   # 可选
```

### 项目 frontmatter

```yaml
title: "项目名"
slug: "project-slug"
role: "角色"
tags: ["tag1"]
period: "2024-2025"      # 可选
category: "水资源规划"    # 可选
highlight: true           # 可选
featured: true            # 可选
```

### 研究内容（YAML-only）

awards、patents、software-copyrights、academic-papers 使用纯 YAML frontmatter 结构，通过 `getNestedContent()` 读取。

## 构建注意事项

- `next.config.mjs` 中 ESLint 和 TypeScript 错误在构建时被忽略（`ignoreDuringBuilds: true`）
- 图片未启用 Next.js 优化（`unoptimized: true`）
- 中文引号与 JS 字符串冲突时，用单引号包裹：`'浙江省水利厅"体育之星"'`
- 服务器组件不能使用事件处理器，需要交互的组件加 `'use client'`
