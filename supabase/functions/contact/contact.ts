// @ts-ignore
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore
import { Resend } from "https://esm.sh/resend@3.2.0";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400"
};
// Email configuration
const EMAIL_CONFIG = {
  from: "RePhotos.ca <cooper@rephotos.ca>",
  replyTo: "cooper@rephotos.ca",
  companyName: "Rephotos",
  phone: "905-299-9300"
};
// Add version logging
console.log("Function version: 1.0.10");
console.log("Function started at:", new Date().toISOString());
// Check if API key exists and log its presence (but not the actual key)
// @ts-ignore
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
console.log("Environment check:", {
  hasResendKey: !!RESEND_API_KEY,
  resendKeyLength: RESEND_API_KEY?.length || 0,
  resendKeyPrefix: RESEND_API_KEY?.substring(0, 5) + "...",
  // @ts-ignore
  denoVersion: Deno.version,
  emailFrom: EMAIL_CONFIG.from
});
if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set in environment variables!");
  throw new Error("RESEND_API_KEY is not configured");
}
// Initialize Resend client
let resend: any;
try {
  console.log("Initializing Resend client...");
  resend = new Resend(RESEND_API_KEY);
  console.log("Resend client initialized successfully");
} catch (error) {
  console.error("Failed to initialize Resend client:", error);
  throw error;
}
// --- PRICING DATA LOADING ---
let PRICING_DATA: any = null;
let PACKAGES_DATA: any = null;

