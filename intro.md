# 项目目录结构说明

## 文件
- `components.json` - 组件库配置文件，可能用于自定义UI组件库设置
- `next-env.d.ts` - Next.js的TypeScript声明文件，提供类型支持
- `next.config.mjs` - Next.js配置文件，自定义Next.js应用行为
- `package.json` - 项目依赖和脚本配置文件
- `pnpm-lock.yaml` - pnpm包管理器的依赖锁定文件，确保依赖版本一致性
- `postcss.config.mjs` - PostCSS配置文件，用于CSS转换和处理
- `tailwind.config.ts` - Tailwind CSS框架的配置文件
- `tsconfig.json` - TypeScript编译器配置文件

## 文件夹
- `.git` - Git版本控制系统的仓库数据
- `.next` - Next.js自动生成的构建输出目录，包含编译后的代码和资源
- `app` - Next.js的App Router目录，包含应用的路由和页面组件
- `components` - 可复用的React组件存放目录
- `data` - 静态数据或数据模型存放目录
- `hooks` - 自定义React Hooks函数存放目录
- `lib` - 通用的工具函数和库代码
- `node_modules` - 存放项目依赖的第三方包和库
- `public` - 静态资源存放目录，如图片、字体等，可直接通过URL访问
- `styles` - 样式文件存放目录，如CSS、SCSS文件等

## 应用结构
该项目是一个使用Next.js框架构建的Web应用，采用TypeScript作为开发语言，Tailwind CSS作为样式框架。项目使用了现代化的App Router路由系统，可能是一个个人作品集（portfolio）网站，包含多个页面如about、contact、projects和research等。 