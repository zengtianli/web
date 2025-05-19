"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { loadSlim } from "tsparticles-slim"
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"

interface ParticlesProps {
  className?: string
}

export default function ParticlesBackground({ className }: ParticlesProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    // Use loadSlim instead of loadFull for better performance and fewer issues
    await loadSlim(engine)
  }, [])

  if (!isMounted) return null

  return (
    <div className={cn("particles-container", className)}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#64FFDA",
            },
            links: {
              color: "#64FFDA",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}
