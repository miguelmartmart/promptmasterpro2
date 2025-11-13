/**
 * Database Test API Route
 * 
 * GET /api/db-test - Test database queries with the sample table
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Test query on the sample table created by Neon
    const result = await query(
      'SELECT * FROM playing_with_neon LIMIT 10'
    );

    return NextResponse.json({
      success: true,
      rowCount: result.rowCount,
      data: result.rows,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    
    // Check if table doesn't exist
    if (error instanceof Error && error.message.includes('does not exist')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Table "playing_with_neon" does not exist',
          hint: 'Run the initialization SQL from the Neon console or PowerShell',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
