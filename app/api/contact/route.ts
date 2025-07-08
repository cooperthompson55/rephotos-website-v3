import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json({ 
        error: 'Email service is not configured. Please contact us directly at cooper@rephotos.ca or call (905) 299-9300.' 
      }, { status: 500 });
    }

    // Compose email HTML
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `;

    console.log('Attempting to send email via Resend API...');
    
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'cooper@rephotos.ca',
        to: 'cooper@rephotos.ca',
        subject: `New Contact Form: ${subject || 'General Inquiry'}`,
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend API error:', error);
      console.error('Response status:', res.status);
      return NextResponse.json({ 
        error: 'Failed to send message. Please contact us directly at cooper@rephotos.ca or call (905) 299-9300.' 
      }, { status: 500 });
    }

    const result = await res.json();
    console.log('Email sent successfully:', result);
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ 
      error: 'An unexpected error occurred. Please contact us directly at cooper@rephotos.ca or call (905) 299-9300.' 
    }, { status: 500 });
  }
} 