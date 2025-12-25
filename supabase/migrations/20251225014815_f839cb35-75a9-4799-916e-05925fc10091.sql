-- Add count field to partners table for regional statistics
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS count integer DEFAULT 0;

-- Update existing partners schema for simpler regional statistics
-- region, count, description, display_order, is_active will be the main fields