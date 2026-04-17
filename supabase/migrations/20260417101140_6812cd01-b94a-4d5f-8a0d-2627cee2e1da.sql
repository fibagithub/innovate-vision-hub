ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS aimag text;
CREATE INDEX IF NOT EXISTS idx_partners_aimag ON public.partners(aimag);