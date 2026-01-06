import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { usePageTracker } from '@/hooks/useAnalytics';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Track page views
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

      // Import supabase dynamically to avoid circular dependency
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Insert page view
      await supabase.from('page_views').insert({
        page_path: location.pathname,
        page_title: document.title,
        visitor_id: visitorId,
        session_id: sessionId,
        referrer: referrer || null,
        referrer_source: referrerSource,
        device_type: deviceType,
        country: 'Mongolia',
      });
    };

    trackPageView();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
