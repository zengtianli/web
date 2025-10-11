/**
 * 简历头部组件 - 个人信息
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import type { PersonalInfo } from '@/lib/resume-data'

interface ResumeHeaderProps {
  data: PersonalInfo
  showSocial?: boolean
  compact?: boolean
}

export default function ResumeHeader({ data, showSocial = true, compact = false }: ResumeHeaderProps) {
  return (
    <header className="mb-8 print:mb-6">
      {/* 姓名和标语 */}
      <div className="text-center mb-4">
        <h1 className="text-4xl print:text-3xl font-bold text-gray-900 mb-2">
          {data.name.zh}
          <span className="text-2xl print:text-xl text-gray-600 ml-3">{data.name.en}</span>
        </h1>
        {!compact && (
          <p className="text-lg print:text-base text-gray-700 mt-2">
            {data.tagline.zh}
          </p>
        )}
      </div>

      {/* 联系信息 */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm print:text-xs text-gray-700">
        <div className="flex items-center gap-1">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${data.contact.email}`} className="hover:text-accent">
            {data.contact.email}
          </a>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-4 w-4" />
          <span>{data.contact.phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{data.contact.address}</span>
        </div>
      </div>

      {/* 社交链接 */}
      {showSocial && (
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm print:text-xs text-gray-700 mt-2">
          {data.social.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a href={data.social.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {data.social.website.replace('https://', '')}
              </a>
            </div>
          )}
          {data.social.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                LinkedIn
              </a>
            </div>
          )}
          {data.social.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                GitHub
              </a>
            </div>
          )}
        </div>
      )}

      {/* 个人简介 */}
      {!compact && (
        <div className="mt-6 print:mt-4">
          <p className="text-sm print:text-xs text-gray-700 leading-relaxed text-center px-4">
            {data.summary.zh}
          </p>
        </div>
      )}
    </header>
  )
}

