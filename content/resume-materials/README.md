# 📋 简历素材库 Resume Materials Library

> 结构化的简历素材采集与管理系统，既可用于个人网站内容更新，也可用于生成各种版本的简历。

---

## 📂 文件结构 File Structure

```
resume-materials/
├── README.md                          # 本文件：使用说明
├── 01-personal-info.md                # 个人信息
├── 02-education.md                    # 教育背景
├── 03-work-experience.md              # 工作/实习经历
├── 04-project-experience.md           # 项目经历（学术/课程项目）
├── 05-research-publications.md        # 科研经历与学术成果
├── 06-awards-activities.md            # 奖励荣誉与课外活动
└── 07-skills-tests.md                 # 技能爱好与标准化考试
```

---

## 📝 文件说明 File Descriptions

### 01-personal-info.md - 个人信息
**内容包括**:
- 基本信息（姓名、生日、国籍等）
- 联系方式（邮箱、电话、地址）
- 社交媒体与专业平台链接
- 个人简介（中英文）
- 职业定位

**更新频率**: 低 - 相对稳定，偶尔更新

---

### 02-education.md - 教育背景
**内容包括**:
- 博士教育（浙江大学）
- 联合培养经历（克拉克森大学）
- 硕士教育
- 本科教育
- 其他教育经历

**更新频率**: 低 - 教育背景相对固定

---

### 03-work-experience.md - 工作/实习经历
**内容包括**:
- 工作经历（浙江省水利水电规划设计院）
  - 4个重点项目详细描述
  - 工作职责与成就
- 实习经历

**更新频率**: 中 - 随着工作推进定期更新项目进展

---

### 04-project-experience.md - 项目经历
**内容包括**:
- 博士阶段学术研究项目
- 联合培养期间研究项目
- 本科/硕士课程项目
- 技术竞赛项目
- 个人开发项目（开源工具）

**更新频率**: 中 - 新项目完成后更新

---

### 05-research-publications.md - 科研经历与学术成果
**内容包括**:
- 科研/实验室经历
- 学术论文（4篇）
- 专利发明（1项）
- 软件著作权（3项）
- 研究总结

**更新频率**: 中 - 新论文发表或新专利获批时更新

---

### 06-awards-activities.md - 奖励荣誉与课外活动
**内容包括**:
- 学术奖励与荣誉
- 竞赛获奖
- 体育成就（40+项冠军）
- 其他荣誉
- 课外活动

**更新频率**: 中 - 获得新奖项或参与新活动时更新

---

### 07-skills-tests.md - 技能爱好与标准化考试
**内容包括**:
- 专业技能（水利工程、机器学习、GIS）
- 计算机技能（编程、Web开发、数据库）
- 语言能力（中文、英语）
- 证书与资质
- 标准化考试成绩
- 个人爱好

**更新频率**: 中 - 掌握新技能或获得新证书时更新

---

## 🎯 使用方法 How to Use

### 1. 填充待补充内容 Fill in TODO Items

每个文件中用 `<!-- 🔴 TODO: ... -->` 和 `【待补充】` 标记了需要填充的内容。

**查找待补充项目的方法**:
```bash
# 在终端中运行
grep -r "🔴 TODO" content/resume-materials/
# 或
grep -r "待补充" content/resume-materials/
```

**优先级建议**:
1. **高优先级** - 基础信息必填项：
   - 出生日期、教育经历的具体日期
   - 工作经历的起止时间
   - 主要项目的时间线

2. **中优先级** - 丰富简历内容：
   - GPA成绩
   - 课程列表
   - 详细的奖项信息

3. **低优先级** - 锦上添花：
   - 标准化考试成绩（如已过期）
   - 详细的课外活动描述

---

### 2. 同步到个人网站 Sync to Personal Website

简历素材库与个人网站的对应关系：

| 简历素材文件 | 对应网站位置 | 更新方式 |
|---|---|---|
| `01-personal-info.md` | `lib/profile-config.ts` | 手动同步联系信息和简介 |
| `02-education.md` | `content/about/timeline.md` | 提取教育经历到时间线 |
| `03-work-experience.md` | `data/projects.ts` + 项目详情页 | 更新项目数据和详细描述 |
| `04-project-experience.md` | 可扩展到网站的 "研究项目" 页面 | 未来功能扩展 |
| `05-research-publications.md` | `content/research/` 目录下各文件 | 更新论文、专利、软著 |
| `06-awards-activities.md` | `content/research/awards.md` + `content/about/sports.md` | 更新奖项和体育成就 |
| `07-skills-tests.md` | `content/about/skills.md` | 更新技能图谱 |

---

### 3. 生成简历文档 Generate Resume Documents

这些素材可以用于生成不同版本的简历：

**中文简历版本**:
- **完整版** - 包含所有内容，用于详细展示
- **工作版** - 侧重工作经历和项目经验
- **学术版** - 侧重教育背景和研究成果

**英文简历版本**:
- **Full CV** - Complete academic curriculum vitae
- **Industry Resume** - Focus on work and projects
- **Research Statement** - Focus on research achievements

---

### 4. 维护与更新 Maintenance & Updates

