/**
 * 荣誉奖项组件
 */

import { Award } from 'lucide-react'
import { ResumeSection } from './ResumeLayout'
import type { Honor } from '@/lib/resume-data'

interface HonorSectionProps {
  data: Honor[]
  detailed?: boolean
}

export default function HonorSection({ data, detailed = false }: HonorSectionProps) {
  const levelMap = {
    national: '国家级',
    provincial: '省级',
    university: '校级',
    department: '学院/部门级'
  }

  if (detailed) {
    // 详细模式：按类别分组
    const categories = {
      scholarship: [] as Honor[],
      academic: [] as Honor[],
      competition: [] as Honor[],
      honor_title: [] as Honor[],
      sports: [] as Honor[]
    }

    data.forEach(honor => {
      categories[honor.category].push(honor)
    })

    const categoryNames = {
      scholarship: '奖学金',
      academic: '学术奖励',
      competition: '竞赛获奖',
      honor_title: '荣誉称号',
      sports: '体育成就'
    }

    return (
      <ResumeSection title="荣誉奖项" icon={<Award />}>
        <div className="space-y-4 text-sm print:text-xs">
          {Object.entries(categories).map(([key, honors]) => {
            if (honors.length === 0) return null
            return (
              <div key={key}>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {categoryNames[key as keyof typeof categoryNames]}
                </h3>
                <div className="space-y-2">
                  {honors.map((honor) => (
                    <div key={honor.id} className="border-l-2 border-gray-300 pl-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{honor.title.zh}</h4>
                        <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">
                          {honor.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {honor.issuer.zh} | {levelMap[honor.level]}
                      </p>
                      {honor.description && (
                        <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                          {honor.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </ResumeSection>
    )
  }

  // 简化模式：统一列表
  return (
    <ResumeSection title="荣誉奖项" icon={<Award />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm print:text-xs">
        {data.map((honor) => (
          <div key={honor.id} className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{honor.title.zh}</h4>
              <p className="text-xs text-gray-600 mt-0.5">
                {honor.issuer.zh}
              </p>
            </div>
            <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">
              {honor.date}
            </span>
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}

