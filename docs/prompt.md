# Prompts — Redesign Maza Finance

Kumpulan prompt untuk orkestrasi. Mulai dari master prompt, lalu template task card
untuk dispatch subagent per task (T1–T34). Semua prompt mengacu `docs/context.md`
untuk konteks dan `docs/workflow.md` untuk urutan.

## 1. Master prompt (program penuh)

```
Kamu memimpin redesign visual "Maza Finance" (Next 14 App Router, Tailwind v3,
shadcn). Sumber kebenaran: docs/context.md (konteks), DESIGN.md (aturan visual),
PRODUCT.md (tujuan), docs/workflow.md (urutan & gate).

Instruksi global:
- Fokus visual + pemecahan file. JANGAN ubah logika/state/handler/API/localStorage.
- Ikuti DESIGN.md: 1 accent sage (#2E8B57 / dark #85a37a), neutrals sage-tinted,
  font display=PJS, body=Outfit, angka=JetBrains Mono + tabular-nums.
- DILARANG: emoji, pure black, neon/purple-pink gradient, gradient-teks besar,
  text-gray-*, 3-kartu-sama-rata tanpa offset, h-screen, hardcode string (pakai t()).
- i18n id/en/ms selalu lengkap.
- Tiap task: kerjakan, jalankan `npm run type-check` (dan lint untuk file baru),
  lapor sesuai format di docs/agent.md.
- Kerjakan berurutan per docs/workflow.md; jangan lompat dependency.
```

## 2. Template task card (dispatch subagent)

```
Task <ID>: <judul>
Konteks: baca docs/context.md dulu (stack, tokens, gotchas).
File target: <paths>
Objective: <1–3 kalimat hasil akhir yang diharapkan>
Dilarang: <hal khusus file ini — mis. jangan ubah state `earnPoints`>
Pola: <mis. split → parts/*.tsx + data.tsx; token → text-foreground dll>
Verifikasi: jalankan `npm run type-check`; lapor lint/type + file + perilaku yang dipertahankan.
Kembalikan: format laporan di docs/agent.md.
```

## 3. Template task card — split komponen berat

```
Task <ID>: split <file> (<N> baris)
Konteks: docs/context.md → "Pola split".
Target: <file> → components/<area>/<name>/{index.tsx, parts/*.tsx, data.ts(x), types.ts}
Objective: pecah menjadi subkomponen presentasional + data, tanpa mengubah perilaku,
  ekspor, atau path impor dari pemanggil.
Langkah:
  1. grep pemanggil & ekspor file ini.
  2. Ekstrak data statis ke data.ts(x); array/konfigurasi jangan di-duplikasi.
  3. Ekstrak blok JSX besar ke parts/*.tsx (terima props eksplisit).
  4. index.tsx menyusun ulang; state/handler TETAP di index.
Dilarang: mengubah logika, menambah state baru, mengubah props yang dipakai pemanggil.
Verifikasi: npm run type-check + grep pastikan pemanggil lama masih valid.
```

## 4. Template task card — restyle section

```
Task <ID>: restyle <section>
Konteks: docs/context.md; DESIGN.md §2 (token) & §4 (komponen) & §7 (banned).
Target: <file>
Objective: samakan section ke sistem baru — surface bg-background/bg-muted/band sage
  yang disengaja; 1 accent sage; teks token; angka font-mono tabular-nums; asimetris;
  hover/active state; tanpa emoji/neon.
Dilarang: mengubah data, handler, API call.
Catatan: bila section semula bg-black/gray-900, konversi ke token (light) atau band
  gelap "vault" yang disengaja (bukan random).
Verifikasi: npm run type-check; cek kontras teks/latar solid ≥ 4.5:1 (light+dark).
```

## 5. Template task card — i18n

```
Task <ID>: i18n <area>
Konteks: lib/language-context.tsx (kamus id/en/ms), namespace per area.
Target: <file>
Objective: pindahkan semua string user-facing ke t(key); tambahkan key ke id, en, ms.
Dilarang: mengubah kunci yang sudah dipakai tempat lain; mengubah struktur data kategori.
Verifikasi: npm run type-check + grep pastikan tidak ada string hardcoded baru di JSX.
```

## 6. Contoh pemakaian — dispatch T21

```
Task 21: split management/financial-dashboard.tsx (1383 baris)
Konteks: docs/context.md → pola split + gotchas (emoji kategori).
Target: components/management/financial-dashboard.tsx
Objective: pecah jadi parts/ (SummaryCard, ChartCard, TransactionTable, dst) + data.ts,
  tanpa mengubah perilaku/state/handler; ekspor & path pemanggil tetap.
Langkah: grep pemanggil → ekstrak data → ekstrak parts → index.tsx menyusun.
Dilarang: ubah lib/points-system.ts, ubah API call, tambah dependency.
Verifikasi: npm run type-check; pastikan app/management/page.tsx masih valid.
```

## 7. Prompt gate verifikasi (akhir batch)

```
Jalankan gate Batch: npm run lint → npm run type-check → npm run build.
Lalu audit: buka halaman utama di light & dark (browser), hitung kontras pasangan
teks/latar solid (WCAG: 4.5 body / 3 besar). Cek responsive 375/768/1440 (tidak ada
overflow horizontal). Smoke semua route (200). Laporkan tabel Severity/Lokasi/Why.
Block bila ada HIGH tersisa.
```

## 8. Prompt user-context (bila main session perlu)

```
Jawab singkat: (1) scope — task mana yang masuk batch ini? (2) prioritas bila tidak
semua dikerjakan. (3) adakah batasan brand (font/akcent) yang tak boleh berubah?
Gunakan jawaban untuk mengunci task di docs/workflow.md sebelum eksekusi.
```