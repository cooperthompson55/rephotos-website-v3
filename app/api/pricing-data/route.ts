import { NextResponse } from 'next/server';
import { loadPricingData } from '@/lib/pricing-parser';

export async function GET() {
  try {
    const { pricingData, packagesData } = loadPricingData();
    
    return NextResponse.json({
      pricingData,
      packagesData
    });
  } catch (error) {
    console.error('Error loading pricing data:', error);
    return NextResponse.json(
      { error: 'Failed to load pricing data' },
      { status: 500 }
    );
  }
} 