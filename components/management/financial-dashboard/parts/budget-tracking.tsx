"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart as PieChartIcon, Plus } from "lucide-react";
import { formatCurrency } from "../data";
import { BudgetCategory } from "../types";

interface BudgetTrackingProps {
  budgetCategories: BudgetCategory[];
  onOpenAddBudget: () => void;
}

export function BudgetTracking({ budgetCategories, onOpenAddBudget }: BudgetTrackingProps) {
  return (
    <Card className="border border-border bg-card shadow-sm mb-6">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <PieChartIcon className="w-4 h-4" />
              </div>
              Alokasi & Pemantauan Budget
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Pantau batas pengeluaran berdasarkan pos kategori
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={onOpenAddBudget}
            className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[36px]"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tambah Pos
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {budgetCategories.length === 0 ? (
          <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
              <PieChartIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Belum ada kategori budget
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Mulai atur pos alokasi bulanan agar pengeluaran tetap terkontrol
            </p>
            <Button
              onClick={onOpenAddBudget}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Tambah Budget
            </Button>
          </div>
        ) : (
          budgetCategories.map((category, index) => {
            const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
            const isOverBudget = percentage > 100;

            return (
              <div
                key={index}
                className="p-3.5 bg-background rounded-lg border border-border/70 space-y-2 hover:border-border transition-colors"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">
                    {category.name}
                  </span>
                  <div className="text-right font-mono tabular-nums text-xs">
                    <span
                      className={`font-semibold ${
                        isOverBudget ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {formatCurrency(category.spent)}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {formatCurrency(category.budget)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress
                    value={Math.min(percentage, 100)}
                    className="flex-1 h-2"
                  />
                  <Badge
                    variant={isOverBudget ? "destructive" : "secondary"}
                    className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5"
                  >
                    {percentage.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