async function loadPricingData() {
  if (PRICING_DATA && PACKAGES_DATA) {
    return { pricingData: PRICING_DATA, packagesData: PACKAGES_DATA };
  }

  try {
    // Load the HTML file content
    const htmlContent = `<h2>A La Carte Services</h2><table border="1" class="dataframe">
<thead>
<tr style="text-align: right;">
<th>Service</th>
<th>0–999 sq ft</th>
<th>1000–1999 sq ft</th>
<th>2000–2999 sq ft</th>
<th>3000–3999 sq ft</th>
<th>4000–4999 sq ft</th>
</tr>
</thead>
<tbody>
<tr>
<td>HDR Photography</td>
<td>189.99</td>
<td>249.99</td>
<td>319.99</td>
<td>379.99</td>
<td>439.99</td>
</tr>
<tr>
<td>360° Virtual Tour</td>
<td>199.99</td>
<td>239.99</td>
<td>279.99</td>
<td>319.99</td>
<td>349.99</td>
</tr>
<tr>
<td>Property Highlights Video</td>
<td>289.99</td>
<td>309.99</td>
<td>349.99</td>
<td>379.99</td>
<td>409.99</td>
</tr>
<tr>
<td>Slideshow Video Tour</td>
<td>99.99</td>
<td>99.99</td>
<td>99.99</td>
<td>99.99</td>
<td>99.99</td>
</tr>
<tr>
<td>Social Media Reel</td>
<td>229.99</td>
<td>249.99</td>
<td>279.99</td>
<td>299.99</td>
<td>329.99</td>
</tr>
<tr>
<td>Drone Aerial Photos</td>
<td>159.99</td>
<td>159.99</td>
<td>159.99</td>
<td>159.99</td>
<td>159.99</td>
</tr>
<tr>
<td>Drone Aerial Video</td>
<td>159.99</td>
<td>159.99</td>
<td>159.99</td>
<td>159.99</td>
<td>159.99</td>
</tr>
<tr>
<td>2D Floor Plan</td>
<td>119.99</td>
<td>149.99</td>
<td>189.99</td>
<td>229.99</td>
<td>269.99</td>
</tr>
<tr>
<td>3D House Model</td>
<td>189.99</td>
<td>229.99</td>
<td>269.99</td>
<td>299.99</td>
<td>339.99</td>
</tr>
<tr>
<td>Property Website</td>
<td>129.99</td>
<td>129.99</td>
<td>129.99</td>
<td>129.99</td>
<td>129.99</td>
</tr>
<tr>
<td>Custom Domain Name</td>
<td>39.99</td>
<td>39.99</td>
<td>39.99</td>
<td>39.99</td>
<td>39.99</td>
</tr>
<tr>
<td>Virtual Declutter</td>
<td>29.99/image</td>
<td>29.99/image</td>
<td>29.99/image</td>
<td>29.99/image</td>
<td>29.99/image</td>
</tr>
<tr>
<td>Virtual Staging</td>
<td>39.99/image</td>
<td>39.99/image</td>
<td>39.99/image</td>
<td>39.99/image</td>
<td>39.99/image</td>
</tr>
<tr>
<td>Virtual Twilight</td>
<td>49.99/image</td>
<td>49.99/image</td>
<td>49.99/image</td>
<td>49.99/image</td>
<td>49.99/image</td>
</tr>
</tbody>
</table><br/><h2>Packages</h2><table border="1" class="dataframe">
<thead>
<tr style="text-align: right;">
<th>Package Name</th>
<th>Property Size</th>
<th>New Price</th>
<th>New A La Carte Value</th>
<th>New Discount</th>
<th>Includes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Essentials Package</td>
<td>0–999 sq ft</td>
<td>229.99</td>
<td>479.97</td>
<td>250</td>
<td>HDR Photography, 1–2 Drone Shots, Slideshow Video Tour, Property Website</td>
</tr>
<tr>
<td>Essentials Package</td>
<td>1000–1999 sq ft</td>
<td>289.99</td>
<td>549.97</td>
<td>260</td>
<td>HDR Photography, 1–2 Drone Shots, Slideshow Video Tour, Property Website</td>
</tr>
<tr>
<td>Essentials Package</td>
<td>2000–2999 sq ft</td>
<td>349.99</td>
<td>609.97</td>
<td>260</td>
<td>HDR Photography, 1–2 Drone Shots, Slideshow Video Tour, Property Website</td>
</tr>
<tr>
<td>Essentials Package</td>
<td>3000–3999 sq ft</td>
<td>389.99</td>
<td>669.97</td>
<td>280</td>
<td>HDR Photography, 1–2 Drone Shots, Slideshow Video Tour, Property Website</td>
</tr>
<tr>
<td>Essentials Package</td>
<td>4000–4999 sq ft</td>
<td>449.99</td>
<td>729.97</td>
<td>280</td>
<td>HDR Photography, 1–2 Drone Shots, Slideshow Video Tour, Property Website</td>
</tr>
<tr>
<td>Deluxe Tour Package</td>
<td>0–999 sq ft</td>
<td>489.99</td>
<td>839.96</td>
<td>350</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Slideshow Video Tour, Property Website, Custom Domain Name</td>
</tr>
<tr>
<td>Deluxe Tour Package</td>
<td>1000–1999 sq ft</td>
<td>579.99</td>
<td>969.96</td>
<td>390</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Slideshow Video Tour, Property Website, Custom Domain Name</td>
</tr>
<tr>
<td>Deluxe Tour Package</td>
<td>2000–2999 sq ft</td>
<td>649.99</td>
<td>1109.96</td>
<td>460</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Slideshow Video Tour, Property Website, Custom Domain Name</td>
</tr>
<tr>
<td>Deluxe Tour Package</td>
<td>3000–3999 sq ft</td>
<td>719.99</td>
<td>1249.96</td>
<td>530</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Slideshow Video Tour, Property Website, Custom Domain Name</td>
</tr>
<tr>
<td>Deluxe Tour Package</td>
<td>4000–4999 sq ft</td>
<td>799.99</td>
<td>1389.96</td>
<td>590</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Slideshow Video Tour, Property Website, Custom Domain Name</td>
</tr>
<tr>
<td>Marketing Pro Package</td>
<td>0–999 sq ft</td>
<td>829.99</td>
<td>1099.96</td>
<td>270</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, Slideshow Video Tour</td>
</tr>
<tr>
<td>Marketing Pro Package</td>
<td>1000–1999 sq ft</td>
<td>959.99</td>
<td>1259.96</td>
<td>300</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, Slideshow Video Tour</td>
</tr>
<tr>
<td>Marketing Pro Package</td>
<td>2000–2999 sq ft</td>
<td>1079.99</td>
<td>1419.96</td>
<td>340</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, Slideshow Video Tour</td>
</tr>
<tr>
<td>Marketing Pro Package</td>
<td>3000–3999 sq ft</td>
<td>1179.99</td>
<td>1579.96</td>
<td>400</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, Slideshow Video Tour</td>
</tr>
<tr>
<td>Marketing Pro Package</td>
<td>4000–4999 sq ft</td>
<td>1299.99</td>
<td>1749.96</td>
<td>450</td>
<td>HDR Photography, 2–3 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, Slideshow Video Tour</td>
</tr>
<tr>
<td>Premium Seller Experience</td>
<td>0–999 sq ft</td>
<td>1069.99</td>
<td>1629.95</td>
<td>560</td>
<td>HDR Photography, 3–5 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, 3D House Model, Virtual Twilight, Slideshow Video Tour</td>
</tr>
<tr>
<td>Premium Seller Experience</td>
<td>1000–1999 sq ft</td>
<td>1199.99</td>
<td>1789.95</td>
<td>590</td>
<td>HDR Photography, 3–5 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, 3D House Model, Virtual Twilight, Slideshow Video Tour</td>
</tr>
<tr>
<td>Premium Seller Experience</td>
<td>2000–2999 sq ft</td>
<td>1319.99</td>
<td>1949.95</td>
<td>630</td>
<td>HDR Photography, 3–5 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, 3D House Model, Virtual Twilight, Slideshow Video Tour</td>
</tr>
<tr>
<td>Premium Seller Experience</td>
<td>3000–3999 sq ft</td>
<td>1419.99</td>
<td>2109.95</td>
<td>690</td>
<td>HDR Photography, 3–5 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, 3D House Model, Virtual Twilight, Slideshow Video Tour</td>
</tr>
<tr>
<td>Premium Seller Experience</td>
<td>4000–4999 sq ft</td>
<td>1539.99</td>
<td>2279.95</td>
<td>740</td>
<td>HDR Photography, 3–5 Drone Shots, 360° Virtual Tour, 2D Floor Plan, Custom Video, Property Website, Custom Domain Name, 3D House Model, Virtual Twilight, Slideshow Video Tour</td>
</tr>
</tbody>
</table>`;

    // Parse packages data
    const packagesMatch = htmlContent.match(/<h2>Packages<\/h2><table[^>]*>([\s\S]*?)<\/table>/);
    const packages: any[] = [];
    
    if (packagesMatch) {
      const tableContent = packagesMatch[1];
      const rowMatches = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/g);
      
      if (rowMatches) {
        rowMatches.slice(1).forEach(row => {
          const cells = row.match(/<td[^>]*>(.*?)<\/td>/g);
          if (cells && cells.length >= 6) {
            packages.push({
              name: cells[0].replace(/<[^>]*>/g, '').trim(),
              propertySize: cells[1].replace(/<[^>]*>/g, '').trim(),
              price: parseFloat(cells[2].replace(/<[^>]*>/g, '').trim()),
              aLaCarteValue: parseFloat(cells[3].replace(/<[^>]*>/g, '').trim()),
              discount: parseFloat(cells[4].replace(/<[^>]*>/g, '').trim()),
              includes: cells[5].replace(/<[^>]*>/g, '').trim()
            });
          }
        });
      }
    }

    PACKAGES_DATA = packages;
    console.log("Loaded packages data:", packages.length, "packages");
    
    return { packagesData: packages };
  } catch (error: unknown) {
    console.error("Error loading pricing data:", error);
    return { packagesData: [] };
  }
}

