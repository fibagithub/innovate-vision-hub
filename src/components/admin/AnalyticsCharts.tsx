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
import { DateRange } from '@/hooks/useAnalytics';

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

interface TrafficOverviewChartProps {
  data: TrafficDataPoint[];
  isLoading?: boolean;
}

interface RealtimeChartProps {
  data: HourlyDataPoint[];
  isLoading?: boolean;
}

interface TrafficSourcesChartProps {
  data: TrafficSource[];
  isLoading?: boolean;
}

interface DeviceChartProps {
  data: DeviceData[];
  isLoading?: boolean;
}

interface TopPagesTableProps {
  data: TopPage[];
  isLoading?: boolean;
}

interface GeoDistributionProps {
  data: GeoData[];
  isLoading?: boolean;
}

const LoadingSkeleton = ({ height = 200 }: { height?: number }) => (
  <div className={`h-[${height}px] w-full flex items-center justify-center`}>
    <div className="animate-pulse flex flex-col items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-muted"></div>
      <div className="h-2 w-24 rounded bg-muted"></div>
    </div>
  </div>
);

export const TrafficOverviewChart = ({ data, isLoading }: TrafficOverviewChartProps) => {
  if (isLoading) return <LoadingSkeleton height={300} />;
  
  const hasData = data.some(d => d.visitors > 0 || d.pageViews > 0);
  
  if (!hasData) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
        Мэдээлэл байхгүй байна
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
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
};

export const RealtimeChart = ({ data, isLoading }: RealtimeChartProps) => {
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
};

export const TrafficSourcesChart = ({ data, isLoading }: TrafficSourcesChartProps) => {
  if (isLoading) return <LoadingSkeleton height={250} />;

  const hasData = data.some(d => d.value > 0);
  
  if (!hasData) {
    return (
      <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground">
        Мэдээлэл байхгүй
      </div>
    );
  }

  return (
    <div className="h-[250px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
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
};

export const DeviceChart = ({ data, isLoading }: DeviceChartProps) => {
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TrafficSourcesLegend = ({ data, isLoading }: TrafficSourcesChartProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
            </div>
            <div className="h-4 w-8 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((source, index) => (
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
};

export const TopPagesTable = ({ data, isLoading }: TopPagesTableProps) => {
  if (isLoading) {
    return (
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
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="border-b border-border/50 animate-pulse">
                <td className="py-3 px-4"><div className="h-4 w-24 rounded bg-muted" /></td>
                <td className="py-3 px-4 text-right"><div className="h-4 w-12 rounded bg-muted ml-auto" /></td>
                <td className="py-3 px-4 text-right"><div className="h-4 w-12 rounded bg-muted ml-auto" /></td>
                <td className="py-3 px-4 text-right"><div className="h-4 w-10 rounded bg-muted ml-auto" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Мэдээлэл байхгүй байна
      </div>
    );
  }

  return (
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
          {data.map((page, index) => (
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
};

export const GeoDistribution = ({ data, isLoading }: GeoDistributionProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center justify-between mb-1">
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="h-4 w-12 rounded bg-muted" />
            </div>
            <div className="h-2 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Мэдээлэл байхгүй
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((geo, index) => (
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
};
