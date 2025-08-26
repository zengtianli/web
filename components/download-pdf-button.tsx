"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadPDFButtonProps {
  filename: string
}

export default function DownloadPDFButton({ filename }: DownloadPDFButtonProps) {
  const handleDownload = () => {
    // 创建下载链接
    const link = document.createElement('a')
    link.href = '/zengtianli-cv.pdf'
    link.download = `${filename}.pdf`
    link.click()
  }

  return (
    <Button size="sm" onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" />
      下载PDF
    </Button>
  )
}
