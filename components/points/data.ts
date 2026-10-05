import {
  Wallet,
  Star,
  Smartphone,
  Gamepad2,
  Play,
  Gift,
  type LucideIcon,
} from "lucide-react"

export const categoryIcons: Record<string, LucideIcon> = {
  banking: Wallet,
  subscription: Star,
  ewallet: Smartphone,
  mobile: Smartphone,
  game: Gamepad2,
  streaming: Play,
}

export function getTypeIcon(type: string): LucideIcon {
  return categoryIcons[type] || Gift
}

export function formatPoints(points: number): string {
  return points.toLocaleString("id-ID")
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
