import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactInfo from "@/components/contact-info"
import ContactForm from "@/components/contact-form"

export const metadata = {
  title: "联系方式 | 曾田力",
  description: "与曾田力取得联系，探讨水利工程、数据分析、智能模型及软件系统研发等领域的合作机会。",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
