import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
      hasServiceKey: !!supabaseServiceKey,
      urlLength: supabaseUrl?.length || 0,
      anonKeyLength: supabaseAnonKey?.length || 0,
      serviceKeyLength: supabaseServiceKey?.length || 0,
    })

    const results = {
      environment: {
        hasUrl: !!supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
        hasServiceKey: !!supabaseServiceKey,
        urlValid: supabaseUrl?.includes('supabase.co') || false,
      },
      tests: {
        anonConnection: null as any,
        serviceConnection: null as any,
        bookingsTableAccess: null as any
      }
    }

    // Test anon key connection
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const anonClient = createClient(supabaseUrl, supabaseAnonKey)
        const { data, error } = await anonClient.from('bookings').select('id').limit(0)
        results.tests.anonConnection = {
          success: !error,
          error: error?.message || null
        }
      } catch (err) {
        results.tests.anonConnection = {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      }
    }

    // Test service key connection
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const serviceClient = createClient(supabaseUrl, supabaseServiceKey)
        const { data, error } = await serviceClient.from('bookings').select('id').limit(0)
        results.tests.serviceConnection = {
          success: !error,
          error: error?.message || null
        }

        // Test insert permission with service key
        if (!error) {
          try {
            const testPayload = {
              reference_number: 'TEST-' + Date.now(),
              agent_name: 'Test User',
              agent_email: 'test@example.com',
              address: 'Test Address',
              preferred_date: '2024-01-01',
              time: '10:00am',
              services: [{ name: 'Test Service', price: 100, count: 1, total: 100 }],
              total_amount: 100,
              property_size: 'Under 1500',
              status: 'test'
            }

            const { data: insertData, error: insertError } = await serviceClient
              .from('bookings')
              .insert([testPayload])
              .select()

            if (!insertError && insertData) {
              // Clean up test record
              await serviceClient.from('bookings').delete().eq('id', insertData[0].id)
              results.tests.bookingsTableAccess = {
                success: true,
                canInsert: true,
                error: null
              }
            } else {
              results.tests.bookingsTableAccess = {
                success: false,
                canInsert: false,
                error: insertError?.message || 'Insert failed'
              }
            }
          } catch (insertErr) {
            results.tests.bookingsTableAccess = {
              success: false,
              canInsert: false,
              error: insertErr instanceof Error ? insertErr.message : 'Insert test failed'
            }
          }
        }
      } catch (err) {
        results.tests.serviceConnection = {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      }
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
} 