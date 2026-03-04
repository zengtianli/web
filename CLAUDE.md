# CLAUDE.md

## 模块名称

个人作品集网站

## 模块定位

水利工程师（曾田力）的个人作品集网站。基于 Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + shadcn/ui。部署在 Vercel。

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm (推荐)

### 本地开发

```bash
# 克隆项目
git clone https://github.com/zengtianli/web.git
cd website

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填写必要的 API 密钥

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3005
```

### 可用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 代码检查
```

## Git 工作流

项目采用 **main + develop** 双分支模式：

- **main** - 生产分支，推送后自动触发 Vercel 部署
- **develop** - 开发分支，日常开发在此分支进行

### 开发流程

```bash
# 1. 切换到 develop 分支
git checkout develop

# 2. 拉取最新代码
git pull origin develop

# 3. 开发并测试
pnpm dev
# 修改代码...

# 4. 本地构建验证（必须通过再推送）
pnpm build

# 5. 提交更改
git add <文件名>
git commit -m "feat: 描述你的修改"
git push origin develop

# 6. 测试通过后，合并到 main 触发部署
git checkout main
git pull origin main
git merge develop
git push origin main
```

### 提交规范

使用语义化提交信息前缀：

- `feat:` - 新功能
- `fix:` - 修复 Bug
- `docs:` - 文档更新
- `style:` - 样式调整
- `refactor:` - 代码重构
- `chore:` - 杂项（依赖更新、配置修改等）

## 目录结构

```
personal_site/
├── .cursor/
├── .git/
├── .next/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx
│   ├── layout.tsx
│   ├── projects/[slug]/
│   ├── blog/[slug]/
│   ├── resume/[version]/
│   └── tools/irrigation/
├── components/
│   ├── ui/                 # shadcn/ui 基础组件
│   ├── resume/             # 简历渲染组件
│   └── ...                 # 页面级组件
├── content/                # Markdown 内容
│   ├── posts/
│   ├── projects/
│   ├── project-source/ -> ~/cursor-shared/personal/projects  # 符号链接
│   ├── resume-source/ -> ~/cursor-shared/personal/resume     # 符号链接
│   └── about/
├── lib/
│   ├── content.ts          # 内容加载器
│   ├── resume-data.ts      # 简历数据
│   ├── resume-builder.ts   # 简历构建器
│   └── utils.ts
├── public/
│   └── archives/ -> ~/cursor-shared/archives/  # 符号链接
├── CLAUDE.md
├── package.json
├── next.config.mjs
└── tailwind.config.js
```

## 数据格式

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

### JSON 数据格式（由 sync 脚本生成）

```json
{
  "stats": {
    "total_files": 23,
    "total_folders": 8,
    "content_types": {
      "posts": 10,
      "projects": 5,
      "pages": 8
    }
  },
  "structure": [
    {
      "name": "app",
      "type": "folder",
      "path": "/Users/tianli/Downloads/personal_site/app",
      "children": [...]
    }
  ],
  "recent_updates": [
    {
      "file": "content/posts/latest-post.md",
      "modified": "2026-03-03T08:00:00.000Z"
    }
  ],
  "generated_at": "2026-03-03T08:00:00.000Z"
}
```

## 常用操作

### 操作1：启动本地开发服务器

```bash
cd ~/Downloads/personal_site/
pnpm dev

# 默认端口：3005
# 访问：http://localhost:3005
```

### 操作2：创建新文章

```bash
cd ~/Downloads/personal_site/content/posts/

cat > new-post.md << 'EOF'
---
title: 新文章标题
date: 2026-03-03
excerpt: 文章摘要
tags: [技术, 教程]
published: true
---

# 文章内容
...
EOF
```

### 操作3：构建生产版本

```bash
cd ~/Downloads/personal_site/
pnpm build

# 生成静态文件到 .next/ 目录
# 推送前必须本地验证
```

### 操作4：部署到线上

```bash
cd ~/Personal/website/

