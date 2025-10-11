/**
 * 动态简历页面
 * 根据 version 参数生成不同版本的简历
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ResumeLayout from '@/components/resume/ResumeLayout'
import ResumeActions from '@/components/resume/ResumeActions'
import ResumeHeader from '@/components/resume/ResumeHeader'
import EducationSection from '@/components/resume/EducationSection'
import WorkSection from '@/components/resume/WorkSection'
import PublicationSection from '@/components/resume/PublicationSection'
import SkillSection from '@/components/resume/SkillSection'
import HonorSection from '@/components/resume/HonorSection'
import SportsSection from '@/components/resume/SportsSection'
import { 
  buildResume, 
  getResumeTemplate,
  type ResumeTemplateId 
} from '@/lib/resume-builder'

const VALID_VERSIONS: ResumeTemplateId[] = ['comprehensive', 'work', 'academic', 'sports']

interface PageProps {
  params: {
    version: string
  }
}

export async function generateStaticParams() {
  return VALID_VERSIONS.map((version) => ({
    version,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const version = params.version as ResumeTemplateId

  if (!VALID_VERSIONS.includes(version)) {
    return { title: '简历未找到' }
  }

  const template = getResumeTemplate(version)

  return {
    title: `${template.name.zh} | 曾田力`,
    description: template.description.zh,
  }
}

export default function ResumePage({ params }: PageProps) {
  const version = params.version as ResumeTemplateId

  if (!VALID_VERSIONS.includes(version)) {
    notFound()
  }

  const template = getResumeTemplate(version)
  const resumeData = buildResume(version)

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-0">
      {/* 工具栏（不打印） */}
      <ResumeActions 
        templateName={template.name.zh}
        templateDescription={template.description.zh}
      />

      {/* 简历内容 */}
      <ResumeLayout>
        {/* 个人信息头部 */}
        {resumeData.sections.personalInfo && (
          <ResumeHeader 
            data={resumeData.sections.personalInfo} 
            showSocial={version !== 'work'}
            compact={version === 'sports'}
          />
        )}

        {/* 教育背景 */}
        {resumeData.sections.education && (
          <EducationSection 
            data={resumeData.sections.education} 
            detailed={false}
          />
        )}

        {/* 教育背景（详细） */}
        {resumeData.sections.educationDetailed && (
          <EducationSection 
            data={resumeData.sections.educationDetailed} 
            detailed={true}
          />
        )}

        {/* 工作经历 */}
        {resumeData.sections.workExperience && (
          <WorkSection 
            data={resumeData.sections.workExperience} 
            showProjects={version !== 'sports'}
          />
        )}

        {/* 学术论文 */}
        {resumeData.sections.publications && (
          <PublicationSection 
            data={{
              papers: resumeData.sections.publications,
              patents: resumeData.sections.patents || [],
              softwareCopyrights: resumeData.sections.softwareCopyrights || []
            }}
            showPatents={!!resumeData.sections.patents}
            showSoftware={!!resumeData.sections.softwareCopyrights}
          />
        )}

        {/* 专利 */}
        {resumeData.sections.patents && !resumeData.sections.publications && (
          <PublicationSection 
            data={{
              papers: [],
              patents: resumeData.sections.patents,
              softwareCopyrights: resumeData.sections.softwareCopyrights || []
            }}
            showPatents={true}
            showSoftware={!!resumeData.sections.softwareCopyrights}
          />
        )}

        {/* 技能 */}
        {(resumeData.sections.skills || resumeData.sections.skillsDetailed) && (
          <SkillSection 
            data={resumeData.sections.skillsDetailed || resumeData.sections.skills} 
            detailed={!!resumeData.sections.skillsDetailed}
            showLanguages={version === 'academic' || version === 'comprehensive'}
          />
        )}

        {/* 荣誉奖项 */}
        {(resumeData.sections.honors || resumeData.sections.honorsDetailed) && (
          <HonorSection 
            data={resumeData.sections.honorsDetailed?.categories?.flatMap((cat: any) => cat.items) || 
                  resumeData.sections.honors}
            detailed={!!resumeData.sections.honorsDetailed}
          />
        )}

        {/* 体育成就 */}
        {resumeData.sections.sportsAchievements && (
          <SportsSection 
            data={resumeData.sections.sportsAchievements} 
            compact={version !== 'sports'}
          />
        )}

        {/* 页脚信息 */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center text-xs print:text-[10px] text-gray-500">
          <p>本简历生成于 {new Date().toLocaleDateString('zh-CN')} | 版本: {template.name.zh}</p>
          <p className="mt-1">在线访问: https://tianlizeng.cloud/resume/{version}</p>
        </div>
      </ResumeLayout>
    </div>
  )
}

