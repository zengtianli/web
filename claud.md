项目内容与代码分离任务
当前进度和需求
我们正在为个人网站的学术与成果页面实现内容和代码分离。目前已完成：

创建了所有必要的内容文件：
/content/research/_index.md - 页面概述
/content/research/software-copyrights.md - 软件著作权
/content/research/patents.md - 专利
/content/research/academic-papers.md - 学术论文
/content/research/awards.md - 奖项
在lib/content.ts中添加了新的接口和函数来加载这些内容文件
修改了主页面app/research/page.tsx以从内容文件加载数据
已成功更新两个组件：
SoftwareCopyrights组件 - 已修改为接收从内容文件加载的数据
Patents组件 - 已修改为接收从内容文件加载的数据
剩余任务
需要完成的任务：

修改AcademicPapers组件（components/academic-papers.tsx）
添加接口定义：interface AcademicPapersProps { data?: PapersContent; }
添加默认数据（类似于其他组件）
修改组件以接收data属性
实现从内容文件加载数据的逻辑
修改Awards组件（components/awards.tsx）
添加接口定义：interface AwardsProps { data?: AwardsContent; }
添加默认数据（类似于其他组件）
修改组件以接收data属性
实现从内容文件加载数据的逻辑
最终测试
确保所有组件都能正确地从内容文件加载数据
验证内容更改能够自动反映在网站上
每个组件的修改模式与之前类似，主要包括：

导入相应的内容类型
定义组件接口
添加默认数据
修改组件以接收数据属性
使用传入的数据而不是硬编码数据
目前遇到了工具调用超时问题，导致无法完成AcademicPapers和Awards组件的修改。需要在刷新上下文后继续完成这些组件的修改。
