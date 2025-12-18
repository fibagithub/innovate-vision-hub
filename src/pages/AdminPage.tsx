import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Package },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Partners', href: '/admin/partners', icon: Building2 },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const stats = [
  { label: 'Total Visitors', value: '12,543', change: '+12.5%', trend: 'up', icon: Eye },
  { label: 'Page Views', value: '45,234', change: '+8.2%', trend: 'up', icon: Activity },
  { label: 'Avg. Session', value: '3m 42s', change: '-2.1%', trend: 'down', icon: TrendingDown },
  { label: 'Bounce Rate', value: '34.2%', change: '-5.3%', trend: 'up', icon: TrendingUp },
];

const pageViews = [
  { page: 'Home', views: 15234, percentage: 45 },
  { page: 'Services', views: 8432, percentage: 25 },
  { page: 'About', views: 5621, percentage: 17 },
  { page: 'Contact', views: 2845, percentage: 8 },
  { page: 'Team', views: 1654, percentage: 5 },
];

const recentActivity = [
  { action: 'Service updated', item: 'Cloud Solutions', time: '2 hours ago' },
  { action: 'Team member added', item: 'John Smith', time: '5 hours ago' },
  { action: 'Partner added', item: 'Microsoft Azure', time: '1 day ago' },
  { action: 'Content updated', item: 'About Page', time: '2 days ago' },
];

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">F</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={cn(
                    'text-sm font-medium',
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Page Views */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="font-display text-lg font-semibold text-foreground mb-6">
                Top Pages
              </h2>
              <div className="space-y-4">
                {pageViews.map((page, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-foreground font-medium">{page.page}</span>
                      <span className="text-muted-foreground text-sm">{page.views.toLocaleString()} views</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${page.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="font-display text-lg font-semibold text-foreground mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-foreground font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.item}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
            <h2 className="font-display text-lg font-semibold text-foreground mb-6">
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Add Service</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Add Team Member</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>Add Partner</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <Edit className="w-5 h-5" />
                <span>Edit Content</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
