# 分子组件使用规范 (Component Usage Guidelines)

## 🎯 核心原则

**禁止重复造轮子！必须使用现有的分子级组件来构建页面和功能。**

在编写新的组件或重构现有组件时，**强制要求**：
1. 优先使用 `@/components/molecules` 中的现有组件
2. 不允许重复实现已有的布局和样式模式
3. 保持设计系统的一致性和可维护性

---

## 📚 可用的分子组件库

### 1. AnimatedSection - 章节容器
**用途**: 统一的页面章节布局和动画
**替代**: 自定义的 section + h2/h3 + 动画实现

```tsx
// ❌ 不要这样 - 自己造轮子
<section className="py-16">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold">标题</h2>
    <p className="text-muted-foreground">描述</p>
  </div>
  <div className="content">...</div>
</section>

// ✅ 应该这样 - 使用现有组件
import { AnimatedSection } from "@/components/molecules"

<AnimatedSection 
  title="标题" 
  description="描述"
  titleAlign="center"
>
  <div className="content">...</div>
</AnimatedSection>
```

**预定义变体**:
- `PageSection` - 标准页面章节 (h2)
- `HeroSection` - 主标题章节 (h1, 居中)
- `SubSection` - 子章节 (h3, 紧凑)
- `IntroSection` - 介绍章节 (带描述)

### 2. FeatureCard - 功能卡片
**用途**: 统一的卡片布局和交互
**替代**: 自定义的 Card + CardHeader + CardContent 组合

```tsx
// ❌ 不要这样 - 重复实现卡片布局
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <div className="flex items-center space-x-3">
      <Trophy className="h-5 w-5" />
      <CardTitle>奖项标题</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <p>描述内容</p>
  </CardContent>
</Card>

// ✅ 应该这样 - 使用现有组件
import { FeatureCard } from "@/components/molecules"

<FeatureCard
  icon={<Trophy />}
  title="奖项标题"
  description="描述内容"
  variant="hover"
/>
```

**预定义变体**:
- `AwardCard` - 奖项卡片
- `SoftwareCard` - 软件著作权卡片  
- `ProjectCard` - 项目卡片

### 3. ExpandableCard - 可展开卡片
**用途**: 统一的展开/收起逻辑
**替代**: 自定义的展开状态管理和动画

```tsx
// ❌ 不要这样 - 自己实现展开逻辑
const [isExpanded, setIsExpanded] = useState(false)

<Card>
  <CardContent>
    <h3>论文标题</h3>
    {isExpanded && (
      <div className="mt-3 border-t pt-3">
        <p>详细摘要...</p>
      </div>
    )}
    <Button onClick={() => setIsExpanded(!isExpanded)}>
      {isExpanded ? '收起' : '展开'}
    </Button>
  </CardContent>
</Card>

// ✅ 应该这样 - 使用现有组件
import { ExpandableCard } from "@/components/molecules"

<ExpandableCard
  expandText="展开摘要"
  collapseText="收起摘要"
  expandedContent={<p>详细摘要...</p>}
>
  <h3>论文标题</h3>
</ExpandableCard>
```

**预定义变体**:
- `PaperCard` - 学术论文卡片
- `PatentCard` - 专利卡片
- `DetailCard` - 通用详情卡片

### 4. ResponsiveGrid - 响应式网格
**用途**: 统一的网格布局和响应式策略
**替代**: 自定义的 grid 布局实现

```tsx
// ❌ 不要这样 - 手动管理响应式网格
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item, index) => (
    <div key={index} className="opacity-0 animate-fadeInUp">
      <ItemCard {...item} />
    </div>
  ))}
</div>

// ✅ 应该这样 - 使用现有组件
import { ResponsiveGrid } from "@/components/molecules"

<ResponsiveGrid strategy="optimal" gap="md" animation="fadeInUp">
  {items.map((item, index) => (
    <ItemCard key={index} {...item} />
  ))}
</ResponsiveGrid>
```

---

