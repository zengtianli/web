# 🤖 Portfolio Agent 团队

这是为 **个人作品集网站** 定制的 Agent 团队，帮助你高效管理和开发网站。

---

## 📋 Agent 列表

| 编号 | Agent | 文件 | 职责 |
|:---:|-------|------|------|
| 00 | **Project Architect** | `00_project_architect.md` | 项目架构师：导航 + 进化 |
| 01 | **Content Manager** | `01_content_manager.md` | 内容管理：博客、项目、研究成果 |
| 02 | **UI Developer** | `02_ui_developer.md` | UI 开发：组件、页面、样式 |
| 03 | **Resume Specialist** | `03_resume_specialist.md` | 简历专家：多版本简历系统 |
| 04 | **SEO Optimizer** | `04_seo_optimizer.md` | SEO 优化：元数据、网站地图 |
| 05 | **Design System** | `05_design_system.md` | 设计系统：令牌、变体、主题 |

---

## 🎯 快速选择指南

### 我想要...

| 需求 | 推荐 Agent | 调用方式 |
|------|-----------|---------|
| 了解项目结构 | 00 Project Architect | `@00_project_architect.md` |
| 写博客/更新内容 | 01 Content Manager | `@01_content_manager.md` |
| 添加/修改组件 | 02 UI Developer | `@02_ui_developer.md` |
| 管理简历 | 03 Resume Specialist | `@03_resume_specialist.md` |
| 优化 SEO | 04 SEO Optimizer | `@04_seo_optimizer.md` |
| 调整设计/主题 | 05 Design System | `@05_design_system.md` |

---

## 🔄 工作流示例

### 添加新博客文章

```
1. @01_content_manager.md 创建博客内容
2. @04_seo_optimizer.md 优化 SEO 元数据
3. @02_ui_developer.md 调整展示效果（如需）
```

### 添加新项目展示

```
1. @01_content_manager.md 创建项目 Markdown
2. @02_ui_developer.md 调整项目卡片样式（如需）
3. @04_seo_optimizer.md 更新 sitemap
```

### 更新简历

```
1. @03_resume_specialist.md 更新简历数据
2. @02_ui_developer.md 调整简历组件（如需）
3. 导出 PDF 检查
```

### 主题调整

```
1. @05_design_system.md 修改设计令牌
2. @02_ui_developer.md 更新受影响组件
3. 测试亮色/暗色模式
```

---

## 📁 项目结构速查

```
portfolio/
├── 📁 app/              ← 页面和路由
├── 📁 components/       ← React 组件
│   ├── atoms/               原子组件
│   ├── molecules/           分子组件
│   ├── ui/                  shadcn/ui 组件
│   └── resume/              简历组件
├── 📁 content/          ← Markdown 内容
├── 📁 lib/              ← 工具函数和配置
│   └── design-system/       设计系统
├── 📁 public/           ← 静态资源
└── 📁 agents/           ← Agent 定义（本目录）
```

---

## 🛠️ 技术栈

- **框架**: Next.js 15 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **内容**: Markdown + gray-matter
- **部署**: Vercel（推荐）

---

## 💡 使用技巧

1. **组合使用**: 复杂任务可以顺序调用多个 Agent
2. **具体描述**: 给 Agent 清晰的任务描述效果更好
3. **检查输出**: 让 Agent 完成后检查修改是否符合预期
4. **迭代优化**: 可以多次调用同一 Agent 逐步完善

---

## 📅 生成信息

- **生成日期**: 2025-11-27
- **项目类型**: Next.js 个人作品集
- **生成器**: 00_project_architect.md v2.0


