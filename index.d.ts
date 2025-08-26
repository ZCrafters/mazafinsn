// Global type declarations for Maza Finance Next.js application

declare module '@/lib/financial-data' {
  export interface FinancialData {
    [key: string]: any;
  }
  export class FinancialDataService {
    static getStockPrice(symbol: string): Promise<any>;
    static getCurrencyRate(from: string, to: string): Promise<any>;
    static getMarketNews(limit?: number): Promise<any[]>;
    static getPortfolioAnalysis(userId: string): Promise<any>;
  }
}

declare module '@/components/ui/*' {
  const Component: React.ComponentType<any>;
  export default Component;
}

// Fix for AI library compatibility
declare module 'openai/lib/AssistantStream' {
  export class AssistantStream {
    [key: string]: any;
  }
}

declare module 'openai/resources/beta/threads/runs/runs' {
  export interface Run {
    [key: string]: any;
  }
}

declare module 'openai/resources/beta/threads/runs' {
  export interface AssistantStream {
    [key: string]: any;
  }
  export interface ThreadRuns {
    [key: string]: any;
  }
}

// Global CSS modules
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    DEEPSEEK_API_KEY: string;
    DEEPSEEK_BASE_URL: string;
    GROQ_API_KEY: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}