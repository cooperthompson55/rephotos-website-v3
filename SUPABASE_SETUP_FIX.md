# Fix Supabase Booking Issues

## Problem
After recent Supabase security updates, the booking form is failing with "Double check your Supabase `anon` or `service_role` API key" error. This is likely due to Row Level Security (RLS) policies blocking anonymous inserts.

## Solution Overview
1. Add the missing `SUPABASE_SERVICE_ROLE_KEY` environment variable
2. Update RLS policies to allow bookings insertions
3. Test the connection

## Step 1: Environment Variables

### Add to your environment variables (.env.local or deployment platform):

```env
# Existing variables (verify these are correct)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# NEW: Add this service role key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Where to find these keys:
1. Go to your Supabase Dashboard
2. Navigate to Settings → API
3. Copy the values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

## Step 2: Test Your Configuration

Visit this URL to test your Supabase setup:
```
http://localhost:3000/api/test-supabase
```

This will show you:
- ✅ Environment variables are set correctly
- ✅ Anon key can connect to Supabase
- ✅ Service key can connect to Supabase
- ✅ Service key can insert into bookings table

## Step 3: Fix RLS Policies (if needed)

If the test shows RLS blocking inserts, you need to update your Supabase policies:

### Option A: Allow service role inserts (Recommended)
In your Supabase Dashboard → Authentication → Policies:

1. Go to the `bookings` table policies
2. Create a new policy or edit existing one:

```sql
-- Policy name: "Allow service role to insert bookings"
-- Operation: INSERT
-- Target roles: service_role

CREATE POLICY "Allow service role to insert bookings" ON bookings
FOR INSERT
TO service_role
WITH CHECK (true);
```

### Option B: Allow anonymous inserts (Less secure)
```sql
-- Policy name: "Allow anonymous booking inserts"
-- Operation: INSERT  
-- Target roles: anon

CREATE POLICY "Allow anonymous booking inserts" ON bookings
FOR INSERT
TO anon
WITH CHECK (true);
```

## Step 4: Update your deployment

If using Netlify/Vercel, add the `SUPABASE_SERVICE_ROLE_KEY` to your deployment environment variables.

### Netlify:
1. Go to Site settings → Environment variables
2. Add `SUPABASE_SERVICE_ROLE_KEY` with your service role key

### Vercel:
1. Go to Project settings → Environment Variables
2. Add `SUPABASE_SERVICE_ROLE_KEY` with your service role key

## How the Fix Works

The updated booking system now:

1. **First tries** direct Supabase insert (using anon key)
2. **If that fails**, falls back to API route `/api/bookings` (using service role key)
3. **Provides better error messages** for users

This ensures booking works regardless of RLS configuration while maintaining security.

## Troubleshooting

### Error: "Missing SUPABASE_SERVICE_ROLE_KEY"
- Make sure you've added the service role key to your environment variables
- Restart your development server after adding environment variables

### Error: "RLS policy violation" 
- Follow Step 3 to update your RLS policies
- Make sure the policy allows the correct role (service_role or anon)

### Error: "Invalid API key"
- Double-check your keys from the Supabase dashboard
- Make sure you're using the correct project URL

### Still having issues?
1. Check the browser console for detailed error messages
2. Visit `/api/test-supabase` to see detailed connection test results
3. Verify your environment variables are loaded correctly

## Security Notes

- The `service_role` key has full access to your database - keep it secret!
- Only use `service_role` key in server-side code (API routes)
- The `anon` key is safe to use in client-side code
- RLS policies still apply to protect your data based on user authentication 