## 🚫 禁止的行为模式

### 1. 重复的章节标题模式
```tsx
// ❌ 禁止 - 重复实现章节标题
<div className="text-center mb-12">
  <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
    体育成就
  </h2>
  <p className="text-lg text-muted-foreground">...</p>
</div>
```

### 2. 重复的卡片hover效果
```tsx
// ❌ 禁止 - 重复实现hover效果
<Card className="hover:shadow-[0_10px_20px_rgba(251,146,60,0.15)] transition-all duration-300">
```

### 3. 重复的展开/收起逻辑
```tsx
// ❌ 禁止 - 重复实现状态管理
const [expanded, setExpanded] = useState(false)
const handleToggle = () => setExpanded(!expanded)
```

### 4. 重复的图标容器样式
```tsx
// ❌ 禁止 - 重复实现图标包装器
<div className="p-2 rounded-full bg-orange-500/10 w-fit mx-auto mb-2">
  <Icon className="h-5 w-5 text-orange-500" />
</div>
```

---

## ✅ 正确的重构方式

### 示例: sports-achievement.tsx 的重构

**当前问题**: 该组件自己造轮子，没有使用现有的分子组件

**正确的重构方式**:
```tsx
import { 
  AnimatedSection, 
  FeatureCard, 
  ResponsiveGrid 
} from "@/components/molecules"

export default function SportsAchievement({ content }) {
  return (
    <AnimatedSection
      title={content.title}
      subtitle={content.subtitle}
      titleAlign="center"
      anchor="sports-achievement"
    >
      {/* 官方荣誉 - 使用 FeatureCard */}
      <FeatureCard
        icon={<Star />}
        title={content.officialHonor.title}
        subtitle={`${content.officialHonor.organization} · ${content.officialHonor.year}`}
        description={content.officialHonor.description}
        variant="gradient"
        layout="vertical"
        className="max-w-2xl mx-auto mb-8"
      />

      {/* 成就分类 - 使用 ResponsiveGrid */}
      <ResponsiveGrid strategy="responsive" gap="md">
        {content.categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
```

---

## 🎨 设计系统集成

### 使用设计系统的变体
所有分子组件都集成了设计系统，支持以下变体：

```tsx
// Card 变体
variant="hover" | "elevated" | "flat" | "gradient" | "outline"

// 间距变体  
padding="sm" | "md" | "lg"
spacing="sm" | "md" | "lg" | "xl"

// 阴影变体
shadow="none" | "sm" | "md" | "lg"
```

### 颜色主题一致性
```tsx
// ✅ 使用设计系统颜色
className="text-accent border-accent/30 bg-accent/10"

// ❌ 不要硬编码颜色
className="text-orange-500 border-orange-500/30 bg-orange-500/10"
```

---

## 📝 开发流程

### 在编写新组件时的检查清单:

1. **分析需求**: 这个组件是否可以用现有的分子组件实现？
2. **选择组件**: 从 molecules 库中选择最合适的组件
3. **配置变体**: 使用预定义的变体或通过 props 自定义
4. **集成测试**: 确保样式和行为与设计系统一致
5. **文档更新**: 如果创建了新的使用模式，更新此文档

### AI 开发指令模板:

```
请重构 [组件名称]，要求：
1. 使用 @/components/molecules 中的现有组件
2. 不要重复实现现有的布局和样式模式
3. 保持与设计系统的一致性
4. 参考 COMPONENT_USAGE_GUIDELINES.md 中的规范

具体要求：
- 使用 AnimatedSection 替代自定义的章节布局
- 使用 FeatureCard 替代重复的卡片实现
- 使用 ExpandableCard 处理展开/收起逻辑
- 使用 ResponsiveGrid 处理网格布局
```

---

## 🔄 持续改进

这个规范文档会随着分子组件库的发展而更新。如果发现新的重复模式，应该：

1. 提取为新的分子组件
2. 更新此规范文档
3. 重构现有的违规组件

**记住: 一致性比个性化更重要！**
