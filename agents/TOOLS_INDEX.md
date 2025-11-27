# 🔧 工具索引

Portfolio 项目常用工具和命令索引。

---

## 📦 开发命令

```bash
# 开发服务器
pnpm dev

# 构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

---

## 📁 关键文件位置

### 配置文件

| 文件 | 用途 |
|------|------|
| `package.json` | 依赖和脚本 |
| `tailwind.config.ts` | Tailwind 配置 |
| `tsconfig.json` | TypeScript 配置 |
| `next.config.mjs` | Next.js 配置 |
| `components.json` | shadcn/ui 配置 |

### 内容管理

| 目录 | 内容类型 |
|------|---------|
| `content/blog/` | 博客文章 |
| `content/projects/items/` | 项目描述 |
| `content/research/` | 研究成果 |
| `content/resume/` | 简历配置 |
| `content/resume-materials/` | 简历原始材料 |

### 核心代码

| 文件 | 功能 |
|------|------|
| `lib/content.ts` | 内容读取工具 |
| `lib/seo-config.ts` | SEO 配置 |
| `lib/resume-data.ts` | 简历数据 |
| `lib/resume-builder.ts` | 简历构建器 |
| `lib/utils.ts` | 通用工具函数 |

---

## 🎨 组件库

### shadcn/ui 组件 (components/ui/)

常用组件：
- `Button` - 按钮
- `Card` - 卡片
- `Dialog` - 对话框
- `Tabs` - 标签页
- `Badge` - 徽章
- `Avatar` - 头像
- `Toast` - 提示

### 业务组件

| 组件 | 文件 | 用途 |
|------|------|------|
| Navbar | `navbar.tsx` | 导航栏 |
| Footer | `footer.tsx` | 页脚 |
| HeroSection | `hero-section.tsx` | 首页横幅 |
| ProjectGrid | `project-grid.tsx` | 项目网格 |
| BlogCard | `blog-card.tsx` | 博客卡片 |
| Timeline | `timeline.tsx` | 时间线 |

---

## 🔍 常用搜索命令

```bash
# 查找组件使用
grep -r "ComponentName" app/ components/

# 查找样式类
grep -r "className.*specific-class" components/

# 查找内容文件
find content/ -name "*.md" | xargs grep "关键词"

# 统计文件
find . -name "*.tsx" | wc -l
```

---

## 🖼️ 图片处理

```bash
# 图片存放位置
public/images/

# 优化图片脚本
node scripts/optimize-images.mjs

# 推荐格式
WebP (优先) > PNG (透明) > JPG (照片)

# 推荐尺寸
- OG 图片: 1200x630
- 头像: 400x400
- 项目封面: 800x600
- 博客配图: 1200x800
```

---

## 🌐 部署相关

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署预览
vercel

# 部署生产
vercel --prod
```

### 环境变量

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=your-resend-api-key
```

---

## 📊 性能检查

```bash
# Lighthouse
npx lighthouse https://your-domain.com --view

# Bundle 分析
ANALYZE=true pnpm build
```

---

## 🔗 参考链接

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React 文档](https://react.dev/)


