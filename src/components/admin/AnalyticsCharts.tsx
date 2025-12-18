import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

// Traffic data for the last 7 days
const trafficData = [
  { name: 'Mon', visitors: 2400, pageViews: 4800, sessions: 3200 },
  { name: 'Tue', visitors: 1398, pageViews: 3200, sessions: 2100 },
  { name: 'Wed', visitors: 9800, pageViews: 15400, sessions: 11200 },
  { name: 'Thu', visitors: 3908, pageViews: 6800, sessions: 4500 },
  { name: 'Fri', visitors: 4800, pageViews: 8200, sessions: 5800 },
  { name: 'Sat', visitors: 3800, pageViews: 6100, sessions: 4200 },
  { name: 'Sun', visitors: 4300, pageViews: 7400, sessions: 5100 },
];

// Hourly data for today
const hourlyData = [
  { hour: '00:00', visitors: 120 },
  { hour: '02:00', visitors: 85 },
  { hour: '04:00', visitors: 45 },
  { hour: '06:00', visitors: 78 },
  { hour: '08:00', visitors: 320 },
  { hour: '10:00', visitors: 580 },
  { hour: '12:00', visitors: 620 },
  { hour: '14:00', visitors: 750 },
  { hour: '16:00', visitors: 680 },
  { hour: '18:00', visitors: 520 },
  { hour: '20:00', visitors: 380 },
  { hour: '22:00', visitors: 220 },
];

// Traffic sources
const trafficSources = [
  { name: 'Organic Search', value: 45, color: 'hsl(214, 62%, 25%)' },
  { name: 'Direct', value: 28, color: 'hsl(214, 62%, 45%)' },
  { name: 'Social', value: 15, color: 'hsl(214, 62%, 65%)' },
  { name: 'Referral', value: 12, color: 'hsl(214, 62%, 85%)' },
];

// Device breakdown
const deviceData = [
  { name: 'Desktop', value: 58, color: 'hsl(214, 62%, 25%)' },
  { name: 'Mobile', value: 35, color: 'hsl(214, 62%, 50%)' },
  { name: 'Tablet', value: 7, color: 'hsl(214, 62%, 75%)' },
];

// Top pages with more detail
const topPagesData = [
  { page: 'Нүүр хуудас', views: 15234, uniqueViews: 12543, avgTime: '2:45' },
  { page: 'Бүтээгдэхүүн', views: 8432, uniqueViews: 7123, avgTime: '3:12' },
  { page: 'Бидний тухай', views: 5621, uniqueViews: 4892, avgTime: '1:58' },
  { page: 'Холбоо барих', views: 2845, uniqueViews: 2456, avgTime: '1:23' },
  { page: 'Манай баг', views: 1654, uniqueViews: 1432, avgTime: '2:05' },
];

// Geographic data
const geoData = [
  { country: 'Монгол', visitors: 8543, percentage: 68 },
  { country: 'БНСУ', visitors: 1234, percentage: 10 },
  { country: 'АНУ', visitors: 987, percentage: 8 },
  { country: 'Хятад', visitors: 876, percentage: 7 },
  { country: 'Бусад', visitors: 903, percentage: 7 },
];

export const TrafficOverviewChart = () => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={trafficData}>
        <defs>
          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(214, 62%, 25%)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(214, 62%, 25%)" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(214, 62%, 50%)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(214, 62%, 50%)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Area 
          type="monotone" 
          dataKey="visitors" 
          stroke="hsl(214, 62%, 25%)" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorVisitors)" 
          name="Зочид"
        />
        <Area 
          type="monotone" 
          dataKey="pageViews" 
          stroke="hsl(214, 62%, 50%)" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorPageViews)" 
          name="Хуудас үзэлт"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const RealtimeChart = () => (
  <div className="h-[200px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={hourlyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="visitors" 
          stroke="hsl(214, 62%, 25%)" 
          strokeWidth={2}
          dot={{ fill: 'hsl(214, 62%, 25%)', strokeWidth: 0, r: 3 }}
          activeDot={{ r: 5, fill: 'hsl(214, 62%, 25%)' }}
          name="Зочид"
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const TrafficSourcesChart = () => (
  <div className="h-[250px] w-full flex items-center justify-center">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={trafficSources}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
        >
          {trafficSources.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
          formatter={(value: number) => [`${value}%`, '']}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const DeviceChart = () => (
  <div className="h-[200px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={deviceData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
        <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={60} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
          formatter={(value: number) => [`${value}%`, '']}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {deviceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const TrafficSourcesLegend = () => (
  <div className="space-y-3">
    {trafficSources.map((source, index) => (
      <div key={index} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
          <span className="text-sm text-foreground">{source.name}</span>
        </div>
        <span className="text-sm font-semibold text-foreground">{source.value}%</span>
      </div>
    ))}
  </div>
);

export const TopPagesTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Хуудас</th>
          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Үзэлт</th>
          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Давтагдаагүй</th>
          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Дундаж хугацаа</th>
        </tr>
      </thead>
      <tbody>
        {topPagesData.map((page, index) => (
          <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
            <td className="py-3 px-4 text-sm font-medium text-foreground">{page.page}</td>
            <td className="text-right py-3 px-4 text-sm text-foreground">{page.views.toLocaleString()}</td>
            <td className="text-right py-3 px-4 text-sm text-muted-foreground">{page.uniqueViews.toLocaleString()}</td>
            <td className="text-right py-3 px-4 text-sm text-muted-foreground">{page.avgTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const GeoDistribution = () => (
  <div className="space-y-3">
    {geoData.map((geo, index) => (
      <div key={index}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground">{geo.country}</span>
          <span className="text-sm text-muted-foreground">{geo.visitors.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${geo.percentage}%`,
              backgroundColor: `hsl(214, 62%, ${25 + index * 12}%)`
            }}
          />
        </div>
      </div>
    ))}
  </div>
);
