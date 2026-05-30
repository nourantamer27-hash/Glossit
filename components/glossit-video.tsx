"use client"

import { useEffect, useRef, useState } from "react"

const shades = [
  { name: "Frostbite", color: "#8B3A5C" },
  { name: "Dark Espresso", color: "#4A3728" },
  { name: "Honeyed Nude", color: "#C9A88F" },
  { name: "Red Flag", color: "#C41E3A" },
  { name: "Love Blush", color: "#F08080" },
  { name: "Delulu", color: "#FFE4E1" },
]

export function GlossitVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentShadeIndex, setCurrentShadeIndex] = useState(0)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const shadeDuration = 2000 // 2 seconds per shade
    const fadeDuration = 500 // 0.5 second fade

    const animate = (currentTime: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const cycleTime = elapsed % (shades.length * shadeDuration)
      const shadeIndex = Math.floor(cycleTime / shadeDuration)
      const timeInShade = cycleTime % shadeDuration

      // Set current shade for display
      setCurrentShadeIndex(shadeIndex)

      // Get current and next shade colors
      const currentShade = shades[shadeIndex]
      const nextShade = shades[(shadeIndex + 1) % shades.length]

      // Calculate opacity for fade effect
      const isFading = timeInShade > shadeDuration - fadeDuration
      let opacity = 1
      if (isFading) {
        opacity = 1 - (timeInShade - (shadeDuration - fadeDuration)) / fadeDuration
      }

      // Draw background
      ctx.fillStyle = currentShade.color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw fade overlay if transitioning
      if (isFading) {
        ctx.fillStyle = nextShade.color
        ctx.globalAlpha = 1 - opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
      }

      // Draw brand name at top
      ctx.font = "bold 72px Playfair Display, Georgia, serif"
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText("Glossit", canvas.width / 2, 80)

      // Draw current shade name in center
      ctx.font = "bold 96px Playfair Display, Georgia, serif"
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(currentShade.name, canvas.width / 2, canvas.height / 2)

      // Draw shade number at bottom
      ctx.font = "48px Inter, system-ui, sans-serif"
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(`${shadeIndex + 1} / ${shades.length}`, canvas.width / 2, canvas.height - 80)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-secondary">
      <canvas
        ref={canvasRef}
        width={1080}
        height={1080}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      {/* Shimmer overlay */}
      <div className="shimmer-btn absolute inset-0 pointer-events-none opacity-30" />
    </div>
  )
}