# 确保在 develop 分支开发
git checkout develop
git add <文件名>
git commit -m "feat: 描述修改"
git push origin develop

# 测试通过后，合并到 main 触发部署
git checkout main
git pull origin main
git merge develop
git push origin main

# 自动触发 Vercel 部署
# 线上地址：https://tianlizeng.cloud
```

### 操作5：查看部署状态

访问 [Vercel Dashboard](https://vercel.com/dashboard) 查看部署状态，通常 1-2 分钟完成。

## OA 系统集成（已废弃）

~~- **数据文件**：`~/cursor-shared/.oa/data/website.json`~~
~~- **同步脚本**：`~/cursor-shared/.oa/scripts/sync-website.mjs`~~
~~- **Web 界面**：http://localhost:3000/website~~

注：OA 系统集成已移除，网站独立管理。

## 架构说明

### 内容驱动

所有页面内容存储在 `content/` 目录的 Markdown 文件中，通过 `lib/content.ts` 加载：
- `getContent<T>(path)` — 解析单个 md 文件（gray-matter frontmatter + remark 转 HTML）
- `getNestedContent<T>(path)` — 仅提取 YAML frontmatter 数据（用于 skills、timeline、research 等结构化内容）
- `getAllBlogPosts()` / `getBlogPostBySlug(slug)` — 博客专用
- `getAllProjects()` / `getProjectBySlug(slug)` — 项目专用，优先读 `content/project-source/`，回退到 `content/projects/items/`

### 外部 Symlinks（已废弃）

~~部分内容通过符号链接引入外部目录：~~
- ~~`content/project-source/` → `~/cursor-shared/personal/projects`~~
- ~~`content/resume-source/` → `~/cursor-shared/personal/resume`~~
- ~~`public/archives/` → `~/cursor-shared/archives/`~~

注：符号链接已被实际文件替换以支持 Vercel 部署。修改内容文件不会影响外部仓库。

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

## 路径规范

**当前目录**：`~/Personal/website/`

**路径要求**：
- 所有路径必须是真实路径，不能是符号链接
- 内容文件统一放在 `content/` 目录
- 组件文件放在 `components/` 目录
- 页面路由放在 `app/` 目录

**端口规范**：
- 本地开发：3005
- OA 系统：3000
- 线上部署：https://tianlizeng.cloud

**符号链接**（已废弃）：
- ~~`content/project-source/` → `~/cursor-shared/personal/projects`~~
- ~~`content/resume-source/` → `~/cursor-shared/personal/resume`~~
- ~~`public/archives/` → `~/cursor-shared/archives/`~~

注：符号链接已被实际文件替换以支持 Vercel 部署。

## 注意事项

1. **包管理器**：使用 pnpm，不要用 npm
2. **端口冲突**：确保 3005 端口未被占用
3. **内容格式**：所有内容文件必须包含 frontmatter
4. **Git 管理**：日常开发在 develop 分支，测试通过后合并到 main
5. **自动部署**：推送到 main 分支会自动触发 Vercel 部署
6. **构建验证**：推送前必须本地运行 `pnpm build` 验证
7. **中文引号**：与 JS 字符串冲突时，用单引号包裹：`'浙江省水利厅"体育之星"'`
8. **客户端组件**：需要交互的组件加 `'use client'`
9. **路径处理**：所有路径使用真实路径，不使用符号链接

## 构建配置

- `next.config.mjs` 中 ESLint 和 TypeScript 错误在构建时被忽略（`ignoreDuringBuilds: true`）
- 图片未启用 Next.js 优化（`unoptimized: true`）

## 相关文档

- 全局规范：`~/.claude/CLAUDE.md`
- 项目文档：
  - [系统架构](docs/ARCHITECTURE.md)
  - [开发指南](docs/DEVELOPMENT.md)
  - [内容管理](docs/CONTENT_MANAGEMENT.md)
- Next.js 文档：https://nextjs.org/docs
- Vercel 部署：https://vercel.com/docs
- 在线访问：https://tianlizeng.cloud
