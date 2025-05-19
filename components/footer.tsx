import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileDown, Github, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">© {currentYear} 曾田力. All Rights Reserved.</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="text-accent border-accent hover:bg-accent/10">
              <FileDown className="mr-2 h-4 w-4" />
              下载完整简历 (PDF)
            </Button>

            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
