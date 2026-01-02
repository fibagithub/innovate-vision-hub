-- Add benefits column to services table for storing advantage/benefit items
ALTER TABLE public.services 
ADD COLUMN benefits jsonb DEFAULT '[]'::jsonb;

-- Add benefits_mn column for Mongolian translations
ALTER TABLE public.services 
ADD COLUMN benefits_mn jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.services.benefits IS 'Array of benefit objects with title and description fields';
COMMENT ON COLUMN public.services.benefits_mn IS 'Array of benefit objects in Mongolian with title and description fields';