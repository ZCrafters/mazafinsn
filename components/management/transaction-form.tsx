"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { Plus, Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";

const categories = [
  { value: "gaji", label: "💰 Gaji", emoji: "💰" },
  { value: "investasi", label: "📈 Investasi", emoji: "📈" },
  { value: "pangan", label: "🍽️ Pangan", emoji: "🍽️" },
  { value: "lain-lain", label: "✨ Lain-lain", emoji: "✨" },
  { value: "pengeluaran", label: "💸 Pengeluaran", emoji: "💸" },
  { value: "makanan-minuman", label: "🍔 Makanan & Minuman", emoji: "🍔" },
  { value: "transportasi", label: "🚗 Transportasi", emoji: "🚗" },
  {
    value: "tagihan",
    label: "💡 Tagihan (Listrik, Air, Internet)",
    emoji: "💡",
  },
  { value: "hiburan", label: "🎬 Hiburan", emoji: "🎬" },
  { value: "pendidikan", label: "🎓 Pendidikan", emoji: "🎓" },
  { value: "kesehatan", label: "🏥 Kesehatan", emoji: "🏥" },
  { value: "belanja", label: "🛍️ Belanja", emoji: "🛍️" },
  { value: "lain-lain-expense", label: "✨ Lain-lain", emoji: "✨" },
];

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTransactionAdded: () => void;
}

export default function TransactionForm({
  isOpen,
  onClose,
  onTransactionAdded,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // Insert transaction
      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        amount: Number.parseFloat(formData.amount),
        date: formData.date,
      });

      if (error) throw error;

      // Reset form
      setFormData({
        type: "expense",
        category: "",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });

      onTransactionAdded();
      onClose();
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) => {
    if (formData.type === "income") {
      return ["gaji", "investasi", "lain-lain"].includes(cat.value);
    } else {
      return !["gaji", "investasi"].includes(cat.value);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card text-foreground border-border">
        <DialogHeader className="pb-3 border-b border-border/60">
          <DialogTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Plus className="w-3.5 h-3.5" />
            </div>
            Catat Transaksi Baru
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Tambahkan mutasi pemasukan atau pengeluaran ke basis data akun
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Tanggal */}
          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-xs font-medium text-foreground">
              Tanggal
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="bg-background border-border text-foreground h-9 text-xs sm:text-sm font-mono"
              required
            />
          </div>

          {/* Tipe */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">
              Tipe Transaksi
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={formData.type === "income" ? "default" : "outline"}
                onClick={() =>
                  setFormData({ ...formData, type: "income", category: "" })
                }
                className={`h-9 text-xs font-medium ${
                  formData.type === "income"
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                Pemasukan
              </Button>
              <Button
                type="button"
                variant={formData.type === "expense" ? "default" : "outline"}
                onClick={() =>
                  setFormData({ ...formData, type: "expense", category: "" })
                }
                className={`h-9 text-xs font-medium ${
                  formData.type === "expense"
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                <ArrowDownRight className="w-3.5 h-3.5 mr-1" />
                Pengeluaran
              </Button>
            </div>
          </div>

          {/* Kategori */}
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
              <SelectTrigger className="bg-background border-border text-foreground h-9 text-xs sm:text-sm">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border max-h-60">
                {filteredCategories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-xs sm:text-sm"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Deskripsi */}
          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-xs font-medium text-foreground"
            >
              Keterangan
            </Label>
            <Textarea
              id="description"
              placeholder="Contoh: Makan siang bersama, tagihan air"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[70px] text-xs sm:text-sm resize-none"
              required
            />
          </div>

          {/* Jumlah */}
          <div className="space-y-1.5">
            <Label
              htmlFor="amount"
              className="text-xs font-medium text-foreground"
            >
              Nominal (IDR)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="bg-background border-border text-foreground h-9 text-xs sm:text-sm font-mono tabular-nums"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Footer */}
          <DialogFooter className="gap-2 pt-4 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground h-9 text-xs flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-xs font-medium flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Simpan Transaksi
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
