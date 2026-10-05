# Context — Maza Finance Redesign

Ringkas, untuk onboard agent ke proyek ini tanpa baca seluruh repo.

## Stack
- Next.js 14 App Router + TypeScript, Tailwind v3 (`tailwind.config.js`), Radix/shadcn (`components/ui/*`).
- Motion: framer-motion, animejs, gsap. 3D: three + @react-three/fiber@8 + drei + @shadergradient/react.
- Data: **dummy client** `lib/supabase/client.ts` (localStorage + seed, pengganti Supabase, aman saat prerender), localStorage (poin, game), mock (`lib/financial-data.ts`).
- API routes: `/api/chat`, `/api/news`, `/api/quiz`, `/api/analyze-portfolio`, `/api/analyze-risk-profile`.

## Sumber kebenaran desain
- `DESIGN.md` — aturan visual (atmosfer, token, tipografi, komponen, layout, motion, anti-patterns). WAJIB dipatuhi.
- `PRODUCT.md` — target pengguna, mode tiap surface, non-goal.
- **Baca DESIGN.md sebelum menyentuh UI apa pun.**

## Desain (ringkas)
- Accent tunggal: sage (`#2E8B57`; dark `#85a37a`). Neutrals sage-tinted. Tidak ada pure black, neon, gradient-teks besar, emoji.
- Font: `Plus Jakarta Sans` (display, `font-display`), `Outfit` (body, `font-sans`), `JetBrains Mono` (angka, `font-mono` + `tabular-nums`).
- Dark mode: class-based (`next-themes`). Semua teks pakai token (`text-foreground`, `text-muted-foreground`), bukan `text-gray-*`.
- Layout: asimetris, max-width container (~1200px), `min-h-[100dvh]`, grid CSS, bukan 3-kartu-sama-rata.

## i18n
- `lib/language-context.tsx` — kamus `id`/`en`/`ms`, fungsi `t(key)`, namespace (`header.*`, `news.*`, `games.*`, dst).
- Hanya client component yang bisa pakai `useLanguage()`. Jangan hardcode string user-facing; tambahkan key ke ketiga bahasa.

## File yang TIDAK BOLEH diubah logikanya
- `lib/points-system.ts`, `lib/financial-data.ts`, `lib/wordle-game.ts`, `lib/daily-game.ts`, `lib/games/quiz.ts`, `lib/news/*`.
- `app/api/*` (hanya boleh ubah respons/konten bila task eksplisit).
- Hook, state, handler, props, struktur data — PRESENTASI saja boleh berubah.

## Gotchas
1. `app/portfolio/page.tsx` & `app/savings-tracker/page.tsx` adalah **client pages** → tidak bisa `export const metadata` (pakai default layout).
2. Emoji dipakai sebagai **data** kategori: `components/management/{transaction-form,transaction-manager,enhanced-financial-dashboard}.tsx` menyimpan `icon`/`label` ber-emoji. Ubah bersama konsisten di semua pemakaian & data tersimpan.
3. `app/portfolio/page.tsx` query `.eq("category","📈 Investasi")` — seed dummy di `lib/supabase/client.ts` harus memakai string kategori itu persis.
4. `next/font/google` Next 14 **tidak** punya `Geist`/`Geist_Mono` → pakai `Outfit` + `JetBrains Mono`.
5. `/games` membawa bundle 3D (shader). Gunakan `dynamic(() => import(...), { ssr:false })` + scrim di atasnya.
6. Tombol brand harus selalu `text-white` saat `bg-[#2E8B57]`/`bg-sage-600` (independen tema).
7. Toolbar verifikasi: `npm run lint` → `npm run type-check` → `npm run build` (build strict, `next.config.mjs` tanpa ignore).

## Peta file berat (untuk dipecah)
| File | Baris | Arah split |
|---|---|---|
| `components/management/financial-dashboard.tsx` | 1383 | `parts/` per kartu/seksi + `data.ts` |
| `components/management/enhanced-financial-dashboard.tsx` | 1219 | `parts/` per tab/seksi + `data.ts` |
| `components/management/ai-portfolio-analysis.tsx` | 1049 | `parts/` + `data.ts` |
| `components/management/enhanced-ai-chatbot.tsx` | 577 | `parts/` (bubble, toolbar) + prompt.ts |
| `components/management/transaction-manager.tsx` | 562 | `TransactionList`, `SummaryCard`, `data.ts` |
| `components/points/points-store.tsx` | 476 | `VoucherCard`, `TopUpGrid`, `HistoryList`, `data.ts` |
| `components/dashboard/ai-chatbot.tsx` | 449 | `MessageBubble`, `QuickQuestions`, `ChatInput` |
| `components/games/content.tsx` | 383 | Sudah dipecah (T14) |
| `components/enhanced-bubble-chatbot.tsx` | 355 | `MessageBubble`, `QuickQuestions`, `ChatInput` |

## Pola split (standar)
```
components/<area>/<name>/
  index.tsx        # komposisi utama (export default)
  parts/*.tsx      # subkomponen presentasional
  data.ts(x)       # data statis (pakai .tsx bila ada JSX)
  types.ts         # type lokal bila perlu
```
Aturan: impor logika (`lib/*`) hanya di `index.tsx` atau `parts/` sesuai tanggung jawab; jangan duplikasi state.