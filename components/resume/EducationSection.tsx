/**
 * 教育背景组件
 */

import { GraduationCap } from 'lucide-react'
import { ResumeSection, ResumeSubsection } from './ResumeLayout'
import type { Education } from '@/lib/resume-data'

interface EducationSectionProps {
  data: Education[]
  detailed?: boolean
}

export default function EducationSection({ data, detailed = false }: EducationSectionProps) {
  return (
    <ResumeSection title="教育背景" icon={<GraduationCap />}>
      {data.map((edu) => (
        <ResumeSubsection
          key={edu.id}
          title={`${edu.institution.zh}${edu.school ? ` - ${edu.school.zh}` : ''}`}
          subtitle={`${edu.degree.zh} | ${edu.major.zh}`}
          period={`${edu.period.start} - ${edu.period.end}`}
          location={edu.location}
        >
          {/* 基本信息 */}
          <div className="space-y-2 text-sm print:text-xs">
            {edu.gpa && (
              <p className="text-gray-700">
                <strong>GPA:</strong> {edu.gpa}/4.0
              </p>
            )}
            {edu.weightedAverage && (
              <p className="text-gray-700">
                <strong>加权平均分:</strong> {edu.weightedAverage}/100{" "}
                {edu.totalCredits && `（总学分：${edu.totalCredits}）`}
              </p>
            )}
            
            {/* 导师信息 */}
            {edu.supervisor && (
              <div className="text-gray-700">
                <strong>导师:</strong> {edu.supervisor.name.zh} ({edu.supervisor.name.en}) - {edu.supervisor.title.zh}
                {edu.supervisor.position && (
                  <span className="block ml-4 mt-1 text-xs">{edu.supervisor.position}</span>
                )}
              </div>
            )}

            {/* 研究方向 */}
            {edu.researchFocus && edu.researchFocus.length > 0 && (
              <div className="text-gray-700">
                <strong>研究方向:</strong> {edu.researchFocus.join('、')}
              </div>
            )}

            {/* 描述 */}
            {edu.description && (
              <p className="text-gray-700 leading-relaxed">{edu.description}</p>
            )}

            {/* 主要成就 */}
            {edu.achievements && edu.achievements.length > 0 && (
              <div>
                <strong className="text-gray-900">主要成就:</strong>
                <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 详细模式：显示课程成绩 */}
            {detailed && edu.courses && edu.courses.length > 0 && (
              <div className="mt-3">
                <strong className="text-gray-900">核心课程:</strong>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                  {edu.courses
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10)
                    .map((course, index) => (
                      <div key={index} className="text-xs print:text-[10px] text-gray-700">
                        {course.name.zh} ({course.score}分)
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </ResumeSubsection>
      ))}
    </ResumeSection>
  )
}

