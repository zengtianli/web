# 曾田力个人作品集网站 🌊

> 融合水利工程专业智慧与前沿信息技术的个人作品集网站

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 项目概述

本项目是曾田力博士的个人作品集网站，展示其在水利工程、数据科学和软件开发领域的专业技能与研究成果。作为一名浙江大学水利工程专业博士，曾田力专注于水利信息化、数字孪生与智慧水利研究，致力于通过数据分析、智能模型及软件系统研发，解决复杂水资源挑战。

### 🎯 核心特色

- **专业背景**: 浙江大学水利工程博士，现任浙江省水利水电规划设计院工程师
- **技术融合**: 将传统水利工程与现代信息技术相结合
- **实践导向**: 主导多个重点水利工程项目的技术方案制定与实施
- **学术成果**: 发表多篇核心期刊论文，获得多项软件著作权

## 🚀 技术栈

### 前端框架
- **Next.js 15.2.4** - 基于App Router的React全栈框架
- **React 19** - 现代化React库，支持最新特性
- **TypeScript 5** - 类型安全的JavaScript超集

### 样式和UI
- **Tailwind CSS 3.4.17** - 原子化CSS框架
- **shadcn/ui** - 高质量、可访问的UI组件库
- **Radix UI** - 无样式、可访问的UI基础组件
- **Lucide React** - 精美的图标库

### 功能特性
- **next-themes** - 主题切换（暗/亮模式）
- **gray-matter** - Markdown文件元数据解析
- **remark** - Markdown内容处理
- **cmdk** - 命令面板式搜索
- **react-hook-form** - 表单处理
- **zod** - 数据验证
- **date-fns** - 日期处理工具

### 开发工具
- **pnpm** - 快速、节省磁盘空间的包管理器
- **PostCSS** - CSS后处理器
- **ESLint** - 代码质量检查

## ✨ 功能特点

### 🎨 现代化设计
- **响应式布局** - 完美适配桌面端、平板和移动设备
- **主题切换** - 支持暗色/亮色模式切换
- **流畅动画** - 精心设计的页面过渡和交互动画
- **无障碍友好** - 遵循Web无障碍标准

### 🔍 强大搜索
- **全站搜索** - 基于预构建索引的快速搜索
- **智能匹配** - 支持内容、标题、标签的模糊匹配
- **快捷操作** - 支持键盘快捷键（Ctrl+K / Cmd+K）

### 📄 内容管理
- **Markdown驱动** - 内容采用Markdown格式，易于维护
- **元数据支持** - 支持丰富的文章元数据
- **动态路由** - 自动生成项目详情页面

### 🎯 专业展示
- **项目作品集** - 详细展示专业项目案例
- **研究成果** - 学术论文、专利、软件著作权展示
- **技能可视化** - 直观展示专业技能水平
- **时间线** - 教育和工作经历的时间线展示

## 📁 目录结构

```
portfolio/
├── app/                    # Next.js App Router页面
│   ├── about/             # 关于页面
│   ├── api/               # API路由
│   │   ├── search/        # 搜索API
│   │   └── debug-search/  # 调试搜索API
│   ├── contact/           # 联系页面
│   ├── projects/          # 项目页面
│   │   └── [slug]/        # 动态项目详情页
│   ├── research/          # 研究成果页面
│   ├── search/            # 搜索页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── hero-section.tsx  # 英雄区组件
│   ├── navbar.tsx        # 导航栏
│   ├── search-dialog.tsx # 搜索对话框
│   └── ...               # 其他功能组件
├── content/              # 内容文件（Markdown）
│   ├── about/           # 关于页面内容
│   ├── home/            # 首页内容
│   ├── projects/        # 项目内容
│   └── research/        # 研究成果内容
├── data/                # 数据文件
│   └── projects.ts      # 项目数据
├── hooks/               # 自定义React Hooks
├── lib/                 # 工具函数
│   ├── content.ts       # 内容处理工具
│   ├── search.ts        # 搜索功能
│   └── utils.ts         # 通用工具
├── public/              # 静态资源
│   ├── images/          # 图片资源
│   └── search-index.json # 搜索索引
├── scripts/             # 构建脚本
│   └── build-search-index.mjs # 搜索索引生成脚本
└── styles/              # 样式文件
```

## 🛠️ 安装和运行

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装步骤

1. **克隆项目**
```bash
git clone [项目仓库地址]
cd portfolio
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
pnpm dev
```

4. **访问网站**
打开浏览器访问 `http://localhost:3000`

### 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行ESLint检查
- `pnpm build:search-index` - 生成搜索索引

## 🚀 部署指南

### Vercel部署（推荐）

1. 将项目推送到GitHub/GitLab
2. 在Vercel中导入项目
3. 配置环境变量（如有需要）
4. 部署完成

### 自主部署

1. **构建项目**
```bash
pnpm build
```

2. **启动生产服务器**
```bash
pnpm start
```

3. **Nginx配置示例**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 内容管理

### 添加新项目

1. 在`data/projects.ts`中添加项目数据
2. 在`content/projects/items/`中创建对应的Markdown文件
3. 添加项目相关图片到`public/images/`
4. 重新构建搜索索引

### 更新个人信息

- 编辑`content/about/`目录下的Markdown文件
- 更新`content/home/hero.md`中的首页信息
- 修改`content/research/`目录下的研究成果

### 搜索索引更新

当内容发生变化时，需要重新生成搜索索引：

```bash
pnpm build:search-index
```

## 🎯 核心亮点

### 专业项目展示

1. **数字孪生浙东引水** - 利用机器学习和多源数据融合技术，构建数字孪生模型
2. **绍兴水资源承载力评价** - 基于多准则决策方法，开发水资源承载力评价系统
3. **钱塘江岸线规划** - 结合GIS空间分析技术，开发岸线分级分类系统
4. **浙江省用水量变化研究** - 应用时间序列分析与深度学习方法，研究区域用水量变化规律

### 技术能力

- **水利工程**: 水文模拟、水资源规划、水源地评价等
- **数据科学**: 机器学习、时间序列分析、空间分析、深度学习
- **软件开发**: Python、React/Next.js、Fortran、GIS开发等

### 学术成果

- **期刊论文**: 发表于《水科学进展》、《水利学报》等核心期刊
- **软件著作权**: 获得3项软件著作权，涵盖水资源管理各个方面
- **国际交流**: 美国克拉克森大学联合培养经历，ASCE会议论文发表

## 🤝 贡献指南

欢迎提交Issues和Pull Requests来帮助改进这个项目。

### 开发流程

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

### 代码规范

- 使用TypeScript编写代码
- 遵循ESLint规则
- 保持代码简洁和可读性
- 添加适当的注释

## 📄 许可证

本项目采用MIT许可证，详情请参见LICENSE文件。

## 📧 联系方式

- **邮箱**: [联系邮箱]
- **LinkedIn**: [LinkedIn主页]
- **GitHub**: [GitHub主页]

---

**驱动创新，智绘水利** - 曾田力的数字化水利工程之路 🌊 