import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter, Montserrat, Exo_2, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata = {
  title: "曾田力 | 数据驱动的水利创新者",
  description:
    "融合水利工程专业智慧与前沿信息技术，致力于通过数据分析、智能模型及软件系统研发，解决复杂水资源挑战，驱动行业变革。",
  openGraph: {
    title: "曾田力 | 数据驱动的水利创新者",
    description:
      "融合水利工程专业智慧与前沿信息技术，致力于通过数据分析、智能模型及软件系统研发，解决复杂水资源挑战，驱动行业变革。",
    url: "https://zengtianli.vercel.app",
    siteName: "曾田力个人作品集",
    locale: "zh_CN",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} ${exo2.variable} ${orbitron.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
