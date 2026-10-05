 # Maza Finance - Financial Web Application

A comprehensive Next.js-based financial literacy and management platform designed for the Indonesian market.

## 🚀 Features

- **Financial Dashboard**: Track expenses, investments, and financial goals
- **AI Financial Assistant**: Real-time financial advice with market data integration
- **Gamified Learning**: Interactive financial games and challenges
- **Portfolio Management**: Investment tracking with detailed analytics
- **Savings Goals**: Set and track financial objectives
- **Real-time Data**: Live stock prices, currency rates, and market news
- **Indonesian Market Focus**: Localized content and IDR currency support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Radix UI components with Tailwind CSS
- **Data**: Dummy local database (localStorage) + mock financial data
- **AI Integration**: Google Gemini API for AI chat functionality
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Styling**: Custom design system with sage green theme

## 📋 Prerequisites

- Node.js 18+
- npm or pnpm
- Google Gemini API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mazafinsn
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

   Data disimpan lokal (localStorage) — tidak perlu setup database.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── games/            # Financial games
│   ├── portfolio/        # Portfolio management
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── games/           # Game components
│   └── ...
├── lib/                  # Utility libraries
│   ├── supabase/        # Dummy local data client (pengganti Supabase)
│   └── financial-data.ts # Financial data service
├── hooks/               # Custom React hooks
├── scripts/            # Database setup scripts
└── public/            # Static assets
```

## 🎮 Key Components

### Financial Dashboard
- Real-time portfolio tracking
- Expense analytics with interactive charts
- Financial projections and goal setting
- QR payment integration

### AI Financial Assistant
- Real-time stock prices and market data
- Currency exchange rates
- Portfolio analysis and investment advice
- Indonesian market insights
- Markdown-formatted responses

### Gamified Learning
- Budget Master Challenge
- Investment Simulator
- Debt Destroyer
- Crypto Quest
- Financial Quiz Arena
- Achievement system with progress tracking

## 🗄️ Data Layer (Dummy)

Sementara ini semua data disimpan lokal lewat `lib/supabase/client.ts`
(dummy client berbasis localStorage, aman saat build/prerender):

- `savings_goals` - Tabungan (seed + CRUD lokal)
- `transactions` - Transaksi & investasi (seed + insert lokal)
- `chat_conversations` & `chat_messages` - Riwayat chat AI
- `financial_profiles` - Profil risiko pengguna

Saat backend asli dibutuhkan, cukup ganti isi dummy client dengan
klien database sungguhan — 7 file pemakai tidak perlu diubah.

## 🎨 Styling

The application uses a custom design system with:
- Sage green primary color palette (#658657)
- Professional gradients and animations
- Responsive design with mobile-first approach
- Custom Aurora background effects
- Interactive hover states and transitions

## 🌐 API Integration

### Financial Data Service
- Mock financial data for development
- Stock price simulation
- Currency rate calculations
- Market news generation
- Portfolio analysis

### AI Chat API
- Google Gemini API integration for intelligent responses
- Real-time financial data processing
- Indonesian language support
- Comprehensive financial system prompts

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Self-hosted

3. **Set up production environment variables**
   Configure the same environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the database setup scripts

## 🔄 Recent Fixes

- ✅ Fixed TypeScript configuration and missing type declarations
- ✅ Resolved duplicate CSS files and Tailwind configuration
- ✅ Fixed database schema conflicts in savings goals tables
- ✅ Removed console.log statements from production code
- ✅ Updated component imports and export names
- ✅ Created proper environment variable examples
- ✅ Fixed duplicate hook files and import paths
- ✅ **Updated AI integration to use Google Gemini API**

---

**Maza Finance** - "Kuasai Uangmu, Kuasai Masa Depanmu" (Master Your Money, Master Your Future)