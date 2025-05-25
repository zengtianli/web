# 个人作品集网站架构文档

## 1. 整体架构设计思路

本项目是一个基于Next.js 13+（使用App Router）的个人作品集网站，旨在展示学术研究、项目作品和联系方式等内容。整体架构采用了现代前端开发的最佳实践，包括：

- **服务器端渲染 (SSR)**: 利用Next.js的App Router架构实现页面的服务器端渲染，提高首屏加载速度和SEO效果
- **组件化开发**: 将UI拆分为可复用的组件，提高代码的可维护性和可扩展性
- **类型安全**: 使用TypeScript确保代码的类型安全和开发体验
- **响应式设计**: 通过Tailwind CSS实现适配不同设备的响应式布局
- **主题切换**: 支持暗/亮模式切换，提升用户体验
- **全站搜索**: 实现了基于客户端搜索索引的全站内容搜索功能

整体系统采用了前端渲染为主、API接口为辅的架构方式，将静态内容（如项目展示）与动态交互（如搜索功能）有机结合。

## 2. 各个文件夹的作用和职责

项目的文件结构基于Next.js的约定式文件组织方式，主要包含以下目录：

### `/app`
Next.js的App Router核心目录，包含所有页面和路由定义：
- 采用文件系统路由，每个文件夹对应一个路由路径
- 每个路由文件夹中的`page.tsx`定义该路由的页面组件
- `layout.tsx`定义全局布局

### `/components`
包含所有可复用的UI组件，按功能和用途进行组织：
- 页面级组件：如`hero-section.tsx`、`strengths-section.tsx`等
- 功能性组件：如`search-dialog.tsx`、`contact-form.tsx`等
- UI原子组件：位于`ui/`子文件夹，基于shadcn/ui组件库

### `/data`
存放静态数据和内容配置：
- `projects.ts`：项目案例数据

### `/hooks`
自定义React Hooks：
- `use-mobile.ts`：检测移动设备的Hook

### `/lib`
通用工具函数和库：
- `utils.ts`：通用工具函数

### `/public`
静态资源文件：
- 图片、图标
- `search-index.json`：全站搜索索引

### `/scripts`
构建脚本和工具：
- `build-search-index.mjs`：生成搜索索引的脚本

### `/styles`
全局样式定义和Tailwind配置

## 3. 关键文件的功能说明

### 核心配置文件

