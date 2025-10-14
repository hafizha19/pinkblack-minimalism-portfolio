import { NextResponse } from 'next/server';
import { PortfolioService } from '@/lib/services/portfolio.service';


export const revalidate = 3600;

let cache: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  try {
    const now = Date.now();
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      console.log('✅ Serving from cache');
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
      });
    }

    console.log('🔄 Fetching fresh data from database');
    
  
    const data = await PortfolioService.getAllPortfolioData();

  
    cache = {
      data,
      timestamp: now,
    };

    return NextResponse.json({
      success: true,
      data,
      cached: false,
    });
  } catch (error) {
    console.error('Portfolio API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio data',
      },
      { status: 500 }
    );
  }
}