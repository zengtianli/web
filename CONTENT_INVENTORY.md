# 📋 网站内容清单

> 按照分层策略对所有组件内容进行分类管理

## 🏗️ **分层策略说明**

- **🔄 动态内容** - 经常更新，需要外部管理
- **👤 个人信息** - 相对稳定但需要统一管理  
- **🎨 静态布局** - 结构固定，可以硬编码
- **⚙️ 功能组件** - 以功能为主，文案可配置

---

## 🔄 **动态内容类 (需要外部管理)**

### 📚 **学术论文** (`academic-papers.tsx`)
```typescript
interface Paper {
  title: string
  journal: string
  year: string
  authors: string
  abstract: string
  link: string
}

// 当前数据
const papers = [
  {
    title: "浙东引水工程受水区降雨趋势与多尺度变异性",
    journal: "水电能源科学",
    year: "2025",
    authors: "曾田力, 左晓霞, 杨彧, 戴欢, 吴木红, 钟吕斌, 陈舒阳",
    abstract: "为揭示浙东引水工程受水区的降雨变化规律...",
    link: ""
  },
  {
    title: "基于主要驱动因子筛选法和深度学习算法的浙江省动态需水量预测",
    journal: "水科学进展", 
    year: "2024",
    authors: "许月萍, 曾田力, 周欣磊, 章鲁琪, 王贝, 王冬",
    abstract: "收集了浙江省2000—2020年各用水行业需水量数据...",
    link: "https://kns.cnki.net/kcms2/article/abstract?v=..."
  }
  // ... 更多论文
]
```

### 🏆 **荣誉奖项** (`awards.tsx`)
```typescript
interface Award {
  title: string
  year: string
  organization: string
  note?: string
}

// 当前数据
const awards = [
  {
    title: "国家留学基金委公派留学奖学金",
    year: "2016", 
    organization: "国家留学基金管理委员会"
  },
  {
    title: "三好研究生",
    year: "2013-2016",
    organization: "浙江大学",
    note: "多次获得"
  }
  // ... 更多奖项
]
```

### 💡 **专利发明** (`patents.tsx`)
```typescript
interface Patent {
  title: string
  inventors: string
  description: string
  year: string
}

// 当前数据
const patents = [
  {
    title: "一种可调节深度的取水曝气装置",
    inventors: "史毅超，曾田力，张瑶兰，陈跃青",
    description: "本实用新型公开了一种可调节深度的取水曝气装置...",
    year: "2022"
  }
  // ... 更多专利
]
```

### 💻 **软件著作权** (`software-copyrights.tsx`)
```typescript
interface SoftwareCopyright {
  title: string
  description: string
  icon: string
  pdfLink: string
}

// 当前数据
const softwareCopyrights = [
  {
    title: "浙水设计水资源优化调度模型软件",
    description: "基于多目标优化算法的水资源调度系统，支持实时决策与方案评估",
    icon: "Database",
    pdfLink: "/soft_copyright/浙水设计-水资源优化调度模型软件.pdf"
  }
  // ... 更多软件著作权
]
```

### 📰 **最新动态** (`latest-updates.tsx`)
```typescript
interface Update {
  title: string
  description: string
  image: string
  link: string
}

// 当前数据
const updates = [
  {
    title: "数字孪生浙东引水项目",
    description: "利用机器学习和多源数据融合技术，构建数字孪生模型",
    image: "/images/compressed-images/数字孪生浙东区域水网.png",
    link: "/projects/digital-twin-water-diversion"
  }
  // ... 更多动态
]
```

### 🛠️ **开发工具** (`tool-card.tsx`)
```typescript
interface Tool {
  id: string
  name: string
  description: string
  techs: string[]
  github: string
  gitee: string
  contentFile: string
}
```

---

## 👤 **个人信息类 (需要统一管理)**

### 📖 **关于我简介** (`about-intro.tsx`)
```typescript
interface AboutIntroContent {
  title: string
  subtitle: string
  description: string
  slogan: string
  profileImage: string
  anchor?: string
}

// 当前数据
const aboutIntro = {
  title: "关于我",
  subtitle: "曾田力",
  description: "融合**水利工程**专业智慧与**前沿信息技术**...",
  slogan: "数据驱动水利创新 | AI赋能未来水务",
  profileImage: "/images/zengtianli.jpg"
}
```