- **`package.json`**: 项目依赖和脚本配置
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "node scripts/build-search-index.mjs && next build",
      "start": "next start",
      "lint": "next lint",
      "build:search-index": "node scripts/build-search-index.mjs"
    }
  }
  ```
  注意构建时会先生成搜索索引，然后再执行Next.js构建

- **`app/layout.tsx`**: 全局布局组件
  ```tsx
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      <html lang="zh-CN" suppressHydrationWarning>
        <body className={`${inter.variable} ${montserrat.variable} ${exo2.variable} ${orbitron.variable} font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    )
  }
  ```
  定义了全局主题提供者、字体配置等

### 页面组件

- **`app/page.tsx`**: 首页组件
  ```tsx
  export default function Home() {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <HeroSection />
          <StrengthsSection />
          <LatestUpdates />
        </div>
        <Footer />
      </main>
    )
  }
  ```

- **`app/about/page.tsx`**: 关于页面
- **`app/projects/page.tsx`**: 项目列表页面
- **`app/projects/[slug]/page.tsx`**: 项目详情页面（动态路由）
- **`app/research/page.tsx`**: 研究成果页面
- **`app/contact/page.tsx`**: 联系页面

### 功能组件

- **`components/navbar.tsx`**: 导航栏组件，包含响应式菜单和搜索功能
- **`components/search-dialog.tsx`**: 全站搜索对话框，与搜索API交互
- **`components/hero-section.tsx`**: 首页英雄区组件
- **`components/skills-visual.tsx`**: 技能可视化组件

### API路由

- **`app/api/search/route.ts`**: 搜索API接口
- **`app/api/debug-search/route.ts`**: 调试用搜索API接口

## 4. 组件层次关系

项目采用组件化的方式组织UI，主要有以下几个层次：

### 布局层
- `RootLayout`: 全局布局，包含主题提供者和全局样式
  - `ThemeProvider`: 主题切换功能提供者
    - `Navbar`: 顶部导航栏
      - `SearchDialog`: 搜索对话框
    - `主内容区`: 各页面内容
    - `Footer`: 页脚组件

### 页面组件层
每个页面由多个功能组件组成：
- `HomePage`: 首页
  - `HeroSection`: 英雄区域
  - `StrengthsSection`: 专长介绍区域
  - `LatestUpdates`: 最新动态区域
- `AboutPage`: 关于页面
  - `AboutIntro`: 自我介绍
  - `SkillsVisual`: 技能可视化
  - `Timeline`: 时间轴组件
- `ProjectsPage`: 项目页面
  - `ProjectGrid`: 项目网格展示
- `ProjectDetailPage`: 项目详情页面
- `ResearchPage`: 研究成果页面
  - `AcademicPapers`: 学术论文组件
  - `Patents`: 专利组件
  - `SoftwareCopyrights`: 软件著作权组件
- `ContactPage`: 联系页面
  - `ContactForm`: 联系表单
  - `ContactInfo`: 联系信息

### UI组件层
基于shadcn/ui的原子级UI组件：
- 按钮、卡片、对话框、表单控件等

## 5. 路由结构设计

项目采用Next.js 13+ App Router的文件系统路由，主要路由结构如下：

```
/                 - 首页
/about            - 关于页面
/projects         - 项目列表页面
/projects/[slug]  - 项目详情页面（动态路由）
/research         - 研究成果页面
/contact          - 联系页面
/api/search       - 搜索API
/api/debug-search - 调试用搜索API
```

特点：
- 使用了Next.js的文件系统路由，每个页面对应一个目录
- 支持动态路由（如`/projects/[slug]`）
- API路由与页面路由分离，位于`/api`目录下

## 6. API 接口设计

本项目主要是前端展示型网站，API接口较少，主要包括：

### 搜索API

**端点**: `/api/search`

**方法**: GET

**参数**:
- `q`: 搜索关键词

**响应**:
```typescript
interface SearchResultItem {
  id: string;
  title: string;
  url: string;
  content?: string;
  type?: string;
}
```

**实现**:
搜索API通过在构建时预生成的`search-index.json`进行搜索，并返回匹配结果。

## 7. 数据流向

项目中的数据流向主要有以下几种：

### 静态数据流
1. 项目数据：
   - 数据源: `/data/projects.ts`
   - 流向: 项目列表页和项目详情页

2. 个人信息数据：
   - 嵌入在对应组件中，如`AboutIntro`、`ContactInfo`等

### 动态数据流
1. 搜索功能数据流：
   - 用户输入 → SearchDialog组件
   - SearchDialog → API请求（/api/search）
   - API响应 → SearchDialog展示结果
   - 用户选择结果 → 路由跳转

2. 主题切换数据流：
   - 用户操作 → ThemeProvider
   - ThemeProvider → localStorage保存设置
   - ThemeProvider → 应用主题CSS

## 8. 样式组织方式

项目采用Tailwind CSS进行样式管理，主要特点：

1. **原子化CSS**：
   - 使用Tailwind的原子类名进行样式定义
   - 例：`className="container mx-auto px-4 py-4 flex items-center justify-between"`

2. **响应式设计**：
   - 使用Tailwind的响应式前缀
   - 例：`className="hidden md:flex items-center space-x-8"`

3. **主题切换**：
   - 利用CSS变量和Tailwind的dark模式
   - 通过`next-themes`库管理主题切换

4. **自定义组件**：
   - 使用shadcn/ui组件库，基于Radix UI
   - 位于`/components/ui/`目录

5. **全局样式**：
   - 位于`/app/globals.css`
   - 包含基础样式和字体定义

6. **组件样式动态化**：
   - 使用`cn()`工具函数进行条件类名组合
   - 例：
     ```tsx
     className={cn(
       "fixed top-0 w-full z-50 transition-all duration-300",
       isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
     )}
     ```

7. **动画效果**：
   - 使用Tailwind的过渡类
   - 例：`transition-all duration-300`

## 9. 构建和部署流程

1. **开发流程**：
   - `npm run dev`: 本地开发服务器

2. **构建流程**：
   - `npm run build`:
     1. 执行`scripts/build-search-index.mjs`生成搜索索引
     2. 执行`next build`构建静态资源和服务端代码

3. **部署流程**：
   - 静态导出或服务器部署
   - 支持Vercel等平台的一键部署

## 10. 技术栈总结

### 前端框架
- **Next.js 15.2.4**: React框架，提供SSR、文件系统路由等功能
- **React 19**: UI库
- **TypeScript**: 类型系统

### UI和样式
- **Tailwind CSS**: 原子化CSS框架
- **shadcn/ui**: 基于Radix UI的组件库
- **lucide-react**: 图标库

### 功能库
- **next-themes**: 主题切换
- **react-hook-form**: 表单处理
- **zod**: 数据验证
- **react-particles**: 粒子效果
- **recharts**: 图表库

### 开发工具
- **ESLint**: 代码质量检查
- **TypeScript**: 类型检查

## 11. 拓展和改进方向

1. **内容管理系统集成**：
   - 考虑添加Headless CMS以简化内容更新

2. **国际化支持**：
   - 添加多语言支持，如英文版本

3. **性能优化**：
   - 进一步优化图片加载和组件懒加载

4. **用户交互改进**：
   - 添加更多动画和交互效果
   - 优化移动端体验

5. **SEO优化**：
   - 完善元数据
   - 添加结构化数据

6. **监控和分析**：
   - 集成分析工具，如Google Analytics

7. **自动化测试**：
   - 添加单元测试和集成测试
