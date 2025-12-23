-- Create storage bucket for team member avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Allow anyone to view avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated admins to upload avatars
CREATE POLICY "Admins can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to update avatars
CREATE POLICY "Admins can update avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to delete avatars
CREATE POLICY "Admins can delete avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND public.has_role(auth.uid(), 'admin')
);