### 🎯 **技能图谱** (`skills-visual.tsx`)
```typescript
interface SkillCategory {
  name: string
  skills: Array<{
    name: string
    level: number
  }>
}

// 当前数据
const skillCategories = [
  {
    name: "领域专长",
    skills: [
      { name: "水资源管理与规划", level: 95 },
      { name: "水文预测与模拟", level: 90 }
      // ...
    ]
  }
  // ... 更多技能分类
]
```

### 🚀 **未来展望** (`future-outlook.tsx`)
```typescript
interface FutureContent {
  title: string
  description: string
  visionPoints: Array<{
    title: string
    description: string
    icon: string
  }>
}

// 当前数据
const futureOutlook = {
  title: "未来展望",
  description: "我对未来水利行业发展的思考与个人职业规划",
  visionPoints: [
    {
      title: "数字孪生水利",
      description: "深入推进数字孪生技术在水利工程全生命周期的应用",
      icon: "Sparkles"
    }
    // ...
  ]
}
```

### 📅 **个人时间线** (`timeline.tsx`)
```typescript
interface TimelineItem {
  period: string
  title: string
  description: string
  icon: string
  skills: string[]
  honors: string[]
}

// 需要从 content/about/timeline.md 读取
```

### 🏃‍♂️ **体育成就** (`sports-achievement.tsx`)
```typescript
interface SportsAchievementContent {
  title: string
  subtitle: string
  totalChampionships: number
  officialHonor: {
    title: string
    year: string
    organization: string
    description: string
  }
  categories: Array<{
    category: string
    icon: string
    isCompact?: boolean
    sports?: string[]
    description?: string
    achievements?: Array<{
      title: string
      year: string
      level: string
      description: string
      highlight?: boolean
    }>
  }>
}

// 需要从 content/about/sports.md 读取
```

### 💪 **核心能力** (`strengths-section.tsx`)
```typescript
interface Strength {
  icon: any
  title: string
  description: string
}

// 当前数据
const strengths = [
  {
    icon: Brain,
    title: "智能水资源建模",
    description: "结合LSTM、数字孪生等先进技术，构建智能水资源模型"
  }
  // ... 更多能力
]
```

### 🛠️ **工具概览** (`tools-overview.tsx`)
```typescript
interface ToolsOverviewContent {
  title: string
  description: string
  totalTools: number
  features: Array<{
    icon: string
    title: string
    description: string
  }>
  techStack: string[]
}

// 当前数据
const toolsOverview = {
  title: "开发工具集合",
  description: "精心打磨的开源工具集，涵盖 macOS 自动化、编辑器配置等",
  features: [
    {
      icon: "Code2",
      title: "实用性强", 
      description: "解决实际开发中的痛点问题"
    }
    // ...
  ],
  techStack: ["Shell", "Python", "Lua", "TypeScript", "AppleScript"]
}
```

### 📞 **联系信息** (`contact-info.tsx`)
```typescript
interface ContactInfo {
  title: string
  description: string
  contacts: Array<{
    icon: string
    title: string
    content: string | JSX.Element
    delay: number
  }>
}

// 当前数据
const contactInfo = {
  title: "联系方式",
  description: "我对水利科技的未来充满期待，欢迎随时与我联系",
  contacts: [
    {
      icon: "Mail",
      title: "电子邮箱",
      content: "zengtianli1@126.com",
      delay: 100
    }
    // ... 更多联系方式
  ]
}
```

---

## 🎨 **静态布局类 (可以硬编码)**

### 🏠 **首页Hero区** (`hero-section.tsx`)
```typescript
// 相对固定的内容，可以硬编码
const heroContent = {
  name: "曾田力",
  tagline: "数据驱动水利创新 | AI赋能未来水务",
  description: "融合水利工程专业智慧与前沿信息技术，致力于通过数据分析、智能模型及软件系统研发，解决复杂水资源挑战，驱动行业变革。",
  buttons: [
    { text: "深入了解", href: "/about" },
    { text: "查看项目", href: "/projects", variant: "outline" }
  ]
}
```

