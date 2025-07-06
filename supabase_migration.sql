-- Migration: Add structured columns to bookings table
-- Run this in your Supabase SQL Editor

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS selected_package_name TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS additional_instructions TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS property_type TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS bedrooms TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS bathrooms TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS parking_spaces TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS suite_unit TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS access_instructions TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS agent_designation TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS agent_brokerage TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS feature_sheet_content TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS promotion_code TEXT;

-- Add comments to document the columns
COMMENT ON COLUMN bookings.selected_package_name IS 'Name of the selected package/bundle';
COMMENT ON COLUMN bookings.additional_instructions IS 'Additional instructions from user';
COMMENT ON COLUMN bookings.property_type IS 'Type of property (condo-apartment, townhouse, etc.)';
COMMENT ON COLUMN bookings.bedrooms IS 'Number of bedrooms';
COMMENT ON COLUMN bookings.bathrooms IS 'Number of bathrooms';
COMMENT ON COLUMN bookings.parking_spaces IS 'Number of parking spaces';
COMMENT ON COLUMN bookings.suite_unit IS 'Suite or unit number';
COMMENT ON COLUMN bookings.postal_code IS 'Property postal code in various formats';
COMMENT ON COLUMN bookings.access_instructions IS 'Instructions for accessing the property';
COMMENT ON COLUMN bookings.agent_designation IS 'Agent designation (Realtor, Sales Rep, etc.)';
COMMENT ON COLUMN bookings.agent_brokerage IS 'Brokerage name';
COMMENT ON COLUMN bookings.feature_sheet_content IS 'Content for feature sheet/flyer';
COMMENT ON COLUMN bookings.promotion_code IS 'Promotion code used (if any)'; 