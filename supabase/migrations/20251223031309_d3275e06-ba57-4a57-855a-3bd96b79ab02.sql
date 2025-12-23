-- Add new columns to partners table
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'mongolia',
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS partnership_date DATE;