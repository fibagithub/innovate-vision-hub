-- Add new columns for enhanced service management
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS category_mn text,
ADD COLUMN IF NOT EXISTS icon_url text,
ADD COLUMN IF NOT EXISTS usage_metric text,
ADD COLUMN IF NOT EXISTS usage_metric_mn text;

-- Add comment for clarity
COMMENT ON COLUMN public.services.category IS 'Category label for the service';
COMMENT ON COLUMN public.services.icon_url IS 'URL for uploaded icon image';
COMMENT ON COLUMN public.services.usage_metric IS 'Usage metric display text';