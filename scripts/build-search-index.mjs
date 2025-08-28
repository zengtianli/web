import fs from 'fs';
import path from 'path';

const CWD = process.cwd();

async function generateSearchIndex() {
  const searchIndex = [];

  // 1. Index intro.md
  try {
    const introContent = fs.readFileSync(path.join(CWD, 'intro.md'), 'utf-8');
    searchIndex.push({
      id: 'intro',
      title: '项目介绍与目录结构',
      path: '/',
      content: introContent,
    });
    console.log('Indexed intro.md');
  } catch (error) {
    console.error('Error indexing intro.md:', error);
  }

  // 2. Index projects from data/projects.ts
  try {
    const projectsTSContent = fs.readFileSync(path.join(CWD, 'data/projects.ts'), 'utf-8');
    const projectsJSONString = projectsTSContent
      .replace(/^export const projects = /, '')
      .replace(/;\s*$/, '') // More robustly remove trailing semicolon and whitespace
      .trim();
    
    // Use new Function to parse the JS array string. Add parentheses for safety.
    const projectsData = new Function("return (" + projectsJSONString + ");")();

    projectsData.forEach(project => {
      searchIndex.push({
        id: `project-${project.slug}`,
        title: project.title,
        path: `/projects/${project.slug}`,
        content: `${project.title} ${project.brief} ${(project.tags || []).join(' ')} ${project.background || ''} ${(project.contributions || []).join(' ')} ${(project.outcomes || []).join(' ')}`,
        tags: project.tags || []
      });
    });
    console.log('Indexed ' + projectsData.length + ' projects');
  } catch (error) {
    console.error('Error indexing projects from data/projects.ts:', error);
    console.log("Consider converting data/projects.ts to a .js file and using module.exports, or ensure your Node environment can import .ts files directly (e.g., using ts-node or esbuild-register).")
  }

  // 3. Index tools from content/tools/
  try {
    const toolsDir = path.join(CWD, 'content/tools');
    if (fs.existsSync(toolsDir)) {
      // Index main tools page
      searchIndex.push({
        id: 'tools',
        title: '开发工具',
        path: '/tools',
        content: '我的开源开发工具集合，涵盖了 macOS 自动化、编辑器配置、命令行环境等各个方面，旨在提升开发效率和体验。'
      });

      // Read individual tool files
      const toolFiles = ['execute.md', 'neovim.md', 'zsh.md'];
      toolFiles.forEach(filename => {
        try {
          const toolPath = path.join(toolsDir, filename);
          if (fs.existsSync(toolPath)) {
            const toolContent = fs.readFileSync(toolPath, 'utf-8');
            const toolName = filename.replace('.md', '');
            
            // Extract title from first heading
            const titleMatch = toolContent.match(/^#\s+(.+)/m);
            const title = titleMatch ? titleMatch[1] : `${toolName} 工具`;
            
            // Get first few paragraphs as content
            const contentMatch = toolContent.match(/\n\n(.+?)(?:\n\n|$)/);
            const description = contentMatch ? contentMatch[1] : '';
            
            searchIndex.push({
              id: `tool-${toolName}`,
              title: title,
              path: `/tools#${toolName}`,
              content: `${title} ${description} ${toolContent.substring(0, 500)}`,
              tags: ['开发工具', '开源', toolName]
            });
          }
        } catch (error) {
          console.error(`Error indexing tool ${filename}:`, error);
        }
      });
      console.log('Indexed tools from content/tools/');
    }
  } catch (error) {
    console.error('Error indexing tools:', error);
  }

  // 4. Index static pages (manual entries)
  const staticPages = [
    { id: 'about', title: '关于我', path: '/about', content: '关于我的信息，技术栈，经验等。' },
    { id: 'contact', title: '联系方式', path: '/contact', content: '如何联系我，邮箱，社交媒体等。' },
    { id: 'projects', title: '项目列表', path: '/projects', content: '我的项目经验列表展示。' },
    { id: 'research', title: '研究方向', path: '/research', content: '我的研究方向和兴趣领域。' },
  ];

  staticPages.forEach(page => {
    searchIndex.push(page);
  });
  console.log('Indexed ' + staticPages.length + ' static pages');

  // 5. Write to public/search-index.json
  try {
    if (!fs.existsSync(path.join(CWD, 'public'))) {
      fs.mkdirSync(path.join(CWD, 'public'), { recursive: true });
    }
    fs.writeFileSync(
      path.join(CWD, 'public/search-index.json'),
      JSON.stringify(searchIndex, null, 2),
      'utf-8'
    );
    console.log('Search index successfully generated at public/search-index.json');
  } catch (error) {
    console.error('Error writing search-index.json:', error);
  }
}

generateSearchIndex(); 