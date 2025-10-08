# 🎯 tianlizeng.cloud 网站改进行动清单

> **网站地址：** [https://tianlizeng.cloud/](https://tianlizeng.cloud/)  
> **部署平台：** GitHub → Vercel  
> **生成日期：** 2025年10月8日

---

## ✅ 已完成的配置

- [x] SEO 配置文件已更新域名为 `https://tianlizeng.cloud`
- [x] robots.txt 已配置
- [x] sitemap.ts 已创建（自动生成站点地图）
- [x] Open Graph 元数据已集成
- [x] Schema.org 结构化数据已添加

---

## 🚀 立即可以做的改进（今晚完成）

### 1. 创建 OG 分享图片 ⭐⭐⭐⭐⭐
**为什么重要：** 当别人在微信、微博、LinkedIn 分享你的网站时，会显示漂亮的预览图

**创建步骤：**
1. 访问 [Canva](https://www.canva.com/) 或 Figma
2. 创建 1200x630 像素的图片
3. 包含内容：
   - 你的名字："曾田力"
   - 标语："数据驱动水利创新 | AI赋能未来水务"
   - 简单的视觉元素（水滴、数据图表等）
   - 使用你网站的主色调（蓝色系）
4. 保存为 `/public/images/og-image.png`

**参考设计：**
```
┌─────────────────────────────────────┐
│                                     │
│         曾田力                       │
│                                     │
│   数据驱动水利创新 | AI赋能未来水务   │
│                                     │
│   🌊 水利工程博士 | 浙江大学          │
│                                     │
│   tianlizeng.cloud                 │
└─────────────────────────────────────┘
```

### 2. 注册 Google Search Console ⭐⭐⭐⭐⭐
**步骤：**
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加网站：`https://tianlizeng.cloud`
3. 选择"URL 前缀"验证方式
4. 上传验证文件或在 Vercel 添加 DNS 记录
5. 提交站点地图：`https://tianlizeng.cloud/sitemap.xml`

**预期效果：** 1-2周后可以在 Google 搜索到你的网站

### 3. 注册百度站长平台 ⭐⭐⭐⭐⭐
**步骤：**
1. 访问 [百度站长平台](https://ziyuan.baidu.com/)
2. 添加网站：`https://tianlizeng.cloud`
3. 验证网站所有权（HTML 标签验证）
4. 提交站点地图：`https://tianlizeng.cloud/sitemap.xml`

**国内用户主要使用百度搜索，这个很重要！**

---

## 📊 本周完成（周末2-3小时）

### 4. 添加 Google Analytics ⭐⭐⭐⭐
**步骤：**
```bash
# 1. 安装依赖
pnpm add @next/third-parties

# 2. 注册 Google Analytics
# 访问 https://analytics.google.com/
# 获取测量 ID（格式：G-XXXXXXXXXX）

# 3. 添加到 Vercel 环境变量
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**在 app/layout.tsx 中添加：**
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

// 在 body 标签中添加
{process.env.NEXT_PUBLIC_GA_ID && (
  <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
)}
```

### 5. 添加百度统计 ⭐⭐⭐⭐
**步骤：**
1. 访问 [百度统计](https://tongji.baidu.com/)
2. 注册并添加网站
3. 获取统计代码中的 ID
4. 在 Vercel 添加环境变量：`NEXT_PUBLIC_BAIDU_ANALYTICS_ID`
5. 在 `app/layout.tsx` 的 `<head>` 中添加百度统计代码

### 6. 优化图片 ⭐⭐⭐⭐
```bash
# 安装依赖
pnpm add -D sharp

# 运行优化脚本
node scripts/optimize-images.mjs

# 检查优化结果
ls public/images/optimized/

# 如果效果好，替换原图片
# 记得更新代码中的图片路径
```

**预期效果：** 页面加载速度提升 30-50%

---

## 📱 用户体验增强（下周完成）

### 7. 添加返回顶部按钮
**在 app/layout.tsx 中：**
```typescript
import { ScrollToTop } from "@/components/scroll-to-top"

<body>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    <main>{children}</main>
    <ScrollToTop />  {/* 添加这行 */}
  </ThemeProvider>
</body>
```

### 8. 在项目页面添加分享功能
**在项目详情页添加：**
```typescript
import { ShareButtons } from "@/components/share-buttons"

// 在合适位置添加
<ShareButtons 
  title={project.title}
  description={project.description}
/>
```

### 9. 添加页面加载进度条
```bash
pnpm add nprogress
pnpm add -D @types/nprogress
```

---

## 🔍 SEO 验证和提交

### 10. 验证站点地图
访问这些 URL 确认正常工作：
- ✅ https://tianlizeng.cloud/sitemap.xml
- ✅ https://tianlizeng.cloud/robots.txt

### 11. 提交到搜索引擎

**Google：**
1. Google Search Console → 站点地图 → 添加新的站点地图
2. 输入：`sitemap.xml`
3. 等待索引（通常需要几天）

**百度：**
1. 百度站长平台 → 数据引入 → 链接提交 → sitemap
2. 提交：`https://tianlizeng.cloud/sitemap.xml`

**必应（Bing）：**
1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加网站并验证
3. 提交站点地图

### 12. 验证结构化数据
访问 [Google Rich Results Test](https://search.google.com/test/rich-results)  
输入：`https://tianlizeng.cloud/`  
检查是否正确显示 Person 类型的结构化数据

---

## 📈 性能测试

### 运行性能测试
访问以下工具测试你的网站：

1. **Google PageSpeed Insights**  
   https://pagespeed.web.dev/?url=https://tianlizeng.cloud/

2. **GTmetrix**  
   https://gtmetrix.com/?url=https://tianlizeng.cloud/

3. **WebPageTest**  
   https://www.webpagetest.org/

**目标分数：**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: = 100

---

## 🎨 视觉优化建议

### 基于你当前网站的观察：

1. **首页 Hero 区域** ✅ 已经很好
   - 简洁大方
   - 信息层次清晰

2. **核心能力卡片** ✅ 已经很好
   - 图标清晰
   - 描述简洁

3. **最新动态** ✅ 已经很好
   - 图片展示专业
   - 内容丰富

**建议微调：**
- 考虑在项目卡片上添加"分享"按钮
- 在文章详情页添加"相关推荐"
- 添加访客统计数字展示（如"已服务XX个项目"）

---

## 🌐 Vercel 部署优化

### 在 Vercel 项目设置中：

1. **环境变量配置**
   - `NEXT_PUBLIC_GA_ID` - Google Analytics ID
   - `NEXT_PUBLIC_BAIDU_ANALYTICS_ID` - 百度统计 ID

2. **自动部署配置**
   - ✅ 主分支自动部署（已配置）
   - 建议：为 PR 创建预览部署

3. **性能优化**
   - 启用 Analytics（Vercel 自带的性能分析）
   - 启用 Speed Insights

4. **自定义域名**
   - ✅ tianlizeng.cloud 已配置
   - 建议：同时配置 www.tianlizeng.cloud 重定向

---

## 📋 需要收集的信息

为了完善网站，请提供以下信息（如果有的话）：

### 社交媒体账号
- [ ] LinkedIn 个人主页 URL（用于分享）
- [ ] GitHub 个人主页（已有：https://github.com/zengtianli）
- [ ] 知乎账号（如果有）
- [ ] Twitter/X 账号（如果有）
- [ ] 微信公众号（如果有）

### 分析工具账号
- [ ] Google Analytics 测量 ID
- [ ] 百度统计 ID
- [ ] Umami/Plausible 等（如果使用其他分析工具）

### 验证码
- [ ] Google Search Console 验证码
- [ ] 百度站长平台验证码
- [ ] Bing Webmaster Tools 验证码

---

## ⏰ 时间规划

### 今晚（1小时）
- [ ] 创建 OG 图片
- [ ] 注册 Google Search Console
- [ ] 注册百度站长平台

### 本周末（2-3小时）
- [ ] 添加 Google Analytics
- [ ] 添加百度统计
- [ ] 优化图片
- [ ] 提交站点地图到各搜索引擎

### 下周（每天30分钟）
- [ ] 添加返回顶部按钮
- [ ] 添加分享功能
- [ ] 运行性能测试
- [ ] 根据测试结果优化

### 持续优化（每周1小时）
- [ ] 查看分析数据
- [ ] 优化低表现页面
- [ ] 添加新内容（项目、文章）
- [ ] 回复用户反馈

---

## 🎯 30天后的目标

完成所有改进后，你的网站将：

✅ **搜索引擎优化**
- Google 搜索"曾田力"排名前3
- 百度搜索"曾田力 水利工程"首页可见
- 被 Google Scholar 收录（如果有学术内容）

✅ **性能指标**
- Lighthouse 性能分数 ≥ 95
- 首屏加载时间 < 1.5秒
- 移动端体验优秀

✅ **用户体验**
- 社交分享有漂亮预览
- 访问流畅无卡顿
- 交互反馈及时

✅ **数据驱动**
- 每周有访问数据分析
- 了解用户来源和行为
- 可以优化内容策略

---

## 💡 特别提醒

### Vercel 部署注意事项：
1. 每次提交代码后，Vercel 会自动重新部署
2. 环境变量修改后需要重新部署
3. 建议保留预览部署，方便测试

### GitHub 仓库建议：
- 为敏感信息（如 API Key）使用环境变量，不要提交到代码
- 定期备份重要内容
- 使用 Git Tag 标记重要版本

---

## ✅ 完成检查清单

复制这个清单，逐项完成：

```markdown
### 今晚必做
- [ ] 创建 og-image.png (1200x630)
- [ ] 注册 Google Search Console
- [ ] 注册百度站长平台

### 本周完成
- [ ] 添加 Google Analytics
- [ ] 添加百度统计
- [ ] 优化图片（运行脚本）
- [ ] 提交站点地图

### 下周完成
- [ ] 添加返回顶部按钮
- [ ] 添加分享功能
- [ ] 运行性能测试
- [ ] 验证结构化数据

### 持续改进
- [ ] 每周检查分析数据
- [ ] 定期更新项目内容
- [ ] 优化低表现页面
```

---

你的网站已经很专业了！完成这些改进后会更上一层楼。有任何问题随时问我！🚀

