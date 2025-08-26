"use client"

import { useEffect, useState, useRef } from "react"
import { motion, type PanInfo, useMotionValue } from "framer-motion"
import type { ReactElement } from "react"

import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from "react-icons/fi"

// Interfaces
export interface CarouselItem {
  title: string
  description: string
  id: number
  icon: ReactElement
  backgroundImage?: string // Added optional backgroundImage property
}

export interface CarouselProps {
  items?: CarouselItem[]
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
}

// Constants and Default Items
const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode className="h-[16px] w-[16px] text-white" />,
  },
]

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 }

// Helper function to calculate rotation based on position
const calculateRotation = (currentIndex: number, itemIndex: number): number => {
  const distance = itemIndex - currentIndex
  if (distance === 0) return 0 // Center item
  if (distance === 1) return -15 // Next item (slight rotation)
  if (distance === -1) return 15 // Previous item (slight rotation)
  if (distance > 1) return -45 // Items further to the right
  if (distance < -1) return 45 // Items further to the left
  return 0
}

// Component definition
export const Component = ({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): ReactElement => {
  const containerPadding = 16
  const itemWidth = baseWidth - containerPadding * 2
  const trackItemOffset = itemWidth + GAP

  // If loop is true, a clone of the first item is added to the end for seamless transition.
  const carouselItems = loop ? [...items, items[0]] : items
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isResetting, setIsResetting] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Drag properties for framer-motion. Constraints are applied only when not looping.
  const dragProps = loop
    ? {} // No specific dragConstraints when looping, relying on state updates and onAnimationComplete for boundary handling
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      }

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current
      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          // If at the last original item and looping, go to the clone.
          if (prev === items.length - 1 && loop) {
            return prev + 1
          }
          // If at the last item (or clone if looping), loop back to start or stay.
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev
          }
          return prev + 1
        })
      }, autoplayDelay)
      return () => clearInterval(timer)
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover])

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS

  // Handles the instant jump when the animation completes on the cloned item.
  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      // If animated to the clone (which is at items.length index)
      setIsResetting(true) // Disable transition for the jump
      x.set(0) // Immediately set x position back to the first item
      setCurrentIndex(0) // Immediately set index back to the first item
      setTimeout(() => setIsResetting(false), 50) // Re-enable transitions after a brief moment
    }
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // Drag left (swipe to next item)
      if (loop && currentIndex === items.length - 1) {
        // If currently on the last original item, go to the clone
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1)) // Move to next, but not past the last
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Drag right (swipe to previous item)
      if (loop && currentIndex === 0) {
        // If currently on the first item, loop to the last original item
        setCurrentIndex(items.length - 1)
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0)) // Move to previous, but not before the first
      }
    }
  }

  const containerWidth = baseWidth * 1.4
  const centerOffset = containerWidth / 2 - (itemWidth * 1.2) / 2

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 min-h-[500px] w-full max-w-5xl mx-auto flex items-center justify-center ${
        round ? "rounded-full border border-white" : "rounded-[32px] border border-[#222]"
      }`}
      style={{
        height: round ? `${Math.min(baseWidth * 1.2, 500)}px` : "auto",
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: `${itemWidth * 1.1 * carouselItems.length + GAP * (carouselItems.length - 1)}px`,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: "50% 50%",
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{
          x:
            -(currentIndex * (itemWidth * 1.1 + GAP)) +
            (containerRef.current?.offsetWidth || containerWidth) / 2 -
            (itemWidth * 1.1) / 2 +
            (typeof window !== "undefined" ? window.innerWidth * 1.7 : 0),
        }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const scale = index === currentIndex ? 1 : 0.9
          const opacity = index === currentIndex ? 1 : 0.4

          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${
                round
                  ? "items-center justify-center text-center bg-gradient-to-br from-[#1a1a1a] to-[#060606] border-0"
                  : "items-start justify-between border border-[#333] rounded-[16px]"
              } overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl`}
              style={{
                width: itemWidth * 1.1,
                height: round ? itemWidth * 1.1 : itemWidth * 0.75,
                ...(round && { borderRadius: "50%" }),
                ...(item.backgroundImage && {
                  backgroundImage: `url(${item.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }),
              }}
              animate={{
                rotateY: 0,
                scale,
                opacity,
              }}
              transition={effectiveTransition}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 pointer-events-none" />

              <div className={`${round ? "p-0 m-0 relative z-10" : "mb-4 p-6 relative z-10"}`}>
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gradient-to-br from-[#333] to-[#060606] shadow-lg border border-[#444]">
                  <div className="scale-125">{item.icon}</div>
                </span>
              </div>

              <div className="p-6 relative z-10 flex-1 flex flex-col justify-end">
                <div className="mb-3 font-bold text-2xl text-white leading-tight tracking-tight drop-shadow-lg">
                  {item.title}
                </div>
                <p className="text-sm text-gray-200 leading-relaxed opacity-95 drop-shadow-md">{item.description}</p>

                <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-white/40 to-transparent rounded-full" />
              </div>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          )
        })}
      </motion.div>

      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20`}>
        <div className="flex gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
          {items.map((_, index) => {
            const isActive = loop
              ? currentIndex === items.length
                ? index === 0
                : currentIndex === index
              : currentIndex === index

            return (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                  isActive ? "bg-white shadow-lg" : "bg-white/30 hover:bg-white/50"
                }`}
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                onClick={() => setCurrentIndex(index)}
                transition={{ duration: 0.15 }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}