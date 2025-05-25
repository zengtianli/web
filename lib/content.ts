import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 内容根目录
const contentDirectory = path.join(process.cwd(), 'content');

// 内容类型定义
export interface ContentItem<T = Record<string, any>> {
  metadata: T;
  content: string; // HTML格式的内容
  rawContent: string; // 原始Markdown内容
}

// 我的内容类型
export interface AboutIntroContent {
  title: string;
  subtitle: string;
  description: string; // 描述必须存在
  slogan: string;
  profileImage: string;
}

// 技能内容类型
export interface SkillsContent {
  title: string;
  description?: string;
  categories: SkillCategory[];
}

// 未来展望内容类型
export interface FutureContent {
  title: string;
  description?: string;
  visionPoints: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

// 时间线项目类型
export interface TimelineItem {
  period: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
  honors: string[];
}

// 时间线内容类型
export interface TimelineContent {
  title: string;
  anchor?: string; // 页面锚点ID
  items: TimelineItem[];
}

// 技能类型
export interface Skill {
  name: string;
  level: number;
}

// 技能分类类型
export interface SkillCategory {
  name: string;
  skills: Skill[];
}

// 项目内容类型
export interface ProjectContent {
  slug: string;
  title: string;
  brief: string;
  role: string;
  image: string;
  tags: string[];
  background?: string;
  contributions?: string[];
  outcomes?: string[];
}

// 项目概要内容类型
export interface ProjectIndexContent {
  title: string;
  description: string;
}

/**
 * 获取指定内容的元数据和正文
 */
export async function getContent<T = Record<string, any>>(contentPath: string): Promise<ContentItem<T> | null> {
  const fullPath = path.join(contentDirectory, `${contentPath}.md`);
  
  // 检查文件是否存在
  if (!fs.existsSync(fullPath)) {
    console.warn(`内容文件未找到: ${fullPath}`);
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 将Markdown转换为HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();
    
    return {
      metadata: data as T,
      content: contentHtml,
      rawContent: content,
    };
  } catch (error) {
    console.error(`读取内容文件时出错: ${fullPath}`, error);
    return null;
  }
}

/**
 * 获取目录下所有Markdown内容
 */
export async function getAllContent<T = Record<string, any>>(directory: string): Promise<ContentItem<T>[]> {
  const fullPath = path.join(contentDirectory, directory);
  
  // 检查目录是否存在
  if (!fs.existsSync(fullPath)) {
    console.warn(`目录未找到: ${fullPath}`);
    return [];
  }
  
  try {
    const fileNames = fs.readdirSync(fullPath);
    const mdFiles = fileNames.filter(file => file.endsWith('.md'));
    
    const allContent = await Promise.all(
      mdFiles.map(async (fileName) => {
        const contentPath = path.join(directory, fileName.replace(/\.md$/, ''));
        const content = await getContent<T>(contentPath);
        return content;
      })
    );
    
    return allContent.filter((item): item is ContentItem<T> => item !== null);
  } catch (error) {
    console.error(`读取目录内容时出错: ${fullPath}`, error);
    return [];
  }
}

/**
 * 获取嵌套YAML格式的内容
 * 适用于包含YAML列表的内容，如timeline
 */
export async function getNestedContent<T = Record<string, any>>(contentPath: string): Promise<T | null> {
  const fullPath = path.join(contentDirectory, `${contentPath}.md`);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`内容文件未找到: ${fullPath}`);
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return data as T;
  } catch (error) {
    console.error(`读取内容文件时出错: ${fullPath}`, error);
    return null;
  }
}

/**
 * 获取项目概要信息
 */
export async function getProjectIndex(): Promise<ProjectIndexContent | null> {
  return getNestedContent<ProjectIndexContent>('projects/_index');
}

/**
 * 获取所有项目列表
 */
export async function getAllProjects(): Promise<ProjectContent[]> {
  try {
    const contentDir = path.join(contentDirectory, 'projects/items');
    const filenames = fs.readdirSync(contentDir);
    
    const projects = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.md'))
        .map(async (filename) => {
          const slug = filename.replace(/\.md$/, '');
          const result = await getContent<ProjectContent>(`projects/items/${slug}`);
          return result?.metadata || null;
        })
    );
    
    // 过滤掉空值
    return projects.filter((project): project is ProjectContent => project !== null);
  } catch (error) {
    console.error('加载项目列表出错:', error);
    return [];
  }
}

/**
 * 获取单个项目内容
 */
export async function getProjectBySlug(slug: string): Promise<ContentItem<ProjectContent> | null> {
  return getContent<ProjectContent>(`projects/items/${slug}`);
}
