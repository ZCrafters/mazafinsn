# PRODUCT.md — Maza Finance

## What it is
A financial literacy and personal-finance platform for Indonesia. It helps young
people track spending, learn investing through games, read market news, and get
AI-assisted financial guidance — in one place.

## Who it is for
Gen Z and young millennials (18–35) in Indonesia who are starting to manage their
own money and want guidance that is clear, local, and not intimidating.

## What success looks like
- A first-time visitor understands what the product does within five seconds.
- A returning user can track money, play a finance game, and read relevant news
  without friction.
- The interface feels trustworthy and calm — this is money, not a toy.

## Surfaces and modes
| Surface | Mode | Job |
| --- | --- | --- |
| Landing `/` | Persuade | Explain the product, earn a sign-up |
| News `/news` | Read | Understand what is happening in the market |
| Games `/games`, `/games/*` | Experience | Learn by playing, earn points |
| Dashboard `/dashboard`, `/management`, `/portfolio`, `/savings-*` | Operate | Do the work of managing money |
| Points Store `/points-store` | Operate | Redeem earned points |
| AI Chat `/ai-chatbot` | Operate | Ask questions, get guidance |

## Language
Indonesian (default), English, Bahasa Melayu — all user-facing copy is translatable.

## Constraints
- Next.js 14 App Router + TypeScript + Tailwind + Radix/shadcn.
- Keep the existing sage brand identity and the existing functionality.
- Light and dark mode both supported.
- No backend/auth changes are part of visual work.

## Non-goals
- Redesigning data models, APIs, or business logic.
- Adding new product features during visual work.
