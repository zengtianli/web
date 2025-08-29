# 🎨 卡片对齐与样式标准规范

## 📋 核心原则

**所有卡片必须完美对齐，井井有条，审美在线！**

- ✅ **高度统一**: 同行卡片必须高度一致
- ✅ **底部对齐**: 所有卡片底部完美对齐
- ✅ **视觉和谐**: 避免零散布局，保持专业美观
- ✅ **组件复用**: 强制使用现有分子组件，禁止自造轮子

---

## 🎯 强制性技术要求

### 1. ResponsiveGrid 必备配置

**所有网格布局必须设置以下属性:**

```tsx
<ResponsiveGrid 
  strategy="optimal|responsive|compact"
  gap="md|lg" 
  animation="fadeInUp"
  staggerDelay={150-200}
  alignItems="stretch"        // 🔥 强制要求：高度对齐
  minItemHeight="XXXpx"       // 🔥 强制要求：最小高度
>
```

**❌ 绝对禁止:**
```tsx
// 没有 alignItems="stretch"
<ResponsiveGrid strategy="optimal" gap="md">

// 没有 minItemHeight
<ResponsiveGrid alignItems="stretch">
```

### 2. FeatureCard 高度拉伸要求

**FeatureCard现已支持完美高度拉伸，无需额外配置**

```tsx
<FeatureCard
  title="标题"
  description="描述"
  variant="hover"           // 推荐使用hover效果
  layout="vertical|horizontal"
  // 自动支持高度拉伸到容器
/>
```

### 3. ExpandableCard 展开式设计

**用于内容差异较大的场景:**

```tsx
<ExpandableCard
  variant="hover"
  expandText="查看详细信息"
  collapseText="收起详情"
  expandedContent={详细内容}
  className="h-full"        // 确保高度拉伸
>
  {基础概要内容}
</ExpandableCard>
```

---

## 📏 高度标准参考表

| 内容类型 | 推荐最小高度 | 说明 |
|---------|-------------|------|
| **简短奖项/荣誉** | `180px` | 标题+年份+机构 |
| **技能/能力卡片** | `240px-280px` | 标题+描述+图标 |
| **详细成就** | `280px-320px` | 多行描述+元数据 |
| **展开式卡片** | `280px` | 基础状态高度 |
| **项目展示** | `350px` | 图片+标题+描述+标签 |
| **复杂软件著作权** | `320px` | 长标题+详细描述+按钮 |

---

## 🛠️ 具体实施模板

### 模板1: 标准卡片网格 (最常用)

```tsx
import { AnimatedSection, ResponsiveGrid, FeatureCard } from "@/components/molecules"

export default function MyComponent({ data }) {
  return (
    <AnimatedSection title={data.title} spacing="lg">
      <ResponsiveGrid 
        strategy="optimal"
        gap="lg"
        animation="fadeInUp"
        staggerDelay={200}
        alignItems="stretch"     // 🔥 必须
        minItemHeight="280px"    // 🔥 必须 - 根据内容调整
      >
        {data.items.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.title}
            description={item.description}
            variant="hover"
            layout="vertical"
            // 自动支持高度拉伸
          />
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
```

### 模板2: 展开式卡片 (内容差异大)

```tsx
import { AnimatedSection, ResponsiveGrid, ExpandableCard } from "@/components/molecules"

export default function MyExpandableComponent({ data }) {
  return (
    <AnimatedSection title={data.title} spacing="lg">
      <ResponsiveGrid 
        strategy="responsive"
        gap="md"
        animation="fadeInUp"
        staggerDelay={150}
        alignItems="stretch"     // 🔥 必须
        minItemHeight="300px"    // 🔥 必须
      >
        {data.categories.map((category, index) => (
          <ExpandableCard
            key={index}
            variant="hover"
            expandText="查看详情"
            collapseText="收起"
            expandedContent={<详细内容组件 category={category} />}
            className="h-full"    // 🔥 必须
          >
            <概要内容组件 category={category} />
          </ExpandableCard>
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
```

---

## 🚫 严格禁止的行为

### ❌ 禁止模式1: 没有高度对齐
```tsx
// 绝对禁止 - 会导致卡片高度不一致
<ResponsiveGrid strategy="optimal" gap="md">
  <Card>内容1</Card>
  <Card>很长的内容2很长的内容2很长的内容2</Card>  
  <Card>短内容3</Card>
</ResponsiveGrid>
```

### ❌ 禁止模式2: 自造轮子
```tsx
// 绝对禁止 - 不要自己写grid布局
<div className="grid md:grid-cols-3 gap-6">
  <Card>内容</Card>
</div>

// 绝对禁止 - 不要自己写动画
<div className="opacity-0 translate-y-10">
```

### ❌ 禁止模式3: 强制固定高度
```tsx
// 不推荐 - 不要用固定高度，用minItemHeight
<Card className="h-[400px]">
```

---

## 🔧 具体场景应用指南

### 场景1: 研究页面类型
```tsx
// 学术论文、专利、软件著作权
minItemHeight="320px"      // 内容较多
alignItems="stretch"       // 必须
```

### 场景2: 个人技能/能力展示
```tsx  
// 技能、优势、未来展望
minItemHeight="240px"      // 中等内容
alignItems="stretch"       // 必须
```

### 场景3: 简单奖项/荣誉
```tsx
// 奖项、荣誉、认证
minItemHeight="180px"      // 简短内容  
alignItems="stretch"       // 必须
```

### 场景4: 项目展示
```tsx
// 项目卡片、作品展示
minItemHeight="350px"      // 包含图片
alignItems="stretch"       // 必须
```

---

## 🤖 AI开发指令模板

### 开发新组件时必须遵循:

```
1. 读取本文档 CARD_ALIGNMENT_STANDARDS.md
2. 确认内容类型，选择合适的 minItemHeight
3. 必须设置 alignItems="stretch"  
4. 使用 FeatureCard 或 ExpandableCard，禁止自造轮子
5. 测试确认所有卡片底部对齐
6. 如发现不对齐，增加 minItemHeight 直到完美对齐
```

### 修复现有组件时必须遵循:
```
1. 检查是否缺少 alignItems="stretch" 
2. 检查是否缺少 minItemHeight
3. 检查 FeatureCard 是否支持高度拉伸
4. 确保使用分子组件而非原生Card
5. 测试验证对齐效果
```

---

## 📊 质量检查清单

**每次开发完成后必须检查:**

- [ ] ✅ 所有同行卡片高度完全一致
- [ ] ✅ 所有卡片底部完美对齐  
- [ ] ✅ 使用了 `alignItems="stretch"`
- [ ] ✅ 设置了合适的 `minItemHeight`
- [ ] ✅ 使用了分子组件而非原生Card
- [ ] ✅ 没有零散布局，视觉井井有条
- [ ] ✅ hover效果统一一致
- [ ] ✅ 动画流畅自然

---

## 🎯 最终目标

**让用户看到的每一个页面都是:**
- 🎨 **视觉统一**: 所有卡片完美对齐
- 📐 **井井有条**: 没有参差不齐的布局  
- ✨ **专业美观**: 符合现代设计标准
- 🚀 **用户体验**: 丝滑一致的交互

**记住: 审美必须在线，不允许任何零散布局！**

---

*最后更新: 2024年 - 基于体育成就、软件著作权、荣誉奖项等组件的完美对齐实践*
