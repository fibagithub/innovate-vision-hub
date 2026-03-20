import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ServiceBenefit {
  title: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  name_mn: string | null;
  description: string | null;
  description_mn: string | null;
  category: string | null;
  category_mn: string | null;
  icon: string | null;
  icon_url: string | null;
  usage_metric: string | null;
  usage_metric_mn: string | null;
  features: string[] | null;
  features_mn: string[] | null;
  benefits: ServiceBenefit[] | null;
  benefits_mn: ServiceBenefit[] | null;
  is_active: boolean;
  display_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  name_mn: string | null;
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
  region: string | null;
  count: number;
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
      return data as unknown as Service[];
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

// Hook to get aggregated partner statistics by region
export const usePartnerStats = () => {
  return useQuery({
    queryKey: ['partner_stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('id, region, count, name, description, description_mn, logo_url')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      
      // Aggregate counts by region
      const regionStats: Record<string, { count: number; name: string; description?: string; description_mn?: string }> = {};
      let totalCount = 0;
      
      (data || []).forEach((partner: any) => {
        if (partner.region) {
          if (!regionStats[partner.region]) {
            regionStats[partner.region] = { 
              count: 0, 
              name: partner.name,
              description: partner.description,
              description_mn: partner.description_mn 
            };
          }
          regionStats[partner.region].count += partner.count || 0;
          totalCount += partner.count || 0;
        }
      });
      
      return { 
        regionStats, 
        totalCount, 
        partners: data as { id: string; region: string; count: number; name: string; description: string; description_mn: string; logo_url: string | null }[] 
      };
    },
  });
};
