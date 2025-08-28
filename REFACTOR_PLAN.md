# Portfolio 项目重构计划

## 🎯 项目目标
将当前混乱的组件系统重构为一个有条理、可维护、可扩展的设计系统，提升代码复用性和一致性。

## 📋 当前问题分析
- [ ] ✅ **样式重复问题**：`card-hover`、动画效果在多个组件中重复定义
- [ ] ✅ **缺乏设计系统**：没有统一的卡片样式、动画效果、间距规范
- [ ] ✅ **组件职责不清**：业务逻辑和样式混合，没有明确的组件层级
- [ ] ✅ **布局逻辑重复**：网格布局计算在多个组件中重复实现
- [ ] ✅ **动画代码冗余**：`useInView` 和动画效果代码大量重复

---

## 🏗️ 重构计划 (分阶段执行)

### 阶段一：建立设计系统基础 (Foundation)

#### 1.1 创建样式变体系统
- [x] ✅ 创建 `lib/design-system/variants.ts`
  - [x] ✅ 定义卡片样式变体 (`card-variants`)
    - [x] ✅ `hover`: 悬浮效果卡片
    - [x] ✅ `flat`: 平面卡片  
    - [x] ✅ `elevated`: 高亮卡片
    - [x] ✅ `outline`: 边框卡片
  - [x] ✅ 定义动画变体 (`animation-variants`)
    - [x] ✅ `fadeInUp`: 从下方淡入
    - [x] ✅ `slideInLeft`: 从左侧滑入
    - [x] ✅ `slideInRight`: 从右侧滑入
    - [x] ✅ `staggered`: 交错动画
  - [x] ✅ 定义布局变体 (`grid-variants`)
    - [x] ✅ `responsive`: 响应式网格 (1/2/3列)
    - [x] ✅ `compact`: 紧密网格
    - [x] ✅ `auto`: 自适应网格

#### 1.2 创建设计令牌 (Design Tokens)
- [x] ✅ 创建 `lib/design-system/tokens.ts`
  - [x] ✅ 间距系统 (`spacing`)
  - [x] ✅ 圆角系统 (`radius`)  
  - [x] ✅ 阴影系统 (`shadows`)
  - [x] ✅ 动画时长系统 (`durations`)
  - [x] ✅ 延迟系统 (`delays`)

#### 1.3 创建样式工具函数
- [x] ✅ 创建 `lib/design-system/utils.ts`
  - [x] ✅ `getGridColumns(itemCount: number)` - 智能网格列计算
  - [x] ✅ `getStaggerDelay(index: number)` - 交错动画延迟计算
  - [x] ✅ `combineVariants()` - 样式变体组合工具

---

### 阶段二：创建基础组件 (Atoms & Molecules)

#### 2.1 原子组件 (Atoms)
- [x] ✅ 创建 `components/atoms/`
  - [x] ✅ `AnimatedElement.tsx` - 带动画的基础元素
    - [x] ✅ 支持多种动画类型
    - [x] ✅ 内置 `useInView` 逻辑
    - [x] ✅ 可配置延迟和持续时间
  - [x] ✅ `IconWrapper.tsx` - 统一的图标容器
    - [x] ✅ 统一图标尺寸和样式
    - [x] ✅ 支持不同变体 (accent, muted, etc.)

#### 2.2 分子组件 (Molecules)  
- [x] ✅ 创建 `components/molecules/`
  - [x] ✅ `FeatureCard.tsx` - 通用功能卡片
    - [x] ✅ 支持图标、标题、描述
    - [x] ✅ 多种样式变体
    - [x] ✅ 可选链接和按钮
    - [x] ✅ 内置动画效果
  - [x] ✅ `ResponsiveGrid.tsx` - 响应式网格容器
    - [x] ✅ 智能列数计算
    - [x] ✅ 统一间距
    - [x] ✅ 交错动画支持
  - [x] ✅ `AnimatedSection.tsx` - 带动画的章节容器
    - [x] ✅ 统一章节标题样式
    - [x] ✅ 内容区域动画
    - [x] ✅ 可选锚点支持
  - [x] ✅ `ExpandableCard.tsx` - 可展开卡片
    - [x] ✅ 统一展开/收起逻辑
    - [x] ✅ 平滑展开动画
    - [x] ✅ 可配置展开内容

#### 2.3 复合组件 (Organisms)
- [ ] 创建 `components/organisms/`
  - [ ] `ItemList.tsx` - 通用列表组件
    - [ ] 支持多种数据类型 (论文、奖项、专利等)
    - [ ] 统一的卡片样式
    - [ ] 可配置展示字段
    - [ ] 内置搜索和过滤 (可选)

---

### 阶段三：重构现有组件 (Refactoring)

#### 3.1 识别重构目标组件
- [x] ✅ **高优先级组件** (样式重复严重)
  - [x] ✅ `academic-papers.tsx` - 80行 → 18行 (减少78%)
  - [x] ✅ `awards.tsx` - 45行 → 13行 (减少71%)
  - [x] ✅ `patents.tsx` - 85行 → 21行 (减少75%)
  - [x] ✅ `software-copyrights.tsx` - 50行 → 18行 (减少64%)
