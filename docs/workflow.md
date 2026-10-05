# Workflow — Redesign Maza Finance (T1–T34)

Alur eksekusi kanonik. Batch 1 = prioritas (fondasi + Home + Dashboard + Games).
Batch 2 = backlog (Management, halaman lain, kualitas). Setiap task: kerjakan →
`npm run type-check` hijau → lanjut. Setelah tiap batch: gate verifikasi penuh.

## Dependencies (kunci)
- T1–T5 (fondasi) mendahului semua tugas visual. Jangan UI baru sebelum token/font/ikon siap.
- T6–T7 (shell) sebelum T8–T14 (halaman) agar header/footer konsisten.
- T12–T13 membutuhkan T2 (token) + T5 (primitif).
- Semua split (T16+) butuh DESIGN.md (T1) sebagai acuan pola `parts/`.

## Batch 1 — Prioritas (T1–T15)
| # | Task | Verifikasi | Status |
|---|---|---|---|
| 1 | `PRODUCT.md` + `DESIGN.md` | dokumen ada, konsisten | done |
| 2 | Token & tema (globals.css, tailwind) | light+dark kontras AA | done |
| 3 | Tipografi PJS + Outfit + JetBrains Mono | type-check | done |
| 4 | Ikon → lucide; hapus emoji UI | grep react-icons/emoji kosong | done |
| 5 | Primitif UI (button/card/badge/input/progress) | lint | done |
| 6 | Header (active-nav, accent) | type-check | done |
| 7 | Footer (ringkas) | type-check | done |
| 8 | Homepage hero asimetris | type-check | done |
| 9 | financial-problems split + light | lint (JSX→.tsx) | done |
| 10 | how-it-works restrained | type-check | done |
| 11 | gamification split + hapus FaultyTerminal + app/page | grep FaultyTerminal kosong | done |
| 12 | Dashboard hero + page (light) | type-check | done |
| 13 | Dashboard features + projections | type-check | done |
| 14 | Games content split | type-check | done |
| 15 | **Gate Batch 1**: lint + type-check + build + audit kontras light/dark + responsive | semua hijau | done |

## Batch 2 — Backlog (T16–T34)
| # | Task | Status |
|---|---|---|
| 16 | Chatbot trio: `floating-ai-chatbot`, `enhanced-bubble-chatbot`, `dashboard/ai-chatbot` restyle + split | done |
| 17 | `dashboard/qr-payment` (sudah di-light-kan; verifikasi + polish) | done |
| 18 | `points/points-dashboard` (sudah di-light-kan) + `points/points-store` (476) split | done |
| 19 | `games/quiz/quiz-game.tsx` (292) split → `Setup/Question/Result` | done |
| 20 | Wordle (`components/wordle/*`) restyle ke token baru | done |
| 21 | `management/financial-dashboard.tsx` (1383) split + restyle | pending |
| 22 | `management/enhanced-financial-dashboard.tsx` (1219) split + restyle | pending |
| 23 | `management/ai-portfolio-analysis.tsx` (1049) split + restyle | pending |
| 24 | `management/transaction-manager.tsx` (562) + `transaction-form.tsx` (269) split | pending |
| 25 | `management/risk-analysis-form.tsx` (197) + `enhanced-ai-chatbot.tsx` (577) split | pending |
| 26 | `app/management/page.tsx` compose + i18n | pending |
| 27 | `/portfolio`, `/savings-goals`, `/savings-tracker` restyle (+ wrapper server untuk metadata bila perlu) | pending |
| 28 | `/news` komponen (hero/content/newsletter) → sistem baru | pending |
| 29 | `/points-store` + `/ai-chatbot` page restyle | pending |
| 30 | Pass i18n menyeluruh (key hilang, plural, konsistensi) | pending |
| 31 | Loading / empty / error states (skeleton, empty-state, inline error) | pending |
| 32 | Responsive + touch-target ≥44px audit | pending |
| 33 | Aksesibilitas: skip-link, focus ring, aria-current, alt text | pending |
| 34 | **Gate akhir**: lint + type-check + build + audit kontras (light/dark × id/en/ms) + smoke semua route | pending |

## Gate verifikasi (definisi selesai)
1. `npm run lint` → tanpa error/warning.
2. `npm run type-check` → tanpa error.
3. `npm run build` → sukses (strict, tanpa `ignoreBuildErrors`).
4. Audit kontras: pasangan teks/latar solid ≥ 4.5:1 (body), ≥ 3:1 (besar), di light & dark.
5. Smoke: semua route 200; aksi inti tiap halaman tetap jalan (simpan transaksi, kirim chat, main quiz, muat news).
6. Tidak ada emoji baru, `text-gray-*` baru, `bg-black`/`bg-white` baru, neon gradient baru.

## Rollback
- Perubahan visual murni = reversibel via git. Split komponen: pertahankan export default & path import agar tidak patah.
- Sebelum split file besar: catat ekspor & pemanggilnya (grep), lalu pindah bertahap.
- Bila satu task gagal 2×, berhenti dan tanya arsitektur (jangan paksa 3× fix).

## Prinsip eksekusi
- Presentasi dulu, logika belakangan: pecah file tanpa mengubah perilaku.
- Satu task = satu fokus; tidak ada refactor "sambil lalu".
- Update `DESIGN.md` bila keputusan visual berubah.