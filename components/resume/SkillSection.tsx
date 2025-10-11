/**
 * 技能展示组件
 */

import { Wrench } from 'lucide-react'
import { ResumeSection } from './ResumeLayout'
import type { SkillSystem } from '@/lib/resume-data'

interface SkillSectionProps {
  data: SkillSystem
  detailed?: boolean
  showLanguages?: boolean
}

export default function SkillSection({ 
  data, 
  detailed = false,
  showLanguages = true
}: SkillSectionProps) {
  const proficiencyMap = {
    expert: '精通',
    proficient: '熟练',
    familiar: '了解'
  }

  return (
    <>
      {/* 专业技能 */}
      {data.professional && data.professional.length > 0 && (
        <ResumeSection title="专业技能" icon={<Wrench />}>
          <div className="space-y-4 text-sm print:text-xs">
            {data.professional.map((category, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name.zh}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {category.skills.map((skill, sIndex) => (
                    <div key={sIndex} className="flex items-start">
                      <span className="text-gray-900 font-medium min-w-[120px]">
                        {skill.name.zh}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {proficiencyMap[skill.proficiency]}
                        {detailed && skill.years && ` (${skill.years}年)`}
                      </span>
                    </div>
                  ))}
                </div>
                {detailed && (
                  <div className="mt-2 space-y-1">
                    {category.skills.map((skill, sIndex) => (
                      skill.description && (
                        <p key={sIndex} className="text-xs text-gray-600 ml-2">
                          • {skill.name.zh}: {skill.description}
                        </p>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* 技术技能 */}
      {data.technical && data.technical.length > 0 && (
        <ResumeSection title="技术技能" icon={<Wrench />}>
          <div className="space-y-4 text-sm print:text-xs">
            {data.technical.map((category, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name.zh}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {category.skills.map((skill, sIndex) => (
                    <div key={sIndex} className="flex items-start">
                      <span className="text-gray-900 font-medium min-w-[120px]">
                        {skill.name.zh}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {proficiencyMap[skill.proficiency]}
                        {detailed && skill.years && ` (${skill.years}年)`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* 语言能力 */}
      {showLanguages && data.languages && data.languages.length > 0 && (
        <ResumeSection title="语言能力" icon={<Wrench />}>
          <div className="space-y-3 text-sm print:text-xs">
            {data.languages.map((lang, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <p className="text-gray-700">阅读: {lang.skills.reading}</p>
                  <p className="text-gray-700">写作: {lang.skills.writing}</p>
                  <p className="text-gray-700">听力: {lang.skills.listening}</p>
                  <p className="text-gray-700">口语: {lang.skills.speaking}</p>
                </div>
                {lang.tests && lang.tests.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {lang.tests.map((test, tIndex) => (
                      <p key={tIndex} className="text-xs text-gray-600">
                        • {test.name}: {test.score} ({test.date})
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}
    </>
  )
}

