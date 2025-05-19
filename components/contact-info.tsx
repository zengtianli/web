import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">联系方式</h1>
        <p className="text-lg text-muted-foreground">
          我对水利科技的未来充满期待，欢迎随时与我联系，探讨行业发展、技术创新或合作机会。
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start">
          <Mail className="h-6 w-6 text-accent mr-4 mt-1" />
          <div>
            <h3 className="font-bold mb-1">电子邮箱</h3>
            <a href="mailto:zengtianli1@126.com" className="text-muted-foreground hover:text-accent transition-colors">
              zengtianli1@126.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <Phone className="h-6 w-6 text-accent mr-4 mt-1" />
          <div>
            <h3 className="font-bold mb-1">电话</h3>
            <a href="tel:15957183444" className="text-muted-foreground hover:text-accent transition-colors">
              15957183444
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-accent mr-4 mt-1" />
          <div>
            <h3 className="font-bold mb-1">地址</h3>
            <p className="text-muted-foreground">浙江省杭州市</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-6 w-6 flex justify-center text-accent mr-4 mt-1">
            <Linkedin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold mb-1">LinkedIn</h3>
            <Link
              href="https://www.linkedin.com/in/tianli-zeng-4068a7190/"
              target="_blank"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              linkedin.com/in/tianlizeng
            </Link>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-6 w-6 flex justify-center text-accent mr-4 mt-1">
            <Github className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold mb-1">GitHub</h3>
            <Link
              href="https://github.com/zengtianli"
              target="_blank"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              github.com/zengtianli
            </Link>
          </div>
        </div>

        <div className="flex items-start">
          <div className="h-6 w-6 flex justify-center text-accent mr-4 mt-1">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold mb-1">微信</h3>
            <p className="text-muted-foreground">zengtracy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
