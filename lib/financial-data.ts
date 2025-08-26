export interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
}

export interface CurrencyRate {
  from: string
  to: string
  rate: number
  lastUpdated: string
}

export interface MarketNews {
  title: string
  summary: string
  source: string
  publishedAt: string
  sentiment: "positive" | "negative" | "neutral"
}

// Mock financial data service - replace with real API
export class FinancialDataService {
  static async getStockPrice(symbol: string): Promise<StockData> {
    // Simulate API call with realistic data
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockData: Record<string, StockData> = {
      AAPL: { symbol: "AAPL", price: 175.43, change: 2.15, changePercent: 1.24, volume: 45678900 },
      GOOGL: { symbol: "GOOGL", price: 142.87, change: -1.23, changePercent: -0.85, volume: 23456789 },
      MSFT: { symbol: "MSFT", price: 378.91, change: 4.56, changePercent: 1.22, volume: 34567890 },
      TSLA: { symbol: "TSLA", price: 248.73, change: -5.67, changePercent: -2.23, volume: 56789012 },
      BBRI: { symbol: "BBRI", price: 4850, change: 50, changePercent: 1.04, volume: 12345678 },
      BBCA: { symbol: "BBCA", price: 8750, change: -25, changePercent: -0.28, volume: 9876543 },
    }

    return (
      mockData[symbol.toUpperCase()] || {
        symbol: symbol.toUpperCase(),
        price: Math.random() * 100 + 50,
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 50000000),
      }
    )
  }

  static async getCurrencyRate(from: string, to: string): Promise<CurrencyRate> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const rates: Record<string, number> = {
      "USD-IDR": 15750,
      "EUR-IDR": 17200,
      "JPY-IDR": 105,
      "SGD-IDR": 11650,
      "USD-EUR": 0.92,
      "USD-JPY": 150.25,
    }

    const key = `${from.toUpperCase()}-${to.toUpperCase()}`
    const reverseKey = `${to.toUpperCase()}-${from.toUpperCase()}`

    let rate = rates[key]
    if (!rate && rates[reverseKey]) {
      rate = 1 / rates[reverseKey]
    }
    if (!rate) {
      rate = Math.random() * 20 + 1
    }

    return {
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      rate,
      lastUpdated: new Date().toISOString(),
    }
  }

  static async getMarketNews(limit = 5): Promise<MarketNews[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const mockNews: MarketNews[] = [
      {
        title: "Indonesian Banking Sector Shows Strong Growth",
        summary: "Major Indonesian banks report increased lending and improved asset quality in Q3 2024.",
        source: "Jakarta Post",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
      {
        title: "Rupiah Strengthens Against Dollar",
        summary: "Indonesian Rupiah gains ground as foreign investment flows increase.",
        source: "Reuters",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
      {
        title: "Tech Stocks Face Volatility",
        summary: "Global technology stocks experience mixed performance amid regulatory concerns.",
        source: "Bloomberg",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        sentiment: "neutral",
      },
      {
        title: "Inflation Concerns Impact Markets",
        summary: "Rising inflation expectations create uncertainty in emerging markets.",
        source: "Financial Times",
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        sentiment: "negative",
      },
      {
        title: "Green Bonds Gain Popularity",
        summary: "Sustainable investment options attract more institutional investors.",
        source: "Wall Street Journal",
        publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        sentiment: "positive",
      },
    ]

    return mockNews.slice(0, limit)
  }

  static async getPortfolioAnalysis(userId: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
      totalValue: 125000000, // IDR
      dayChange: 2500000,
      dayChangePercent: 2.04,
      allocation: {
        stocks: 60,
        bonds: 25,
        cash: 10,
        crypto: 5,
      },
      topHoldings: [
        { symbol: "BBRI", value: 25000000, weight: 20 },
        { symbol: "BBCA", value: 20000000, weight: 16 },
        { symbol: "TLKM", value: 15000000, weight: 12 },
      ],
    }
  }
}