**定期更新内容** (建议每季度检查):
- [ ] 新发表的论文
- [ ] 新获得的专利或软件著作权
- [ ] 新完成的项目
- [ ] 新获得的奖项或荣誉
- [ ] 新掌握的技能或工具

**年度全面审查** (建议每年进行):
- [ ] 检查所有信息的准确性和时效性
- [ ] 更新联系方式和社交媒体链接
- [ ] 重新评估技能熟练程度
- [ ] 添加最新的工作成就
- [ ] 优化个人简介和职业定位

---

## 🔄 双向更新策略 Bidirectional Update Strategy

### 网站 → 简历素材库
当在网站上更新内容后，记得同步到素材库：
1. 发布新项目 → 更新 `03-work-experience.md`
2. 发表新论文 → 更新 `05-research-publications.md`
3. 获得新奖项 → 更新 `06-awards-activities.md`
4. 修改个人简介 → 更新 `01-personal-info.md`

### 简历素材库 → 网站
当补充素材库内容后，更新到网站：
1. 教育详情 → 丰富时间线组件
2. 技能详情 → 更新技能可视化
3. 体育成就 → 完善体育成就页面
4. 工具项目 → 更新开发工具页面

---

## 📊 完整度追踪 Completeness Tracking

### 当前完成度 Current Completion Status

| 文件 File | 已填充 Filled | 待补充 TODO | 完成度 % |
|---|---|---|---|
| 01-personal-info.md | ✅ 基础信息 | 🔴 部分细节 | ~70% |
| 02-education.md | ✅ 基本框架 | 🔴 具体日期和详情 | ~40% |
| 03-work-experience.md | ✅ 4个项目详情 | 🔴 时间线和部门 | ~80% |
| 04-project-experience.md | ✅ 主要研究项目 | 🔴 开源项目详情 | ~60% |
| 05-research-publications.md | ✅ 4篇论文+3项软著+1项专利 | 🔴 登记号等细节 | ~85% |
| 06-awards-activities.md | ✅ 基本奖项 | 🔴 40+体育成就详情 | ~30% |
| 07-skills-tests.md | ✅ 技能列表 | 🔴 年限和考试成绩 | ~60% |

**总体完成度**: ~60%

---

## 🎨 使用建议 Usage Recommendations

### 针对不同场景的素材选择

**1. 申请学术职位** (Academic Position):
- 重点使用: 02, 04, 05, 07
- 强调: 教育背景、研究成果、学术论文

**2. 申请工程师职位** (Engineering Position):
- 重点使用: 01, 03, 05, 07
- 强调: 工作经验、项目成果、技术技能

**3. 申请博士后** (Postdoc Application):
- 重点使用: 02, 04, 05
- 强调: 研究能力、论文发表、科研经历

**4. 行业交流与合作** (Industry Networking):
- 重点使用: 01, 03, 05
- 强调: 项目经验、软件成果、行业影响

**5. 综合展示（个人网站）** (Personal Website):
- 使用所有部分，展示全面形象
- 突出: 学术能力 + 工程实践 + 体育精神

---

## ⚡ 快速操作指南 Quick Action Guide

### 准备面试
```bash
# 快速查看需要重点准备的内容
cat 03-work-experience.md | grep "主要工作"
cat 05-research-publications.md | grep "论文摘要"
```

### 更新网站
```bash
# 检查最近更新的内容
ls -lt content/resume-materials/*.md | head -5
```

### 导出简历
```bash
# 将markdown转换为PDF（需要安装pandoc）
pandoc 01-personal-info.md 02-education.md 03-work-experience.md \
  -o zengtianli-resume.pdf --pdf-engine=xelatex
```

---

## 📞 维护联系 Maintenance Contact

如需要帮助填充内容或有疑问，请参考：
- 个人网站: `/app/` 目录下的各页面内容
- 配置文件: `/lib/profile-config.ts`
- 内容文件: `/content/` 目录下的markdown文件

---

**创建日期**: 2025-01-XX
**最后更新**: <!-- 🔴 TODO: 每次更新后填写日期 --> 【待补充】
**版本号**: v1.0.0

---

## 📋 待办清单 TODO Checklist

### 高优先级 High Priority
- [ ] 填写所有教育经历的具体日期（02-education.md）
- [ ] 补充工作经历的入职日期和部门信息（03-work-experience.md）
- [ ] 填写软件著作权的登记号和日期（05-research-publications.md）
- [ ] 至少列出10项重点体育成就的详细信息（06-awards-activities.md）

### 中优先级 Medium Priority
- [ ] 补充GPA成绩（02-education.md）
- [ ] 列出主要课程（02-education.md）
- [ ] 填写标准化考试成绩（07-skills-tests.md）
- [ ] 补充技能使用年限（07-skills-tests.md）

### 低优先级 Low Priority
- [ ] 补充出生日期和邮编（01-personal-info.md）
- [ ] 填写导师信息（02-education.md）
- [ ] 列出课外活动详情（06-awards-activities.md）
- [ ] 补充个人爱好的详细描述（07-skills-tests.md）

---

**祝您求职顺利！Good luck with your career! 🎓💼🚀**

