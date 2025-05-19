import Image from "next/image"

export default function AboutIntro() {
  return (
    <section className="mb-16">
      <h1 className="text-4xl font-bold mb-8 text-center">关于我 | My Journey</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-accent/30 shadow-[0_0_25px_rgba(100,255,218,0.3)]">
            <Image src="/placeholder.svg?height=256&width=256" alt="曾田力" fill className="object-cover" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">曾田力 (Zeng Tianli)</h2>
          <p className="text-lg mb-6">
            浙江大学水利工程专业博士，专注于水利工程与信息技术的融合创新。十余年来，我致力于将机器学习、数据分析等前沿技术应用于水资源管理、水文预测和水利工程规划领域，开发了多款专业软件系统，发表多篇高质量学术论文。
          </p>
          <p className="text-xl font-medium text-accent">驱动创新，智绘水利。</p>
        </div>
      </div>
    </section>
  )
}
