"use client"

import { useMotionValue, motion, useMotionTemplate } from "framer-motion"
import { MouseEvent } from "react"

export const EvervaultCard = ({ text }: { text: string }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className="group relative max-w-md rounded-xl border border-white/10 bg-gray-900 px-8 py-16 shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div>
        <h3 className="text-base font-semibold leading-7 text-sky-500">
          {text}
        </h3>
        <div className="mt-2 flex items-center gap-x-2">
          <span className="text-5xl font-bold tracking-tight text-white">
            Velkommen
          </span>
        </div>
      </div>
    </div>
  )
} 