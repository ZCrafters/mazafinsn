"use client"

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <div className="aurora-blob absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sage-400/30 to-accent-400/30 rounded-full blur-3xl"></div>
      <div className="aurora-blob absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-500/20 to-sage-500/20 rounded-full blur-3xl"></div>
      <div className="aurora-blob absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-sage-300/25 to-accent-300/25 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  )
}
