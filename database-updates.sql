-- Add payment-related columns to schools table
ALTER TABLE schools ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE schools ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE schools ADD COLUMN IF NOT EXISTS license_expires_at TIMESTAMPTZ;