### 🧭 **导航栏** (`navbar.tsx`)
```typescript
// 网站结构相对固定
const navItems = [
  { name: "首页", path: "/" },
  { name: "关于我", path: "/about" },
  { name: "项目案例", path: "/projects" },
  { name: "学术与成果", path: "/research" },
  { name: "开发工具", path: "/tools" },
  { name: "简历中心", path: "/resume" },
  { name: "联系方式", path: "/contact" }
]
```

### 📄 **页脚** (`footer.tsx`)
```typescript
// 版权信息等相对固定
const footerContent = {
  copyright: "© 2025 曾田力. All Rights Reserved.",
  links: [
    {
      text: "下载完整简历 (PDF)",
      href: "/zengtianli-cv.pdf",
      icon: "FileDown"
    },
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/tianli-zeng-4068a7190/",
      icon: "Linkedin"
    },
    {
      text: "GitHub", 
      href: "https://github.com/zengtianli",
      icon: "Github"
    }
  ]
}
```

---

## ⚙️ **功能组件类 (功能为主，文案可配置)**

### 📝 **联系表单** (`contact-form.tsx`)
```typescript
interface ContactFormContent {
  title: string
  fields: Array<{
    id: string
    label: string
    placeholder: string
    required: boolean
    type: string
  }>
  submitButton: {
    text: string
    loadingText: string
  }
  messages: {
    success: {
      title: string
      description: string
    }
  }
}

// 当前文案
const contactFormContent = {
  title: "发送消息",
  fields: [
    { id: "name", label: "姓名", placeholder: "请输入您的姓名", required: true, type: "text" },
    { id: "email", label: "邮箱", placeholder: "请输入您的邮箱", required: true, type: "email" },
    { id: "subject", label: "主题", placeholder: "请输入消息主题", required: false, type: "text" },
    { id: "message", label: "内容", placeholder: "请输入您的消息内容", required: true, type: "textarea" }
  ],
  submitButton: { text: "发送消息", loadingText: "发送中..." },
  messages: {
    success: {
      title: "消息已发送",
      description: "感谢您的留言，我会尽快回复。"
    }
  }
}
```

### 🔍 **搜索功能** (`search-dialog.tsx`)
```typescript
interface SearchContent {
  placeholder: string
  searchButtonText: string
  shortcutHint: string
  loadingText: string
  noResultsText: string
  startSearchText: string
  resultsHeading: string
}

// 当前文案
const searchContent = {
  placeholder: "输入关键词搜索页面、项目等...",
  searchButtonText: "搜索全站...",
  shortcutHint: "⌘K",
  loadingText: "加载中...",
  noResultsText: "未找到与 \"{query}\" 相关的内容。",
  startSearchText: "请输入关键词开始搜索。",
  resultsHeading: "搜索结果"
}
```

### 📥 **PDF下载** (`download-pdf-button.tsx`)
```typescript
interface DownloadButtonContent {
  text: string
  filename: string
}

// 当前配置
const downloadContent = {
  text: "下载PDF",
  filename: "zengtianli-cv"
}
```

---

## 📋 **实施计划**

### **第一阶段：内容提取**
1. ✅ 梳理现有内容（当前文档）
2. 🔄 创建统一的内容接口定义
3. 🔄 从硬编码组件中提取内容到配置文件

### **第二阶段：组件重构**
1. **动态内容** → 移至 `content/` 目录管理
2. **个人信息** → 创建 `lib/profile-config.ts` 
3. **静态布局** → 保持硬编码，但标准化结构
4. **功能组件** → 创建 `lib/ui-texts.ts` 管理文案

### **第三阶段：统一管理**
1. 创建内容管理系统
2. 建立内容更新流程
3. 完善类型定义和验证

---

## 🎯 **优先级建议**

### **高优先级（经常变化）**
- 📚 学术论文
- 💡 专利发明  
- 💻 软件著作权
- 📰 最新动态

### **中优先级（偶尔更新）**  
- 🏆 荣誉奖项
- 📅 个人时间线
- 🏃‍♂️ 体育成就
- 🎯 技能图谱

### **低优先级（相对稳定）**
- 🏠 Hero区内容
- 🧭 导航结构
- 📞 联系信息
- 💪 核心能力

这样分层管理既保持了灵活性，又控制了复杂度，你觉得这个方案如何？
