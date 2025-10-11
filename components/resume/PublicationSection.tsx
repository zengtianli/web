/**
 * 学术成果组件
 */

import { BookOpen, Award, Code } from 'lucide-react'
import { ResumeSection } from './ResumeLayout'
import type { ResearchOutput } from '@/lib/resume-data'

interface PublicationSectionProps {
  data: ResearchOutput
  showPatents?: boolean
  showSoftware?: boolean
}

export default function PublicationSection({ 
  data, 
  showPatents = true, 
  showSoftware = true 
}: PublicationSectionProps) {
  return (
    <>
      {/* 学术论文 */}
      {data.papers && data.papers.length > 0 && (
        <ResumeSection title="学术论文" icon={<BookOpen />}>
          <div className="space-y-4 text-sm print:text-xs">
            {data.papers.map((paper) => (
              <div key={paper.id} className="border-l-2 border-gray-300 pl-3">
                <h3 className="font-semibold text-gray-900">
                  {paper.title.zh}
                  {paper.isFirstAuthor && (
                    <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded">
                      第一作者
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {paper.authors.join(', ')}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <em>{paper.journal.zh}</em>, {paper.year}
                  {paper.volume && `, ${paper.volume}`}
                  {paper.pages && `, ${paper.pages}`}
                </p>
                {paper.abstract && (
                  <p className="text-xs text-gray-700 mt-2 leading-relaxed line-clamp-3">
                    {paper.abstract}
                  </p>
                )}
                {paper.doi && (
                  <p className="text-xs text-gray-600 mt-1">
                    DOI: {paper.doi}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* 专利 */}
      {showPatents && data.patents && data.patents.length > 0 && (
        <ResumeSection title="专利" icon={<Award />}>
          <div className="space-y-3 text-sm print:text-xs">
            {data.patents.map((patent) => (
              <div key={patent.id} className="border-l-2 border-gray-300 pl-3">
                <h3 className="font-semibold text-gray-900">{patent.title.zh}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  发明人: {patent.inventors.join(', ')}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  申请人: {patent.applicant}
                </p>
                {patent.patentNumber && (
                  <p className="text-xs text-gray-600 mt-1">
                    专利号: {patent.patentNumber}
                  </p>
                )}
                {patent.grantDate && (
                  <p className="text-xs text-gray-600 mt-1">
                    授权日期: {patent.grantDate}
                  </p>
                )}
                {patent.abstract && (
                  <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                    {patent.abstract}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* 软件著作权 */}
      {showSoftware && data.softwareCopyrights && data.softwareCopyrights.length > 0 && (
        <ResumeSection title="软件著作权" icon={<Code />}>
          <div className="space-y-3 text-sm print:text-xs">
            {data.softwareCopyrights.map((software) => (
              <div key={software.id} className="border-l-2 border-gray-300 pl-3">
                <h3 className="font-semibold text-gray-900">{software.title.zh}</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-1">
                  <p>登记号: {software.registrationNumber}</p>
                  <p>登记日期: {software.registrationDate}</p>
                  <p>开发者: {software.developer}</p>
                  <p>权利人: {software.owner}</p>
                  {software.version && <p>版本: {software.version}</p>}
                </div>
                {software.description && (
                  <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                    {software.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}
    </>
  )
}

