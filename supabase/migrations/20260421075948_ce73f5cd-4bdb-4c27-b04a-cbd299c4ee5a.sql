ALTER TABLE public.partners REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.team_members REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'partners') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.partners';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'services') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.services';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'team_members') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members';
  END IF;
END $$;