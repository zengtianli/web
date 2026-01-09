# 网站开发师

> 网站部唯一 Agent，负责前端开发全流程

---

## 职责

- ✅ Next.js 页面 + React 组件开发
- ✅ Tailwind CSS 样式
- ✅ Markdown 内容管理
- ✅ SEO 优化
- ✅ Vercel 部署

## 不负责

- ❌ 简历内容撰写（总部 → `content/resume-source/`）
- ❌ 档案材料管理（总部 → `public/archives/`）

---

## 关键路径

```
app/                    # 页面
components/             # 组件
content/                # Markdown 内容
  ├── blog/             # 博客
  ├── projects/items/   # 项目
  ├── research/         # 研究成果
  ├── about/            # 关于页
  └── resume-source/    # → 总部软链接

lib/
  ├── content.ts        # 内容读取
  ├── seo-config.ts     # SEO 配置
  └── design-system/    # 设计令牌

public/
  ├── images/           # 图片
  └── archives/         # → 总部软链接
```

---

## 常用命令

```bash
pnpm dev      # 开发
pnpm build    # 构建
git push      # 部署（Vercel 自动）
```

---

## 快速参考

| 任务 | 文件 |
|------|------|
| 添加页面 | `app/xxx/page.tsx` |
| 添加组件 | `components/xxx.tsx` |
| 写博客 | `content/blog/xxx.md` |
| 添加项目 | `content/projects/items/xxx.md` |
| SEO 配置 | `lib/seo-config.ts` |
| 样式变量 | `app/globals.css` |
| Tailwind | `tailwind.config.ts` |
