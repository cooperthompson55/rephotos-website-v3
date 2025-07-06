import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Server-side Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(request: NextRequest) {
  try {
    console.log('Booking API route called')
    
    const payload = await request.json()
    console.log('Received booking payload:', {
      reference_number: payload.reference_number,
      agent_email: payload.agent_email,
      total_amount: payload.total_amount,
      services_count: payload.services?.length
    })

    // Validate required fields
    const requiredFields = ['reference_number', 'agent_email', 'agent_name', 'address', 'preferred_date', 'time', 'services', 'total_amount']
    const missingFields = requiredFields.filter(field => !payload[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Insert booking with service role permissions
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([payload])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('Booking inserted successfully:', data[0]?.id)

    // Trigger the edge function for email notifications
    try {
      console.log('Calling edge function for email notification...')
      const edgeResponse = await fetch('https://jshnsfvvsmjlxlbdpehf.functions.supabase.co/index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify(payload),
      })
      
      if (!edgeResponse.ok) {
        console.error('Edge function call failed:', edgeResponse.status, await edgeResponse.text())
      } else {
        console.log('Edge function call successful')
      }
    } catch (edgeError) {
      console.error('Edge function error (non-blocking):', edgeError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json({ data: data[0], success: true })

  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
} 