// Function to find relevant packages for the customer's property size
function findRelevantPackages(propertySize: string) {
  const { packagesData } = PACKAGES_DATA ? { packagesData: PACKAGES_DATA } : { packagesData: [] };
  
  // Normalize property size for matching
  const normalizeSize = (size: string) => {
    if (size.includes('0-999') || size.includes('Under 1000')) return '0–999 sq ft';
    if (size.includes('1000-1999') || size.includes('1000-2000')) return '1000–1999 sq ft';
    if (size.includes('2000-2999') || size.includes('2000-3000')) return '2000–2999 sq ft';
    if (size.includes('3000-3999') || size.includes('3000-4000')) return '3000–3999 sq ft';
    if (size.includes('4000-4999') || size.includes('4000-5000')) return '4000–4999 sq ft';
    return size;
  };

  const normalizedSize = normalizeSize(propertySize);
  return packagesData.filter((pkg: any) => pkg.propertySize === normalizedSize);
}

// Function to generate package pricing section for email
function generatePackagePricingSection(propertySize: string, currentTotal: number) {
  const relevantPackages = findRelevantPackages(propertySize);
  
  if (relevantPackages.length === 0) {
    return `Current Total: $${currentTotal.toFixed(2)}`;
  }

  let pricingSection = `CURRENT BOOKING
Total: $${currentTotal.toFixed(2)}

💰 PACKAGE SAVINGS AVAILABLE
For your ${propertySize} property, consider these popular packages:

`;

  relevantPackages.forEach((pkg: any) => {
    const savings = pkg.aLaCarteValue - pkg.price;
    pricingSection += `📦 ${pkg.name.toUpperCase()}
• Package Price: $${pkg.price.toFixed(2)}
• Individual Value: $${pkg.aLaCarteValue.toFixed(2)}
• You Save: $${savings.toFixed(2)}
• Includes: ${pkg.includes}

`;
  });

  pricingSection += `Want to switch to a package? Reply to this email or call us at ${EMAIL_CONFIG.phone}`;

  return pricingSection;
}

