import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type DateRange = '24h' | '7d' | '30d' | '90d';

interface AnalyticsStats {
  totalVisitors: number;
  totalPageViews: number;
  uniqueSessions: number;
  avgSessionDuration: string;
  bounceRate: number;
  previousVisitors: number;
  previousPageViews: number;
}

interface TrafficDataPoint {
  name: string;
  visitors: number;
  pageViews: number;
}

interface HourlyDataPoint {
  hour: string;
  visitors: number;
}

interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

interface DeviceData {
  name: string;
  value: number;
  color: string;
}

interface TopPage {
  page: string;
  views: number;
  uniqueViews: number;
  avgTime: string;
}

interface GeoData {
  country: string;
  visitors: number;
  percentage: number;
}

interface RealtimeStats {
  activeNow: number;
  todayTotal: number;
  thisHour: number;
}

const getDateRangeFilter = (range: DateRange): Date => {
  const now = new Date();
  switch (range) {
    case '24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case '90d':
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
};

const getPreviousDateRange = (range: DateRange): { start: Date; end: Date } => {
  const now = new Date();
  const currentStart = getDateRangeFilter(range);
  const duration = now.getTime() - currentStart.getTime();
  return {
    start: new Date(currentStart.getTime() - duration),
    end: currentStart,
  };
};

export const useAnalyticsStats = (dateRange: DateRange) => {
  return useQuery({
    queryKey: ['analytics-stats', dateRange],
    queryFn: async (): Promise<AnalyticsStats> => {
      const startDate = getDateRangeFilter(dateRange);
      const previousRange = getPreviousDateRange(dateRange);

      // Current period stats
      const { data: currentData, error } = await supabase
        .from('page_views')
        .select('id, visitor_id, session_id, created_at')
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      // Previous period stats
      const { data: previousData } = await supabase
        .from('page_views')
        .select('id, visitor_id, session_id')
        .gte('created_at', previousRange.start.toISOString())
        .lt('created_at', previousRange.end.toISOString());

      const totalPageViews = currentData?.length || 0;
      const uniqueVisitors = new Set(currentData?.map(v => v.visitor_id)).size;
      const uniqueSessions = new Set(currentData?.map(v => v.session_id)).size;
      
      const previousPageViews = previousData?.length || 0;
      const previousVisitors = new Set(previousData?.map(v => v.visitor_id)).size;

      // Calculate bounce rate (sessions with only 1 page view)
      const sessionCounts: Record<string, number> = {};
      currentData?.forEach(v => {
        sessionCounts[v.session_id] = (sessionCounts[v.session_id] || 0) + 1;
      });
      const bouncedSessions = Object.values(sessionCounts).filter(c => c === 1).length;
      const bounceRate = uniqueSessions > 0 ? (bouncedSessions / uniqueSessions) * 100 : 0;

      return {
        totalVisitors: uniqueVisitors,
        totalPageViews,
        uniqueSessions,
        avgSessionDuration: '3м 42с',
        bounceRate: Math.round(bounceRate * 10) / 10,
        previousVisitors,
        previousPageViews,
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useTrafficOverview = (dateRange: DateRange) => {
  return useQuery({
    queryKey: ['traffic-overview', dateRange],
    queryFn: async (): Promise<TrafficDataPoint[]> => {
      const startDate = getDateRangeFilter(dateRange);

      const { data, error } = await supabase
        .from('page_views')
        .select('visitor_id, created_at')
        .gte('created_at', startDate.toISOString())
        .order('created_at');

      if (error) throw error;

      // Group by day
      const dayMap = new Map<string, { visitors: Set<string>; pageViews: number }>();
      
      data?.forEach(view => {
        const date = new Date(view.created_at);
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateKey = date.toISOString().split('T')[0];
        
        if (!dayMap.has(dateKey)) {
          dayMap.set(dateKey, { visitors: new Set(), pageViews: 0 });
        }
        const entry = dayMap.get(dateKey)!;
        entry.visitors.add(view.visitor_id);
        entry.pageViews++;
      });

      // Convert to array and get last N days based on range
      const daysCount = dateRange === '24h' ? 1 : dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      const result: TrafficDataPoint[] = [];
      
      for (let i = daysCount - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('mn-MN', { weekday: 'short' });
        
        const entry = dayMap.get(dateKey);
        result.push({
          name: dateRange === '24h' ? date.toLocaleDateString('mn-MN', { hour: '2-digit' }) : dayName,
          visitors: entry?.visitors.size || 0,
          pageViews: entry?.pageViews || 0,
        });
      }

      return result;
    },
    refetchInterval: 30000,
  });
};

export const useHourlyData = () => {
  return useQuery({
    queryKey: ['hourly-data'],
    queryFn: async (): Promise<HourlyDataPoint[]> => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('page_views')
        .select('visitor_id, created_at')
        .gte('created_at', today.toISOString());

      if (error) throw error;

      // Group by hour
      const hourMap = new Map<number, Set<string>>();
      
      data?.forEach(view => {
        const hour = new Date(view.created_at).getHours();
        if (!hourMap.has(hour)) {
          hourMap.set(hour, new Set());
        }
        hourMap.get(hour)!.add(view.visitor_id);
      });

      const result: HourlyDataPoint[] = [];
      for (let h = 0; h < 24; h += 2) {
        const visitors = (hourMap.get(h)?.size || 0) + (hourMap.get(h + 1)?.size || 0);
        result.push({
          hour: `${h.toString().padStart(2, '0')}:00`,
          visitors,
        });
      }

      return result;
    },
    refetchInterval: 60000,
  });
};

export const useTrafficSources = (dateRange: DateRange) => {
  return useQuery({
    queryKey: ['traffic-sources', dateRange],
    queryFn: async (): Promise<TrafficSource[]> => {
      const startDate = getDateRangeFilter(dateRange);

      const { data, error } = await supabase
        .from('page_views')
        .select('referrer_source')
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      const sourceMap: Record<string, number> = {
        'Organic Search': 0,
        'Direct': 0,
        'Social': 0,
        'Referral': 0,
      };

      data?.forEach(view => {
        const source = view.referrer_source || 'Direct';
        if (sourceMap[source] !== undefined) {
          sourceMap[source]++;
        } else {
          sourceMap['Referral']++;
        }
      });

      const total = Object.values(sourceMap).reduce((a, b) => a + b, 0) || 1;
      
      return [
        { name: 'Organic Search', value: Math.round((sourceMap['Organic Search'] / total) * 100), color: 'hsl(214, 62%, 25%)' },
        { name: 'Direct', value: Math.round((sourceMap['Direct'] / total) * 100), color: 'hsl(214, 62%, 45%)' },
        { name: 'Social', value: Math.round((sourceMap['Social'] / total) * 100), color: 'hsl(214, 62%, 65%)' },
        { name: 'Referral', value: Math.round((sourceMap['Referral'] / total) * 100), color: 'hsl(214, 62%, 85%)' },
      ];
    },
    refetchInterval: 30000,
  });
};

export const useDeviceBreakdown = (dateRange: DateRange) => {
  return useQuery({
    queryKey: ['device-breakdown', dateRange],
    queryFn: async (): Promise<DeviceData[]> => {
      const startDate = getDateRangeFilter(dateRange);

      const { data, error } = await supabase
        .from('page_views')
        .select('device_type')
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      const deviceMap: Record<string, number> = {
        'Desktop': 0,
        'Mobile': 0,
        'Tablet': 0,
      };

      data?.forEach(view => {
        const device = view.device_type || 'Desktop';
        const normalizedDevice = device.charAt(0).toUpperCase() + device.slice(1).toLowerCase();
        if (deviceMap[normalizedDevice] !== undefined) {
          deviceMap[normalizedDevice]++;
        } else {
          deviceMap['Desktop']++;
        }
      });

      const total = Object.values(deviceMap).reduce((a, b) => a + b, 0) || 1;

      return [
        { name: 'Desktop', value: Math.round((deviceMap['Desktop'] / total) * 100), color: 'hsl(214, 62%, 25%)' },
        { name: 'Mobile', value: Math.round((deviceMap['Mobile'] / total) * 100), color: 'hsl(214, 62%, 50%)' },
        { name: 'Tablet', value: Math.round((deviceMap['Tablet'] / total) * 100), color: 'hsl(214, 62%, 75%)' },
      ];
    },
    refetchInterval: 30000,
  });
};

export const useTopPages = (dateRange: DateRange) => {
  return useQuery({
    queryKey: ['top-pages', dateRange],
    queryFn: async (): Promise<TopPage[]> => {
      const startDate = getDateRangeFilter(dateRange);

      const { data, error } = await supabase
        .from('page_views')
        .select('page_path, page_title, visitor_id')
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      const pageMap = new Map<string, { title: string; views: number; visitors: Set<string> }>();

      data?.forEach(view => {
        const path = view.page_path;
        if (!pageMap.has(path)) {
          pageMap.set(path, { title: view.page_title || path, views: 0, visitors: new Set() });
        }
        const entry = pageMap.get(path)!;
        entry.views++;
        entry.visitors.add(view.visitor_id);
      });

      const pageNames: Record<string, string> = {
        '/': 'Нүүр хуудас',
        '/services': 'Бүтээгдэхүүн',
        '/about': 'Бидний тухай',
        '/contact': 'Холбоо барих',
        '/team': 'Манай баг',
        '/partners': 'Хамтрагчид',
      };

      return Array.from(pageMap.entries())
        .map(([path, data]) => ({
          page: pageNames[path] || data.title || path,
          views: data.views,
          uniqueViews: data.visitors.size,
          avgTime: '2:30',
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
    },
    refetchInterval: 30000,
  });
};

export const useGeoDistribution = (dateRange: DateRange) => {
  return useQuery({
    queryKey: ['geo-distribution', dateRange],
    queryFn: async (): Promise<GeoData[]> => {
      const startDate = getDateRangeFilter(dateRange);

      const { data, error } = await supabase
        .from('page_views')
        .select('country, visitor_id')
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      const countryMap = new Map<string, Set<string>>();

      data?.forEach(view => {
        const country = view.country || 'Монгол';
        if (!countryMap.has(country)) {
          countryMap.set(country, new Set());
        }
        countryMap.get(country)!.add(view.visitor_id);
      });

      const total = data?.length || 1;

      return Array.from(countryMap.entries())
        .map(([country, visitors]) => ({
          country,
          visitors: visitors.size,
          percentage: Math.round((visitors.size / new Set(data?.map(d => d.visitor_id)).size) * 100),
        }))
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 5);
    },
    refetchInterval: 30000,
  });
};

export const useRealtimeStats = () => {
  const [stats, setStats] = useState<RealtimeStats>({
    activeNow: 0,
    todayTotal: 0,
    thisHour: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const now = new Date();
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      // Today total
      const { data: todayData } = await supabase
        .from('page_views')
        .select('visitor_id')
        .gte('created_at', today.toISOString());

      // This hour
      const { data: hourData } = await supabase
        .from('page_views')
        .select('visitor_id')
        .gte('created_at', oneHourAgo.toISOString());

      // Active now (last 5 minutes)
      const { data: activeData } = await supabase
        .from('page_views')
        .select('visitor_id')
        .gte('created_at', fiveMinutesAgo.toISOString());

      setStats({
        todayTotal: new Set(todayData?.map(d => d.visitor_id)).size,
        thisHour: new Set(hourData?.map(d => d.visitor_id)).size,
        activeNow: new Set(activeData?.map(d => d.visitor_id)).size,
      });
    };

    fetchStats();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('page-views-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'page_views',
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  return stats;
};

// Page view tracker hook
export const usePageTracker = () => {
  useEffect(() => {
    const trackPageView = async () => {
      // Generate or get visitor ID from localStorage
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      // Generate session ID (expires after 30 minutes of inactivity)
      let sessionId = sessionStorage.getItem('session_id');
      const lastActivity = sessionStorage.getItem('last_activity');
      const now = Date.now();

      if (!sessionId || !lastActivity || now - parseInt(lastActivity) > 30 * 60 * 1000) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('session_id', sessionId);
      }
      sessionStorage.setItem('last_activity', now.toString());

      // Detect device type
      const userAgent = navigator.userAgent.toLowerCase();
      let deviceType = 'desktop';
      if (/mobile|android|iphone|ipad|tablet/i.test(userAgent)) {
        deviceType = /tablet|ipad/i.test(userAgent) ? 'tablet' : 'mobile';
      }

      // Detect referrer source
      let referrerSource = 'Direct';
      const referrer = document.referrer;
      if (referrer) {
        if (/google|bing|yahoo|duckduckgo/i.test(referrer)) {
          referrerSource = 'Organic Search';
        } else if (/facebook|twitter|instagram|linkedin|tiktok/i.test(referrer)) {
          referrerSource = 'Social';
        } else if (!referrer.includes(window.location.hostname)) {
          referrerSource = 'Referral';
        }
      }

      // Insert page view
      await supabase.from('page_views').insert({
        page_path: window.location.pathname,
        page_title: document.title,
        visitor_id: visitorId,
        session_id: sessionId,
        referrer: referrer || null,
        referrer_source: referrerSource,
        device_type: deviceType,
        country: 'Mongolia', // Default, could use geo-ip service
      });
    };

    trackPageView();
  }, []);
};
