/**
 * 工作经历组件
 */

import { Briefcase } from 'lucide-react'
import { ResumeSection, ResumeSubsection } from './ResumeLayout'
import type { WorkExperience } from '@/lib/resume-data'

interface WorkSectionProps {
  data: WorkExperience[]
  showProjects?: boolean
}

export default function WorkSection({ data, showProjects = true }: WorkSectionProps) {
  return (
    <ResumeSection title="工作经历" icon={<Briefcase />}>
      {data.map((work) => (
        <ResumeSubsection
          key={work.id}
          title={work.company.zh}
          subtitle={`${work.position.zh}${work.department ? ` | ${work.department.zh}` : ''}`}
          period={`${work.period.start} - ${work.period.end === 'present' ? '至今' : work.period.end}`}
          location={work.location}
        >
          <div className="space-y-3 text-sm print:text-xs">
            {/* 工作职责 */}
            {work.responsibilities && work.responsibilities.length > 0 && (
              <div>
                <strong className="text-gray-900">工作职责:</strong>
                <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                  {work.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-700">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 主要项目 */}
            {showProjects && work.projects && work.projects.length > 0 && (
              <div>
                <strong className="text-gray-900">主要项目:</strong>
                <div className="space-y-3 mt-2">
                  {work.projects.map((project, index) => (
                    <div key={index} className="ml-2 border-l-2 border-gray-300 pl-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-900">{project.name.zh}</h4>
                        <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">
                          {project.period.start} - {project.period.end === 'present' ? '至今' : project.period.end}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        <strong>角色:</strong> {project.role.zh}
                      </p>
                      
                      {project.background && (
                        <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                          <strong>项目背景:</strong> {project.background}
                        </p>
                      )}

                      {project.responsibilities && project.responsibilities.length > 0 && (
                        <div className="mt-1">
                          <strong className="text-xs text-gray-900">主要工作:</strong>
                          <ul className="list-disc list-inside text-xs text-gray-700 ml-2 mt-0.5 space-y-0.5">
                            {project.responsibilities.map((resp, rIndex) => (
                              <li key={rIndex}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.achievements && project.achievements.length > 0 && (
                        <div className="mt-1">
                          <strong className="text-xs text-gray-900">项目成果:</strong>
                          <ul className="list-disc list-inside text-xs text-gray-700 ml-2 mt-0.5 space-y-0.5">
                            {project.achievements.map((achievement, aIndex) => (
                              <li key={aIndex}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.technologies && project.technologies.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">
                          <strong>技术栈:</strong> {project.technologies.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 工作成就 */}
            {work.achievements && work.achievements.length > 0 && (
              <div>
                <strong className="text-gray-900">工作成就:</strong>
                <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                  {work.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ResumeSubsection>
      ))}
    </ResumeSection>
  )
}