// --- VOLUME DISCOUNT HELPERS ---
function getDiscountPercent(amount: any) {
  if (amount >= 1100) return 17;
  if (amount >= 900) return 15;
  if (amount >= 700) return 12;
  if (amount >= 500) return 10;
  if (amount >= 350) return 5;
  if (amount >= 199.99) return 3;
  return 0;
}
function calculateDiscountedTotal(amount: any) {
  const percent = getDiscountPercent(amount);
  const discount = +(amount * (percent / 100)).toFixed(2);
  return {
    percent,
    discount,
    final: +(amount - discount).toFixed(2)
  };
}
// Helper function to validate booking record
function validateBookingRecord(record: any) {
  const requiredFields = [
    'property_size',
    'services',
    'total_amount',
    'address',
    'preferred_date',
    'time',
    'agent_name',
    'agent_email'
  ];
  const missingFields = requiredFields.filter((field)=>!record[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  if (!Array.isArray(record.services) || record.services.length === 0) {
    throw new Error('Services must be a non-empty array');
  }
  if (typeof record.address !== 'object' && typeof record.address !== 'string') {
    throw new Error('Address must be an object or string');
  }
  if (typeof record.address === 'object') {
    const requiredAddressFields = [
      'street',
      'city',
      'province',
      'zipCode'
    ];
    const missingAddressFields = requiredAddressFields.filter((field)=>!record.address[field]);
    if (missingAddressFields.length > 0) {
      throw new Error(`Missing required address fields: ${missingAddressFields.join(', ')}`);
    }
  }
  return true;
}
// Helper function to send email
async function sendEmail(to: any, subject: any, text: any) {
  try {
    console.log("Attempting to send email:", {
      from: EMAIL_CONFIG.from,
      to,
      subject,
      textLength: text.length
    });
    const response = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      reply_to: EMAIL_CONFIG.replyTo,
      to,
      subject,
      text
    });
    console.log("Email send response:", {
      success: !response.error,
      error: response.error,
      id: response.id
    });
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error sending email:", {
      error: err.message,
      stack: (err as any).stack,
      cause: (err as any).cause,
      from: EMAIL_CONFIG.from
    });
    throw err;
  }
}
serve(async (req: any)=>{
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Function called at:`, new Date().toISOString());
  console.log(`[${requestId}] Request URL:`, req.url);
  console.log(`[${requestId}] Request method:`, req.method);
  console.log(`[${requestId}] Request headers:`, Object.fromEntries(req.headers.entries()));
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] Handling CORS preflight request`);
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  // Add a test endpoint that works with GET requests
  if (req.url.endsWith('/test')) {
    // Allow GET requests for testing
    if (req.method === "GET") {
      try {
        console.log(`[${requestId}] Testing email sending via GET request...`);
        const testResponse = await sendEmail([
          "cooper@rephotos.ca"
        ], "Test Email from Edge Function", `This is a test email to verify the Resend client is working.\n\nFrom: ${EMAIL_CONFIG.from}\nReply-To: ${EMAIL_CONFIG.replyTo}\nCompany: ${EMAIL_CONFIG.companyName}`);
        return new Response(JSON.stringify({
          message: "Test email sent successfully",
          testResponse,
          requestId,
          timestamp: new Date().toISOString(),
          from: EMAIL_CONFIG.from
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          },
          status: 200
        });
      } catch (error) {
        console.error(`[${requestId}] Test email failed:`, error);
        return new Response(JSON.stringify({
          error: "Test email failed",
          details: (error as Error).message,
          requestId,
          timestamp: new Date().toISOString(),
          from: EMAIL_CONFIG.from
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          },
          status: 500
        });
      }
    }
  }
  // For all other requests, require authentication
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    console.error(`[${requestId}] Missing authorization header`);
    return new Response(JSON.stringify({
      error: "Missing authorization header",
      requestId
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 401
    });
  }
  try {
    // Load pricing data at the start of each request
    await loadPricingData();

    // Log the raw request body
    const body = await req.text();
    console.log(`[${requestId}] Raw request body:`, body);
    let record;
    try {
      const parsedBody = JSON.parse(body);
      console.log(`[${requestId}] Parsed request body:`, {
        hasRecord: !!parsedBody.record,
        recordKeys: parsedBody.record ? Object.keys(parsedBody.record) : [],
        bodyKeys: Object.keys(parsedBody)
      });
      record = parsedBody.record || parsedBody;
      // Validate the booking record
      validateBookingRecord(record);
      console.log(`[${requestId}] Booking record validation passed`);
    } catch (e: unknown) {
      const err = e as Error;
      console.error(`[${requestId}] Request parsing/validation failed:`, {
        error: err.message,
        stack: (err as any).stack,
        body: body.substring(0, 1000) // Log first 1000 chars of body for debugging
      });
      throw new Error(`Invalid request data: ${err.message}`);
    }

    // Log the parsed record (excluding sensitive data)
    console.log(`[${requestId}] Processing booking record:`, {
      property_size: record.property_size,
      services_count: record.services?.length,
      total_amount: record.total_amount,
      agent_email: record.agent_email,
      agent_name: record.agent_name,
      preferred_date: record.preferred_date,
      time: record.time,
      property_status: record.property_status,
      address_type: typeof record.address,
      has_notes: !!record.notes
    });

    const { property_size, services, total_amount, address, notes, preferred_date, time, property_status, agent_name, agent_email, agent_phone, agent_company, package_name } = record;

    // Format services for display
    const serviceList = services.map((service: any)=>`${service.name} (${service.count}x) - $${service.total}`).join("\n");

    // Format address
    const addressStr = typeof address === 'string' ? address : `${address.street}, ${address.city}, ${address.province} ${address.zipCode}`;

    // Format time for display (convert 24h to 12h format)
    const formatTime = (timeStr: any)=>{
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };

    // --- ENHANCED PRICING SECTION WITH PACKAGES ---
    const rawTotal = typeof total_amount === 'number' ? total_amount : parseFloat(total_amount);
    const priceSection = generatePackagePricingSection(property_size, rawTotal);

    const emailBody = `Dear ${agent_name},

Thank you for choosing ${EMAIL_CONFIG.companyName} for your photography needs! We're excited to help showcase your property.

📸 BOOKING CONFIRMATION

PROPERTY DETAILS
• Size: ${property_size}
• Status: ${property_status}
${package_name ? `• Package: ${package_name}` : ''}
• Preferred Date: ${new Date(preferred_date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}
• Preferred Time: ${formatTime(time)}
• Address: ${addressStr}

SERVICES BOOKED
${serviceList}

${priceSection}

${notes ? `ADDITIONAL NOTES\n${notes}` : ''}

AGENT INFORMATION
• Name: ${agent_name}
• Email: ${agent_email}
${agent_phone ? `• Phone: ${agent_phone}` : ''}
${agent_company ? `• Company: ${agent_company}` : ''}

NEXT STEPS

We'll review your booking and confirm the appointment time.

Please ensure the property is ready by reviewing our Photo Day Prep Guide. https://www.rephotos.ca/photo-day

Our photographer will arrive on time and begin capturing the property as outlined in the checklist.

If you need to make any changes to your booking, simply reply to this email or call us at ${EMAIL_CONFIG.phone}.

Best regards,
Cooper Thompson
${EMAIL_CONFIG.from}
${EMAIL_CONFIG.phone}
${EMAIL_CONFIG.companyName.toLowerCase()}.ca`.trim();

    try {
      console.log(`[${requestId}] Sending booking confirmation email...`);
      const emailResponse = await sendEmail([
        agent_email,
        "cooper@rephotos.ca"
      ], "📸 Booking Confirmation – RePhotos", emailBody);
      console.log(`[${requestId}] Email sent successfully!`);
      return new Response(JSON.stringify({
        message: "Email sent successfully",
        emailResponse,
        requestId
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 200
      });
    } catch (emailError: unknown) {
      const err = emailError as Error;
      console.error(`[${requestId}] Failed to send booking confirmation email:`, {
        error: err.message,
        stack: (err as any).stack,
        cause: (err as any).cause
      });
      throw err;
    }
  } catch (error: unknown) {
    // Enhanced error logging
    const err = error as Error;
    console.error(`[${requestId}] Error in request handling:`, {
      error: err.message,
      stack: (err as any).stack,
      cause: (err as any).cause,
      requestId
    });
    return new Response(JSON.stringify({
      error: "Failed to process request",
      details: err.message,
      requestId,
      timestamp: new Date().toISOString()
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 500
    });
  }
});
