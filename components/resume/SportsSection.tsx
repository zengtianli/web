/**
 * 体育成就组件
 */

import { Trophy } from 'lucide-react'
import { ResumeSection } from './ResumeLayout'
import type { SportsAchievement } from '@/lib/resume-data'

interface SportsSectionProps {
  data: SportsAchievement[]
  compact?: boolean
}

export default function SportsSection({ data, compact = false }: SportsSectionProps) {
  const levelMap = {
    national: '国家级',
    provincial: '省级',
    university: '校级',
    department: '学院/部门级'
  }

  if (compact) {
    return (
      <ResumeSection title="体育成就" icon={<Trophy />}>
        <div className="text-sm print:text-xs">
          <p className="text-gray-700 mb-3">
            获得 <strong className="text-gray-900">40+</strong> 项体育竞赛冠军，涵盖游泳、帆船、羽毛球、乒乓球、网球、篮球、足球等多个运动项目。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.slice(0, 6).map((achievement) => (
              <div key={achievement.id} className="flex justify-between items-center text-xs">
                <span className="text-gray-900">{achievement.event.zh}</span>
                <span className="text-gray-600 ml-2">{achievement.achievement.zh}</span>
              </div>
            ))}
          </div>
        </div>
      </ResumeSection>
    )
  }

  // 按类别分组
  const byCategory: Record<string, SportsAchievement[]> = {}
  data.forEach(achievement => {
    const cat = achievement.category || '其他'
    if (!byCategory[cat]) {
      byCategory[cat] = []
    }
    byCategory[cat].push(achievement)
  })

  return (
    <ResumeSection title="体育成就" icon={<Trophy />}>
      <div className="space-y-4 text-sm print:text-xs">
        <p className="text-gray-700">
          获得 <strong className="text-gray-900">40+</strong> 项体育竞赛冠军，展现全面的体育素质和卓越的竞技能力。
        </p>
        
        {Object.entries(byCategory).map(([category, achievements]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex justify-between items-start border-l-2 border-gray-300 pl-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.event.zh}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {achievement.achievement.zh} | {levelMap[achievement.level]}
                      {achievement.organizer && ` | ${achievement.organizer.zh}`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">
                    {achievement.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}

