import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Edit,
  Eye,
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Monitor,
  Smartphone,
  Clock,
  MousePointer,
  ArrowUpRight,
  Users,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  TrafficOverviewChart,
  RealtimeChart,
  TrafficSourcesChart,
  TrafficSourcesLegend,
  DeviceChart,
  TopPagesTable,
  GeoDistribution
} from '@/components/admin/AnalyticsCharts';
import {
  useAnalyticsStats,
  useTrafficOverview,
  useHourlyData,
  useTrafficSources,
  useDeviceBreakdown,
  useTopPages,
  useGeoDistribution,
  useRealtimeStats,
  DateRange
} from '@/hooks/useAnalytics';

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const navigate = useNavigate();

  // Real data hooks
  const { data: stats, isLoading: statsLoading } = useAnalyticsStats(dateRange);
  const { data: trafficData, isLoading: trafficLoading } = useTrafficOverview(dateRange);
  const { data: hourlyData, isLoading: hourlyLoading } = useHourlyData();
  const { data: trafficSources, isLoading: sourcesLoading } = useTrafficSources(dateRange);
  const { data: deviceData, isLoading: devicesLoading } = useDeviceBreakdown(dateRange);
  const { data: topPages, isLoading: pagesLoading } = useTopPages(dateRange);
  const { data: geoData, isLoading: geoLoading } = useGeoDistribution(dateRange);
  const realtimeStats = useRealtimeStats();

  // Calculate percentage changes
  const getChange = (current: number, previous: number) => {
    if (previous === 0) return { value: '+0%', trend: 'up' as const };
    const change = ((current - previous) / previous) * 100;
    return {
      value: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
      trend: change >= 0 ? 'up' as const : 'down' as const
    };
  };

  const visitorChange = stats ? getChange(stats.totalVisitors, stats.previousVisitors) : { value: '+0%', trend: 'up' as const };
  const pageViewChange = stats ? getChange(stats.totalPageViews, stats.previousPageViews) : { value: '+0%', trend: 'up' as const };

  const mainStats = [
    { 
      label: 'Нийт зочид', 
      value: stats?.totalVisitors.toLocaleString() || '0', 
      change: visitorChange.value, 
      trend: visitorChange.trend, 
      icon: Eye, 
      subtext: `Өмнөх ${dateRange}-тэй харьцуулахад` 
    },
    { 
      label: 'Хуудас үзэлт', 
      value: stats?.totalPageViews.toLocaleString() || '0', 
      change: pageViewChange.value, 
      trend: pageViewChange.trend, 
      icon: Activity, 
      subtext: `Өмнөх ${dateRange}-тэй харьцуулахад` 
    },
    { 
      label: 'Дундаж хугацаа', 
      value: stats?.avgSessionDuration || '0с', 
      change: '+0%', 
      trend: 'up' as const, 
      icon: Clock, 
      subtext: 'Сессийн дундаж үргэлжлэх хугацаа' 
    },
    { 
      label: 'Буцах хувь', 
      value: `${stats?.bounceRate || 0}%`, 
      change: '-0%', 
      trend: 'up' as const, 
      icon: MousePointer, 
      subtext: `Өмнөх ${dateRange}-тэй харьцуулахад` 
    },
  ];

  const realtimeStatsDisplay = [
    { label: 'Одоо идэвхтэй', value: realtimeStats.activeNow.toLocaleString(), icon: Activity },
    { label: 'Өнөөдөр нийт', value: realtimeStats.todayTotal.toLocaleString(), icon: Eye },
    { label: 'Энэ цагт', value: realtimeStats.thisHour.toLocaleString(), icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-foreground">Аналитик Dashboard</h1>
          <p className="text-sm text-muted-foreground">Вэбсайтын статистик мэдээлэл</p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {(['24h', '7d', '30d', '90d'] as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                dateRange === range
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Realtime Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {realtimeStatsDisplay.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
            {index === 0 && (
              <div className="ml-auto flex items-center gap-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs text-green-500 font-medium">LIVE</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat, index) => (
          <div key={index} className="p-5 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={cn(
                'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full',
                stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              )}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </span>
            </div>
            <div className="font-display text-3xl font-bold text-foreground mb-1">
              {statsLoading ? '...' : stat.value}
            </div>
            <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.subtext}</div>
          </div>
        ))}
      </div>

      {/* Traffic Overview Chart */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Трафикийн тойм</h2>
            <p className="text-sm text-muted-foreground">Зочид болон хуудас үзэлтийн график</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Зочид</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/50" />
              <span className="text-sm text-muted-foreground">Хуудас үзэлт</span>
            </div>
          </div>
        </div>
        <TrafficOverviewChart data={trafficData || []} isLoading={trafficLoading} />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Трафикийн эх үүсвэр</h2>
              <p className="text-sm text-muted-foreground">Хэрэглэгчид хаанаас ирсэн</p>
            </div>
            <Globe className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TrafficSourcesChart data={trafficSources || []} isLoading={sourcesLoading} />
            <TrafficSourcesLegend data={trafficSources || []} isLoading={sourcesLoading} />
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Төхөөрөмжийн төрөл</h2>
              <p className="text-sm text-muted-foreground">Хэрэглэгчдийн төхөөрөмж</p>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-muted-foreground" />
              <Smartphone className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <DeviceChart data={deviceData || []} isLoading={devicesLoading} />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {(deviceData || [{ name: 'Desktop', value: 0 }, { name: 'Mobile', value: 0 }, { name: 'Tablet', value: 0 }]).map((device, index) => (
              <div key={device.name} className="text-center p-3 rounded-lg bg-muted/50">
                {index === 0 || index === 2 ? (
                  <Monitor className={cn("w-5 h-5 mx-auto mb-1", index === 0 ? "text-primary" : "text-primary/50")} />
                ) : (
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-primary/70" />
                )}
                <div className="text-lg font-bold text-foreground">{device.value}%</div>
                <div className="text-xs text-muted-foreground">{device.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Realtime Activity */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Өнөөдрийн идэвхи</h2>
            <p className="text-sm text-muted-foreground">Цаг тутмын зочдын тоо</p>
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">Real-time</span>
          </div>
        </div>
        <RealtimeChart data={hourlyData || []} isLoading={hourlyLoading} />
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Шилдэг хуудсууд</h2>
              <p className="text-sm text-muted-foreground">Хамгийн их үзэлттэй хуудсууд</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              Бүгдийг харах <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <TopPagesTable data={topPages || []} isLoading={pagesLoading} />
        </div>

        {/* Geographic Distribution */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Байршил</h2>
              <p className="text-sm text-muted-foreground">Улс орноор</p>
            </div>
            <Globe className="w-5 h-5 text-muted-foreground" />
          </div>
          <GeoDistribution data={geoData || []} isLoading={geoLoading} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h2 className="font-display text-lg font-semibold text-foreground mb-6">
          Түргэн үйлдлүүд
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2" 
            onClick={() => navigate('/admin/services')}
          >
            <Plus className="w-5 h-5" />
            <span>Үйлчилгээ нэмэх</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2" 
            onClick={() => navigate('/admin/team')}
          >
            <Users className="w-5 h-5" />
            <span>Гишүүн нэмэх</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2" 
            onClick={() => navigate('/admin/partners')}
          >
            <Building2 className="w-5 h-5" />
            <span>Хамтрагч нэмэх</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2" 
            onClick={() => navigate('/admin/services')}
          >
            <Edit className="w-5 h-5" />
            <span>Контент засах</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
