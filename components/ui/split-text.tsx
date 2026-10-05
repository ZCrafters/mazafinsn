"use client"

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    rotate?: number
  }
  to?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    rotate?: number
  }
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right'
  onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedCount, setAnimatedCount] = useState(0)

  const splitText = (text: string, type: 'chars' | 'words' | 'lines') => {
    switch (type) {
      case 'chars':
        return text.split('').map((char, index) => ({
          content: char === ' ' ? '\u00A0' : char,
          index
        }))
      case 'words':
        return text.split(' ').map((word, index) => ({
          content: word,
          index
        }))
      case 'lines':
        return text.split('\n').map((line, index) => ({
          content: line,
          index
        }))
      default:
        return []
    }
  }

  const textParts = splitText(text, splitType)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    if (animatedCount === textParts.length && onLetterAnimationComplete) {
      onLetterAnimationComplete()
    }
  }, [animatedCount, textParts.length, onLetterAnimationComplete])

  const getTransformStyle = (index: number, isAnimated: boolean) => {
    const baseDelay = index * delay
    const fromStyles = from
    const toStyles = to

    if (!isAnimated) {
      return {
        opacity: fromStyles.opacity ?? 1,
        transform: `
          translateX(${fromStyles.x ?? 0}px)
          translateY(${fromStyles.y ?? 0}px)
          scale(${fromStyles.scale ?? 1})
          rotate(${fromStyles.rotate ?? 0}deg)
        `,
        transition: 'none'
      }
    }

    return {
      opacity: toStyles.opacity ?? 1,
      transform: `
        translateX(${toStyles.x ?? 0}px)
        translateY(${toStyles.y ?? 0}px)
        scale(${toStyles.scale ?? 1})
        rotate(${toStyles.rotate ?? 0}deg)
      `,
      transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay}ms`,
      transitionDelay: `${baseDelay}ms`
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('inline-block', className)}
      style={{ textAlign }}
    >
      {textParts.map((part, index) => (
        <span
          key={index}
          className="inline-block"
          style={getTransformStyle(index, isVisible)}
          onTransitionEnd={() => {
            if (isVisible) {
              setAnimatedCount(prev => prev + 1)
            }
          }}
        >
          {part.content}
        </span>
      ))}
    </div>
  )
}

export default SplitText