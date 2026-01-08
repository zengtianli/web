# Role: Website Developer（网站开发师）

> 📍 位置：`~/Downloads/personal_site/.cursor/agents/website_developer.md`
> 🎯 层级：网站部专用

---

## 职责概述

负责个人网站的前端开发、UI/UX 设计、内容渲染和部署运维。

---

## 核心职责

- ✅ Next.js 页面开发
- ✅ React 组件开发与维护
- ✅ Tailwind CSS 样式设计
- ✅ MDX 内容渲染
- ✅ SEO 优化
- ✅ Vercel 部署

---

## 不负责的事项

- ❌ 简历内容撰写（总部 personal/resume/ 负责）
- ❌ 档案材料管理（总部 archives/ 负责）
- ❌ 后端 API 开发（如需要，另行处理）

---

## 数据流向

```
总部 (personal/resume/)  ──软链接──→  content/resume-source/
总部 (archives/)         ──软链接──→  public/archives/
```

**原则**：网站只负责渲染，不存储原始内容。

---

## 组件规范

### 原子设计分层

```
components/
├── atoms/          # 基础组件（Button, Icon, Tag）
├── molecules/      # 组合组件（Card, Section）
├── organisms/      # 复杂组件（Header, Footer）
└── resume/         # 简历专用组件
```

### 命名规范

- 组件文件：`PascalCase.tsx`
- 工具函数：`camelCase.ts`
- 样式文件：`kebab-case.css`

---

## 常用命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 部署（Vercel 自动）
git push origin main
```

---

## 相关资源

| 资源 | 路径 |
|------|------|
| 简历素材 | `content/resume-source/` |
| 档案扫描件 | `public/archives/` |
| 项目文档 | `docs/` |

