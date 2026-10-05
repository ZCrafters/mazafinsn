# Agent — Roles & Guardrails

Definisi siapa mengerjakan apa, aturan main, dan kontrak laporan.

## Roster
| Agent | Dipakai untuk | Alat yang diizinkan |
|---|---|---|
| **Main session** | Orkestrasi, gate verifikasi, task kompleks | semua |
| **explore** (subagent) | Audit/research read-only: cari pemanggil, ukur file, audit kontras, cek dependensi | read/grep/glob/bash read-only |
| **general** (subagent) | Edit presentasional dalam satu task, di bawah guardrail ketat | edit/write/bash |

## Kontrak dispatch (pakai `prompt.md` → template task card)
Setiap subagent menerima: konteks (file), task objective, aturan DESAIN (ringkas), batas jangan-disentuh, dan verifikasi yang harus dijalankan sendiri sebelum lapor.

## Guardrails (TIDAK BOLEH)
1. **Mengubah logika/state/handler/API/localStorage** — hanya presentasi + pemecahan file.
2. Menyentuh `lib/points-system.ts`, `lib/financial-data.ts`, `lib/wordle-game.ts`, `lib/daily-game.ts`, `lib/games/quiz.ts`, `lib/news/*`, `app/api/*` (kecuali task eksplisit).
3. Menambah dependency tanpa persetujuan main session.
4. Emoji baru, `text-gray-*` baru, `bg-black`/`bg-white` (sebagai panel), neon/`from-purple-*`/`from-pink-*`, gradient-teks besar, `h-screen`, 3-kartu-sama-rata (tanpa offset).
5. Hardcode string user-facing — wajib `t(key)` + key di `id`/`en`/`ms`.
6. Menimpa file yang sedang dipecah tanpa grep pemanggil dulu.

## Aturan per peran
- **explore**: kembalikan ringkasan (file, baris, pemanggil, hasil), bukan dump kode. Jangan edit apa pun.
- **general**: kerjakan 1 task; jangan gabung banyak task; jalankan `npm run type-check` (dan `npm run lint` bila menyentuh .tsx baru) sebelum lapor; lapor format di bawah.

## Laporan wajib (format)
```
Task: <id> <judul>
Files: <dibuat/diubah/dihapus>
Perilaku: <hal yang dipertahankan agar tidak rusak>
Verifikasi: lint=<ok/err> type-check=<ok/err>
Catatan: <gotcha / hal untuk main session>
```

## Pembagian kerja yang disarankan (paralel aman)
- **T16 (chatbot trio)** dan **T21–T25 (management split)** bisa jalan paralel — file disjoint.
- **T19 (quiz)** dan **T20 (wordle)** disjoint — paralel aman.
- **T27–T29** disjoint — paralel aman.
- Jangan paralel task yang menyentuh file yang sama (mis. T22 & T26 sama-sama di `management/` tapi file berbeda — aman; hati-hati `enhanced-financial-dashboard` diimpor `app/management/page.tsx`).

## Garis besar kepemilikan file
- `components/header|footer|hero|how-it-works|gamification-preview|financial-problems/*` → tugas Home/shell.
- `components/dashboard/*`, `components/points/*` → tugas Dashboard.
- `components/games/*`, `components/wordle/*` → tugas Games.
- `components/management/*` → tugas Management.
- `components/{floating,enhanced-bubble,dashboard/ai}-chatbot.tsx` → T16.
- `lib/language-context.tsx` → dikelola oleh task i18n (T30) + task yang menambah key.

## Komunikasi
- Main session selalu konfirmasi scope ke user (keputusan besar) sebelum batch berubah.
- Temuan baru (kontras, dead link, file lebih berat) → laporkan, jangan fix diam-diam di luar task.
- Update `docs/*` bila workflow/agent/context berubah.