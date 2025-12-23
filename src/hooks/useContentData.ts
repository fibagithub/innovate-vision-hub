import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  name: string;
  name_mn: string | null;
  description: string | null;
  description_mn: string | null;
  icon: string | null;
  features: string[] | null;
  is_active: boolean;
  display_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string | null;
  position_mn: string | null;
  bio: string | null;
  bio_mn: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  is_active: boolean;
  display_order: number;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  description_mn: string | null;
  partner_type: string;
  is_active: boolean;
  display_order: number;
}

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data as Service[];
    },
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team_members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data as TeamMember[];
    },
  });
};

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data as Partner[];
    },
  });
};