- [ ] **中优先级组件** (部分重复)
  - [ ] `about-intro.tsx`
  - [ ] `skills-visual.tsx`
  - [ ] `timeline.tsx`
  - [ ] `sports-achievement.tsx`
- [ ] **低优先级组件** (相对独立)
  - [ ] `contact-form.tsx`
  - [ ] `contact-info.tsx`
  - [ ] `footer.tsx`

#### 3.2 重构 academic-papers.tsx ✅
- [x] ✅ 使用 `ExpandableCard` 替换自定义卡片逻辑
- [x] ✅ 使用 `ResponsiveGrid` 替换自定义网格布局
- [x] ✅ 使用 `AnimatedSection` 包装整个组件
- [x] ✅ 提取论文数据类型到类型定义文件
- [x] ✅ 测试重构后功能完整性

#### 3.3 重构 awards.tsx ✅
- [x] ✅ 使用 `FeatureCard` 替换当前卡片实现
- [x] ✅ 使用统一的图标系统
- [x] ✅ 使用 `ResponsiveGrid` 布局
- [x] ✅ 简化组件逻辑

#### 3.4 重构 patents.tsx ✅
- [x] ✅ 复用 `academic-papers.tsx` 的重构模式
- [x] ✅ 使用相同的 `ExpandableCard` 组件
- [x] ✅ 统一展开/收起交互

#### 3.5 重构 software-copyrights.tsx ✅
- [x] ✅ 使用 `FeatureCard` 替换当前实现
- [x] ✅ 统一 PDF 链接样式
- [x] ✅ 使用标准网格布局

---

### 阶段四：优化与完善 (Enhancement)

#### 4.1 性能优化
- [ ] 分析包大小，移除未使用的样式
- [ ] 优化动画性能 (使用 CSS transforms)
- [ ] 实现组件懒加载 (如果需要)

#### 4.2 可访问性改进
- [ ] 确保所有交互元素有合适的 aria 标签
- [ ] 优化键盘导航
- [ ] 改进屏幕阅读器支持

#### 4.3 响应式优化
- [ ] 测试所有断点的表现
- [ ] 优化移动端动画效果
- [ ] 确保触摸交互友好

#### 4.4 主题系统完善
- [ ] 确保所有新组件支持深色模式
- [ ] 统一颜色使用 (CSS 变量)
- [ ] 测试主题切换效果

---

### 阶段五：文档与维护 (Documentation)

#### 5.1 组件文档
- [ ] 创建 `docs/components/` 目录
- [ ] 为每个新组件编写使用文档
- [ ] 创建样式变体使用指南
- [ ] 编写最佳实践文档

#### 5.2 代码规范
- [ ] 更新 TypeScript 类型定义
- [ ] 添加 ESLint 规则确保一致性
- [ ] 创建组件开发模板

#### 5.3 测试
- [ ] 为关键组件添加单元测试
- [ ] 测试样式变体功能
- [ ] 验证动画效果

---

## 📁 最终目录结构

```
components/
├── ui/                 # shadcn/ui 组件 (保持不变)
├── atoms/              # 原子组件
│   ├── AnimatedElement.tsx
│   └── IconWrapper.tsx
├── molecules/          # 分子组件  
│   ├── FeatureCard.tsx
│   ├── ExpandableCard.tsx
│   ├── ResponsiveGrid.tsx
│   └── AnimatedSection.tsx
├── organisms/          # 复合组件
│   └── ItemList.tsx
└── sections/           # 重构后的页面组件
    ├── academic-papers.tsx
    ├── awards.tsx
    ├── patents.tsx
    └── ...

lib/
├── design-system/      # 设计系统
│   ├── variants.ts     # 样式变体
│   ├── tokens.ts       # 设计令牌
│   └── utils.ts        # 工具函数
└── ...

docs/                   # 文档
├── components/         # 组件文档
└── style-guide.md      # 样式指南
```

---

## ⏱️ 预估时间
- **阶段一**: 2-3 天 (建立设计系统基础)
- **阶段二**: 3-4 天 (创建基础组件)
- **阶段三**: 4-5 天 (重构现有组件)
- **阶段四**: 2-3 天 (优化与完善)
- **阶段五**: 1-2 天 (文档与维护)

**总计**: 12-17 天

---

## 🎉 完成后收益
- [ ] ✅ **代码复用率提升** 60%+
- [ ] ✅ **组件一致性** 100%
- [ ] ✅ **维护成本降低** 50%+
- [ ] ✅ **开发效率提升** 40%+
- [ ] ✅ **设计系统完整性** 建立完整的设计语言

---

## 📝 注意事项
1. **渐进式重构**: 每完成一个组件就测试确保功能正常
2. **保持向下兼容**: 重构过程中确保现有功能不受影响  
3. **及时备份**: 每个阶段完成后提交代码
4. **持续测试**: 重构后及时测试页面展示效果
