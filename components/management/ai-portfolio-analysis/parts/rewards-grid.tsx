"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Award } from "lucide-react";
import { Reward } from "../types";

interface RewardsGridProps {
  rewards: Reward[];
}

export function RewardsGrid({ rewards }: RewardsGridProps) {
  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Gift className="w-3.5 h-3.5" />
          </div>
          Sistem Penghargaan & Pencapaian
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Buka lencana kehormatan keuangan berdasarkan konsistensi catatan finansial Anda
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-xl border text-center space-y-2 transition-colors ${
                reward.unlocked
                  ? "bg-primary/5 border-primary/30"
                  : "bg-muted/30 border-border opacity-70"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mx-auto text-xl shadow-xs">
                {reward.icon}
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-foreground">
                  {reward.title}
                </h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {reward.description}
                </p>
              </div>

              <div className="pt-1">
                <Badge
                  variant={reward.unlocked ? "default" : "secondary"}
                  className={`text-[10px] font-mono tabular-nums ${
                    reward.unlocked ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {reward.unlocked ? "Terbuka" : `${reward.points} poin`}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
