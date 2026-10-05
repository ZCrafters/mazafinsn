"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Badge } from "../ui/badge"
import GameTile from "./game-tile"

interface HelpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border text-card-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg text-foreground">
            Cara Bermain FinanceWordle
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-sans">
            Tebak istilah finansial rahasia dalam jumlah percobaan yang ditentukan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2 font-sans text-xs md:text-sm">
          <div>
            <h4 className="font-semibold text-foreground mb-1.5 uppercase tracking-wider text-xs">
              Aturan Permainan:
            </h4>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Setiap tebakan harus berupa istilah finansial yang valid</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Anda memiliki 5–7 percobaan tergantung panjang kata</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-primary font-bold">•</span>
                <span>Warna huruf akan berubah setelah setiap tebakan</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2.5 uppercase tracking-wider text-xs">
              Panduan Warna:
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 bg-muted/30 border border-border p-2 rounded-xl">
                <GameTile letter="B" state="correct" />
                <div className="text-xs text-foreground">
                  <Badge variant="outline" className="bg-primary text-primary-foreground border-primary mr-2 text-[10px] font-mono">
                    Hijau
                  </Badge>
                  Huruf ada dalam kata dan di posisi yang tepat
                </div>
              </div>

              <div className="flex items-center gap-3 bg-muted/30 border border-border p-2 rounded-xl">
                <GameTile letter="A" state="present" />
                <div className="text-xs text-foreground">
                  <Badge variant="outline" className="bg-amber-500 text-white border-amber-500 mr-2 text-[10px] font-mono">
                    Kuning
                  </Badge>
                  Huruf ada dalam kata namun di posisi yang salah
                </div>
              </div>

              <div className="flex items-center gap-3 bg-muted/30 border border-border p-2 rounded-xl">
                <GameTile letter="X" state="absent" />
                <div className="text-xs text-foreground">
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-border mr-2 text-[10px] font-mono">
                    Abu-abu
                  </Badge>
                  Huruf tidak terdapat dalam kata
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/40 border border-border p-3 rounded-xl">
            <h4 className="font-semibold text-foreground mb-1 text-xs uppercase tracking-wider">
              Kategori Kata:
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Semua kata berhubungan dengan keuangan, investasi, perbankan, ekonomi, pasar modal, dan fintech.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
