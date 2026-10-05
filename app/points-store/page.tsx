import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import PointsStore from "@/components/points/points-store"

export const metadata: Metadata = pageMetadata({
  title: "Points Store - Maza Finance",
  description: "Tukarkan poin gaming dan belajar kamu untuk voucher, top-up, dan fitur premium.",
  path: "/points-store",
})

export default function PointsStorePage() {
  return (
    <main className="min-h-screen bg-sage-50">
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Points Store</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exchange your hard-earned points for amazing rewards, vouchers, and top-ups
            </p>
          </div>
          <PointsStore />
        </div>
      </div>
    </main>
  )
}