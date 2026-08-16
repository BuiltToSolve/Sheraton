import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Attempt to query the database using raw SQL just to test the connection.
    // We use a simple select 1 query.
    await db.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ status: 'success', message: 'Database connected successfully!' });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({ status: 'error', message: 'Database connection failed', error: String(error) }, { status: 500 });
  }
}
