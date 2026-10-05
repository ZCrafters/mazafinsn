"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { categories } from "../data";
import { TransactionFormData } from "../types";

interface TransactionEntryFormProps {
  formData: TransactionFormData;
  setFormData: (data: TransactionFormData) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function TransactionEntryForm({
  formData,
  setFormData,
  isCalendarOpen,
  setIsCalendarOpen,
  handleSubmit,
}: TransactionEntryFormProps) {
  const currentCategories = categories[formData.type];

  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Plus className="w-3.5 h-3.5" />
          </div>
          Catat Transaksi Baru
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Masukkan mutasi arus kas secara manual ke dalam sistem
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Date and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Tanggal Transaksi
              </Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-border h-10 text-xs sm:text-sm bg-background"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {format(formData.date, "dd MMMM yyyy", { locale: id })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        setFormData({ ...formData, date });
                        setIsCalendarOpen(false);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Type Switcher */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Arus Kas
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={formData.type === "income" ? "default" : "outline"}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      type: "income",
                      category: "",
                    })
                  }
                  className={`h-10 text-xs font-medium ${
                    formData.type === "income"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  Pendapatan
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "expense" ? "default" : "outline"}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      type: "expense",
                      category: "",
                    })
                  }
                  className={`h-10 text-xs font-medium ${
                    formData.type === "expense"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <TrendingDown className="w-3.5 h-3.5 mr-1.5" />
                  Pengeluaran
                </Button>
              </div>
            </div>
          </div>

          {/* Row 2: Category and Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Kategori
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="border-border h-10 text-xs sm:text-sm bg-background">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {currentCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="text-xs sm:text-sm">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Keterangan
              </Label>
              <Input
                placeholder="Contoh: Belanja bahan pokok mingguan"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border-border h-10 text-xs sm:text-sm bg-background"
              />
            </div>
          </div>

          {/* Row 3: Amount & Submit Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">
                Nominal (IDR)
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.amount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border h-10 text-xs sm:text-sm bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Simpan Transaksi
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
