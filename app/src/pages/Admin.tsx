import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemePreset } from '../contexts/ThemeContext';
import type { SiteData, NavItem, NewsArticle, Indicator, Partner, Country } from '../data/siteData';
import { defaultSiteData } from '../data/siteData';
import {
  LayoutDashboard, FileText, Menu, Newspaper, BarChart3, Users, Globe,
  Palette, Image, Settings, LogOut, Eye, Target, TrendingUp, AlertTriangle,
  ChevronRight, ChevronDown, Save, Plus, Pencil, Trash2, ArrowUp, ArrowDown,
  Search, X, Upload, Check, Circle, ExternalLink, Shield,
  Lock, Clock, DollarSign, MapPin, Building2, Zap, RefreshCw,
  ChevronUp, Download, Copy, Filter, MoreHorizontal
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface ActivityLogEntry {
  id: string;
  timestamp: number;
  action: string;
  details: string;
}

interface MediaItem {
  id: string;
  name: string;
  category: string;
  size: string;
  dimensions: string;
  dataUrl: string;
  createdAt: number;
}

type AdminSection =
  | 'dashboard'
  | 'content'
  | 'navigation'
  | 'news'
  | 'indicators'
  | 'partners'
  | 'countries'
  | 'theme'
  | 'media'
  | 'settings';

/* ──────────────────────────────────────────────
   Utility / localStorage helpers
   ────────────────────────────────────────────── */
const LS_KEYS = {
  AUTH: 'mgd-admin-auth',
  ACTIVITY: 'meridian_activity_log',
  MEDIA: 'meridian_media',
  CUSTOM_THEME: 'meridian_custom_theme',
};

function loadActivityLog(): ActivityLogEntry[] {
  try {
    const saved = localStorage.getItem(LS_KEYS.ACTIVITY);
    return saved ? JSON.parse(saved) : getDefaultActivities();
  } catch {
    return getDefaultActivities();
  }
}

function saveActivityLog(log: ActivityLogEntry[]) {
  localStorage.setItem(LS_KEYS.ACTIVITY, JSON.stringify(log));
}

function addActivity(action: string, details: string) {
  const entry: ActivityLogEntry = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    timestamp: Date.now(),
    action,
    details,
  };
  const log = [entry, ...loadActivityLog()].slice(0, 50);
  saveActivityLog(log);
}

function getDefaultActivities(): ActivityLogEntry[] {
  const now = Date.now();
  return [
    { id: '1', timestamp: now - 120000, action: 'Article Published', details: 'Article "Phase II Launch" published' },
    { id: '2', timestamp: now - 900000, action: 'Indicator Updated', details: 'Indicator "Households Connected" updated to 12,400' },
    { id: '3', timestamp: now - 3600000, action: 'Partner Updated', details: 'Partner logo "Atlas International" uploaded' },
    { id: '4', timestamp: now - 10800000, action: 'Theme Changed', details: 'Theme changed to "Forest Green"' },
    { id: '5', timestamp: now - 86400000, action: 'Navigation Updated', details: 'Navigation item "Resources" reordered' },
    { id: '6', timestamp: now - 172800000, action: 'Article Created', details: 'New article "Cooperative Income Report" created' },
    { id: '7', timestamp: now - 259200000, action: 'Country Updated', details: 'Country "Ostmark" stats updated' },
    { id: '8', timestamp: now - 604800000, action: 'Media Uploaded', details: 'Media file "hero-aerial.jpg" uploaded' },
    { id: '9', timestamp: now - 604800000, action: 'Indicator Updated', details: 'Indicator "Roads Constructed" updated to 847' },
    { id: '10', timestamp: now - 604800000, action: 'Content Edited', details: 'Content "Home Hero Headline" edited' },
  ];
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return days === 1 ? 'Yesterday' : `${days} days ago`;
  return `${Math.floor(days / 7)} wk ago`;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadMedia(): MediaItem[] {
  try {
    const saved = localStorage.getItem(LS_KEYS.MEDIA);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return getDefaultMedia();
}

function saveMedia(media: MediaItem[]) {
  localStorage.setItem(LS_KEYS.MEDIA, JSON.stringify(media));
}

function getDefaultMedia(): MediaItem[] {
  return [
    { id: 'm1', name: 'hero-aerial.jpg', category: 'Hero', size: '2.4MB', dimensions: '1920×1080', dataUrl: '', createdAt: Date.now() - 604800000 },
    { id: 'm2', name: 'news-thumb-1.jpg', category: 'News', size: '340KB', dimensions: '800×450', dataUrl: '', createdAt: Date.now() - 500000000 },
    { id: 'm3', name: 'news-thumb-2.jpg', category: 'News', size: '290KB', dimensions: '800×450', dataUrl: '', createdAt: Date.now() - 400000000 },
    { id: 'm4', name: 'news-thumb-3.jpg', category: 'News', size: '310KB', dimensions: '800×450', dataUrl: '', createdAt: Date.now() - 300000000 },
    { id: 'm5', name: 'partner-logo-1.svg', category: 'Logos', size: '8KB', dimensions: '200×60', dataUrl: '', createdAt: Date.now() - 200000000 },
    { id: 'm6', name: 'partner-logo-2.svg', category: 'Logos', size: '8KB', dimensions: '200×60', dataUrl: '', createdAt: Date.now() - 100000000 },
  ];
}

/* ──────────────────────────────────────────────
   KPI Data for chart
   ────────────────────────────────────────────── */
const chartData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 5800 },
  { name: 'Mar', value: 7200 },
  { name: 'Apr', value: 6800 },
  { name: 'May', value: 8900 },
  { name: 'Jun', value: 10200 },
  { name: 'Jul', value: 12400 },
  { name: 'Aug', value: 11800 },
  { name: 'Sep', value: 13500 },
  { name: 'Oct', value: 15200 },
  { name: 'Nov', value: 16800 },
  { name: 'Dec', value: 24891 },
];

/* ──────────────────────────────────────────────
   Sidebar Nav Items
   ────────────────────────────────────────────── */
const sidebarNav: { icon: React.ElementType; label: string; key: AdminSection }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: FileText, label: 'Content', key: 'content' },
  { icon: Menu, label: 'Navigation', key: 'navigation' },
  { icon: Newspaper, label: 'News', key: 'news' },
  { icon: BarChart3, label: 'Indicators', key: 'indicators' },
  { icon: Users, label: 'Partners', key: 'partners' },
  { icon: Globe, label: 'Countries', key: 'countries' },
  { icon: Palette, label: 'Theme Settings', key: 'theme' },
  { icon: Image, label: 'Media Library', key: 'media' },
  { icon: Settings, label: 'Settings', key: 'settings' },
];

/* ═══════════════════════════════════════════════
   LOGIN SCREEN
   ═══════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  // Pre-filled demo credentials for easy access
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  // Auto-login after 800ms for demo convenience
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(LS_KEYS.AUTH, 'true');
      addActivity('Admin Login', 'Auto-login with demo credentials');
      onLogin();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem(LS_KEYS.AUTH, 'true');
      addActivity('Admin Login', 'User logged in to admin panel');
      onLogin();
    } else {
      setError('Invalid username or password');
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-dark)' }}
    >
      <div
        className={`w-full max-w-[400px] transition-all duration-400 ${shake ? 'animate-pulse' : ''}`}
        style={{
          backgroundColor: 'var(--bg-white)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          padding: '48px',
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h2
            className="text-xl font-bold tracking-[0.12em]"
            style={{ color: 'var(--primary-blue)' }}
          >
            MERIDIAN
          </h2>
          <p className="label-caption mt-1" style={{ color: 'var(--text-muted)' }}>
            ADMIN PORTAL
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="label-caption block mb-2">USERNAME</Label>
            <Input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 rounded-none"
              style={{ borderColor: error ? 'var(--error)' : 'var(--border)' }}
            />
          </div>
          <div>
            <Label className="label-caption block mb-2">PASSWORD</Label>
            <Input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-none"
              style={{ borderColor: error ? 'var(--error)' : 'var(--border)' }}
            />
          </div>
          {error && (
            <p className="text-sm" style={{ color: 'var(--error)' }}>
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-12 rounded-none text-sm font-semibold tracking-wider"
            style={{ backgroundColor: 'var(--medium-blue)' }}
          >
            <Lock size={16} className="mr-2" />
            SIGN IN
          </Button>
        </form>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--text-muted)' }}>
          Demo credentials: admin / admin
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DASHBOARD OVERVIEW
   ═══════════════════════════════════════════════ */
function DashboardSection({ siteData }: { siteData: SiteData }) {
  const activities = loadActivityLog();

  const totalBeneficiaries = siteData.indicators.reduce((sum, ind) => {
    if (ind.label.toLowerCase().includes('household')) return sum + ind.current;
    return sum;
  }, 12400);

  const __onTrackCount = siteData.indicators.filter(i => i.status === 'On Track').length;
  const publishedCount = siteData.news.length;
  const activeCountries = siteData.countries.length;

  const kpis = [
    { label: 'Total Beneficiaries', value: totalBeneficiaries.toLocaleString(), sub: 'Across all programs', icon: Users, color: 'var(--medium-blue)' },
    { label: 'Active Countries', value: String(activeCountries), sub: 'Partner nations', icon: Globe, color: 'var(--success)' },
    { label: 'Published Articles', value: String(publishedCount), sub: 'News articles', icon: Newspaper, color: 'var(--accent)' },
    { label: 'Program Budget', value: '$450M', sub: 'Total allocation', icon: DollarSign, color: 'var(--light-blue)' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-none border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="label-caption mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{kpi.sub}</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border)' }}>
                  <kpi.icon size={20} style={{ color: kpi.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 rounded-none border" style={{ borderColor: 'var(--border)' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Site Activity — Monthly Trends
            </CardTitle>
            <CardDescription>Page views and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--medium-blue)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--medium-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border)' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={{ stroke: 'var(--border)' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: 0 }}
                    labelStyle={{ color: 'var(--text-primary)', fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="value" stroke="var(--medium-blue)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-none border" style={{ borderColor: 'var(--border)' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Add News Article', icon: Plus, section: 'news' },
              { label: 'Edit Navigation', icon: Menu, section: 'navigation' },
              { label: 'Update Indicators', icon: BarChart3, section: 'indicators' },
              { label: 'Manage Partners', icon: Users, section: 'partners' },
              { label: 'Change Theme', icon: Palette, section: 'theme' },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-grey)' }}
              >
                <action.icon size={16} style={{ color: 'var(--medium-blue)' }} />
                {action.label}
                <ChevronRight size={14} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-none border" style={{ borderColor: 'var(--border)' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold" style={{ fontFamily: 'Barlow, sans-serif' }}>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {activities.slice(0, 10).map((act) => (
              <div key={act.id} className="flex items-center gap-4 py-3">
                <Clock size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span className="text-xs w-20 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {formatTimeAgo(act.timestamp)}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 flex-shrink-0" style={{ backgroundColor: 'var(--bg-grey)', color: 'var(--medium-blue)' }}>
                  {act.action}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {act.details}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CONTENT EDITOR
   ═══════════════════════════════════════════════ */
function ContentEditor({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [localData, setLocalData] = useState<SiteData>(siteData);

  useEffect(() => {
    setLocalData(siteData);
  }, [siteData]);

  const pages = [
    { id: 'home', label: 'Home Page', fields: ['heroHeadline', 'heroDescription', 'stats'] },
    { id: 'about', label: 'About Page', fields: ['title', 'subtitle', 'description'] },
    { id: 'programs', label: 'Programs Page', fields: ['programComponents'] },
    { id: 'countries', label: 'Countries Page', fields: ['countries'] },
    { id: 'results', label: 'Results Page', fields: ['indicators'] },
    { id: 'partners', label: 'Partners Page', fields: ['partners'] },
    { id: 'resources', label: 'Resources Page', fields: ['resources'] },
    { id: 'news', label: 'News Page', fields: ['news'] },
    { id: 'contact', label: 'Contact Page', fields: ['title', 'description'] },
  ];

  const handleSave = () => {
    updateSiteData({
      heroHeadline: localData.heroHeadline,
      heroDescription: localData.heroDescription,
      stats: localData.stats,
    });
    addActivity('Content Updated', `Updated content for ${selectedPage}`);
  };

  const handleReset = () => {
    setLocalData(siteData);
  };

  return (
    <div className="flex gap-0 border" style={{ borderColor: 'var(--border)', minHeight: 600 }}>
      {/* Page Tree */}
      <div className="w-[280px] flex-shrink-0 border-r" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Pages</h3>
        </div>
        <ScrollArea className="h-[600px]">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page.id)}
              className="w-full text-left px-4 py-3 flex items-center gap-2 text-sm transition-colors"
              style={{
                backgroundColor: selectedPage === page.id ? 'var(--medium-blue)' : 'transparent',
                color: selectedPage === page.id ? '#fff' : 'var(--text-primary)',
              }}
            >
              <FileText size={16} />
              {page.label}
              <ChevronRight size={14} className="ml-auto" />
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {pages.find(p => p.id === selectedPage)?.label} — Editor
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} className="rounded-none gap-2">
              <RefreshCw size={14} /> Reset
            </Button>
            <Button onClick={handleSave} className="rounded-none gap-2" style={{ backgroundColor: 'var(--medium-blue)' }}>
              <Save size={14} /> Save Changes
            </Button>
          </div>
        </div>

        {/* Home Page Editor */}
        {selectedPage === 'home' && (
          <div className="space-y-6">
            <div>
              <Label className="label-caption block mb-2">HERO HEADLINE (Line 1)</Label>
              <Input
                value={localData.heroHeadline[0] || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, heroHeadline: [e.target.value, prev.heroHeadline[1] || '', prev.heroHeadline[2] || ''] }))}
                className="rounded-none h-12"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <Label className="label-caption block mb-2">HERO HEADLINE (Line 2)</Label>
              <Input
                value={localData.heroHeadline[1] || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, heroHeadline: [prev.heroHeadline[0] || '', e.target.value, prev.heroHeadline[2] || ''] }))}
                className="rounded-none h-12"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <Label className="label-caption block mb-2">HERO HEADLINE (Line 3)</Label>
              <Input
                value={localData.heroHeadline[2] || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, heroHeadline: [prev.heroHeadline[0] || '', prev.heroHeadline[1] || '', e.target.value] }))}
                className="rounded-none h-12"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <Label className="label-caption block mb-2">HERO DESCRIPTION</Label>
              <Textarea
                value={localData.heroDescription}
                onChange={(e) => setLocalData(prev => ({ ...prev, heroDescription: e.target.value }))}
                rows={4}
                className="rounded-none"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {localData.stats.map((stat, idx) => (
                <Card key={idx} className="rounded-none p-4" style={{ borderColor: 'var(--border)' }}>
                  <Label className="label-caption block mb-2">STAT {idx + 1} VALUE</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...localData.stats];
                      newStats[idx] = { ...stat, value: e.target.value };
                      setLocalData(prev => ({ ...prev, stats: newStats }));
                    }}
                    className="rounded-none h-10 mb-2"
                    style={{ borderColor: 'var(--border)' }}
                  />
                  <Label className="label-caption block mb-2">STAT {idx + 1} LABEL</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...localData.stats];
                      newStats[idx] = { ...stat, label: e.target.value };
                      setLocalData(prev => ({ ...prev, stats: newStats }));
                    }}
                    className="rounded-none h-10"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Programs Editor */}
        {selectedPage === 'programs' && (
          <div className="space-y-4">
            {localData.programComponents.map((prog, idx) => (
              <Card key={prog.id} className="rounded-none p-4" style={{ borderColor: 'var(--border)' }}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--medium-blue)' }}>
                  {prog.title}
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Title</Label>
                    <Input
                      value={prog.title}
                      onChange={(e) => {
                        const newProgs = [...localData.programComponents];
                        newProgs[idx] = { ...prog, title: e.target.value };
                        setLocalData(prev => ({ ...prev, programComponents: newProgs }));
                      }}
                      className="rounded-none h-10"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Description</Label>
                    <Textarea
                      value={prog.description}
                      onChange={(e) => {
                        const newProgs = [...localData.programComponents];
                        newProgs[idx] = { ...prog, description: e.target.value };
                        setLocalData(prev => ({ ...prev, programComponents: newProgs }));
                      }}
                      rows={2}
                      className="rounded-none"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Partners Editor */}
        {selectedPage === 'partners' && (
          <div className="space-y-4">
            {localData.partners.map((partner, idx) => (
              <Card key={partner.id} className="rounded-none p-4" style={{ borderColor: 'var(--border)' }}>
                <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--medium-blue)' }}>
                  {partner.name}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Name</Label>
                    <Input
                      value={partner.name}
                      onChange={(e) => {
                        const newPartners = [...localData.partners];
                        newPartners[idx] = { ...partner, name: e.target.value };
                        setLocalData(prev => ({ ...prev, partners: newPartners }));
                      }}
                      className="rounded-none h-10"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Role</Label>
                    <Input
                      value={partner.role}
                      onChange={(e) => {
                        const newPartners = [...localData.partners];
                        newPartners[idx] = { ...partner, role: e.target.value };
                        setLocalData(prev => ({ ...prev, partners: newPartners }));
                      }}
                      className="rounded-none h-10"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>Description</Label>
                    <Textarea
                      value={partner.description}
                      onChange={(e) => {
                        const newPartners = [...localData.partners];
                        newPartners[idx] = { ...partner, description: e.target.value };
                        setLocalData(prev => ({ ...prev, partners: newPartners }));
                      }}
                      rows={2}
                      className="rounded-none"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* About Page Editor */}
        {selectedPage === 'about' && (
          <div className="space-y-6">
            <div>
              <Label className="label-caption block mb-2">PAGE TITLE</Label>
              <Input
                placeholder="About Meridian"
                defaultValue="About Meridian"
                className="rounded-none h-12"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <Label className="label-caption block mb-2">SUBTITLE</Label>
              <Input
                placeholder="Our mission, vision, and approach"
                defaultValue="Our mission, vision, and approach"
                className="rounded-none h-12"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
            <div>
              <Label className="label-caption block mb-2">MAIN CONTENT</Label>
              <Textarea
                placeholder="Enter page content..."
                rows={10}
                className="rounded-none"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>
          </div>
        )}

        {/* Countries, Results, Resources, News, Contact */}
        {['countries', 'results', 'resources', 'news', 'contact'].includes(selectedPage) && (
          <div className="p-8 text-center" style={{ backgroundColor: 'var(--bg-grey)', border: '1px dashed var(--border)' }}>
            <FileText size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Use the dedicated {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Manager for full editing capabilities.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Navigate to {selectedPage === 'results' ? 'Indicators' : selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} in the sidebar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVIGATION EDITOR
   ═══════════════════════════════════════════════ */
function NavigationEditor({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const [items, setItems] = useState<NavItem[]>(siteData.navItems);
  const [editing, setEditing] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState('');

  useEffect(() => {
    setItems(siteData.navItems);
  }, [siteData.navItems]);

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const newItems = [...items];
    [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
    setItems(newItems);
    updateSiteData({ navItems: newItems });
    addActivity('Navigation Updated', `Moved "${items[idx].label}" up`);
  };

  const handleMoveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const newItems = [...items];
    [newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]];
    setItems(newItems);
    updateSiteData({ navItems: newItems });
    addActivity('Navigation Updated', `Moved "${items[idx].label}" down`);
  };

  const handleToggleVisibility = (idx: number) => {
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
    updateSiteData({ navItems: newItems });
    addActivity('Navigation Updated', `Removed "${items[idx].label}" from nav`);
  };

  const handleSaveEdit = (idx: number) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], label: editLabel };
    setItems(newItems);
    updateSiteData({ navItems: newItems });
    addActivity('Navigation Updated', `Renamed nav item to "${editLabel}"`);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Manage navigation menu items. Drag to reorder, click to edit.
        </p>
        <Button
          onClick={() => {
            const newItem: NavItem = { label: 'New Item', href: '#', megaMenu: [] };
            const newItems = [...items, newItem];
            setItems(newItems);
            updateSiteData({ navItems: newItems });
            addActivity('Navigation Updated', 'Added new nav item');
          }}
          className="rounded-none gap-2"
          style={{ backgroundColor: 'var(--medium-blue)' }}
        >
          <Plus size={16} /> Add Item
        </Button>
      </div>

      {items.map((item, idx) => (
        <Card
          key={`${item.label}-${idx}`}
          className="rounded-none border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.3 : 1 }}>
                <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} />
              </button>
              <button onClick={() => handleMoveDown(idx)} disabled={idx === items.length - 1} style={{ opacity: idx === items.length - 1 ? 0.3 : 1 }}>
                <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            <div
              className="w-8 h-8 flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ backgroundColor: 'var(--medium-blue)' }}
            >
              {idx + 1}
            </div>

            <div className="flex-1 min-w-0">
              {editing === idx ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="h-9 rounded-none w-48"
                    style={{ borderColor: 'var(--border)' }}
                    autoFocus
                  />
                  <Button size="sm" onClick={() => handleSaveEdit(idx)} className="rounded-none h-9" style={{ backgroundColor: 'var(--success)' }}>
                    <Check size={14} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditing(null)} className="rounded-none h-9">
                    <X size={14} />
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.href}</p>
                </div>
              )}
            </div>

            <Badge
              variant="outline"
              className="rounded-none text-xs"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              {item.megaMenu ? 'Has Dropdown' : 'Simple'}
            </Badge>

            <div className="flex items-center gap-1">
              <button
                onClick={() => { setEditing(idx); setEditLabel(item.label); }}
                className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-white"
                style={{ color: 'var(--medium-blue)' }}
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleToggleVisibility(idx)}
                className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-white"
                style={{ color: 'var(--error)' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════════
   NEWS MANAGER
   ═══════════════════════════════════════════════ */
function NewsManager({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<Partial<NewsArticle>>({
    title: '', category: 'Infrastructure', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), excerpt: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const articles = siteData.news.map(n => ({
    ...n,
    status: (n as NewsArticle & { status?: string }).status || 'published',
  }));

  const filtered = filter === 'all' ? articles : articles.filter(a => a.status === filter);

  const handleSave = () => {
    if (!formData.title) return;
    if (editingArticle) {
      const updated = siteData.news.map(n =>
        n.id === editingArticle.id ? { ...n, ...formData } as NewsArticle : n
      );
      updateSiteData({ news: updated });
      addActivity('Article Updated', `Updated "${formData.title}"`);
    } else {
      const newArticle: NewsArticle = {
        id: generateId(),
        title: formData.title || 'Untitled',
        excerpt: formData.excerpt || '',
        category: formData.category || 'Infrastructure',
        date: formData.date || new Date().toLocaleDateString(),
        image: '/news-thumb-1.jpg',
        slug: (formData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
        ...formData,
      } as NewsArticle;
      updateSiteData({ news: [...siteData.news, newArticle] });
      addActivity('Article Created', `Created "${newArticle.title}"`);
    }
    setIsDialogOpen(false);
    setEditingArticle(null);
    setFormData({ title: '', category: 'Infrastructure', date: '', excerpt: '' });
  };

  const handleDelete = (id: string) => {
    const article = siteData.news.find(n => n.id === id);
    updateSiteData({ news: siteData.news.filter(n => n.id !== id) });
    if (article) addActivity('Article Deleted', `Deleted "${article.title}"`);
    setDeleteConfirm(null);
  };

  const toggleStatus = (id: string) => {
    const updated = siteData.news.map(n => {
      if (n.id === id) {
        const currentStatus = (n as NewsArticle & { status?: string }).status || 'published';
        return { ...n, status: currentStatus === 'published' ? 'draft' : 'published' };
      }
      return n;
    });
    updateSiteData({ news: updated });
    addActivity('Article Status', `Toggled status for article ${id}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
              className="rounded-none text-xs capitalize"
              style={filter === f ? { backgroundColor: 'var(--medium-blue)' } : {}}
            >
              {f} ({f === 'all' ? articles.length : articles.filter(a => a.status === f).length})
            </Button>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-none gap-2"
              style={{ backgroundColor: 'var(--medium-blue)' }}
              onClick={() => {
                setEditingArticle(null);
                setFormData({ title: '', category: 'Infrastructure', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), excerpt: '' });
              }}
            >
              <Plus size={16} /> New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg rounded-none">
            <DialogHeader>
              <DialogTitle>{editingArticle ? 'Edit Article' : 'New Article'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="label-caption block mb-2">TITLE</Label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                  className="rounded-none"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="label-caption block mb-2">CATEGORY</Label>
                  <Select value={formData.category} onValueChange={v => setFormData(p => ({ ...p, category: v }))}>
                    <SelectTrigger className="rounded-none" style={{ borderColor: 'var(--border)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Infrastructure', 'Community', 'Climate', 'Partnership', 'Research', 'Evaluation', 'FUNDING'].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="label-caption block mb-2">DATE</Label>
                  <Input
                    value={formData.date}
                    onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                    className="rounded-none"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>
              </div>
              <div>
                <Label className="label-caption block mb-2">EXCERPT</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                  rows={3}
                  className="rounded-none"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
              <div>
                <Label className="label-caption block mb-2">CONTENT</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                  rows={6}
                  className="rounded-none"
                  style={{ borderColor: 'var(--border)' }}
                  placeholder="Full article content..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-none">Cancel</Button>
              <Button onClick={handleSave} className="rounded-none" style={{ backgroundColor: 'var(--medium-blue)' }}>
                {editingArticle ? 'Save Changes' : 'Create Article'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="border" style={{ borderColor: 'var(--border)' }}>
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: 'var(--bg-grey)' }}>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Title</TableHead>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Category</TableHead>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Date</TableHead>
              <TableHead className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Status</TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-right" style={{ color: 'var(--text-muted)' }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((article) => (
              <TableRow key={article.id} className="hover:bg-gray-50">
                <TableCell>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{article.title}</p>
                  <p className="text-xs truncate max-w-[300px]" style={{ color: 'var(--text-muted)' }}>{article.excerpt}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: 'var(--border)' }}>
                    {article.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm" style={{ color: 'var(--text-secondary)' }}>{article.date}</TableCell>
                <TableCell>
                  <Badge
                    className="rounded-none text-xs"
                    style={{
                      backgroundColor: (article as NewsArticle & { status?: string }).status === 'draft' ? 'var(--bg-grey)' : 'var(--success)',
                      color: (article as NewsArticle & { status?: string }).status === 'draft' ? 'var(--text-muted)' : '#fff',
                    }}
                  >
                    {(article as NewsArticle & { status?: string }).status === 'draft' ? 'Draft' : 'Published'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => {
                        setEditingArticle(article as NewsArticle);
                        setFormData({ ...article });
                        setIsDialogOpen(true);
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      style={{ color: 'var(--medium-blue)' }}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => toggleStatus(article.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      style={{ color: 'var(--accent)' }}
                      title="Toggle status"
                    >
                      {(article as NewsArticle & { status?: string }).status === 'draft' ? <Eye size={14} /> : <Zap size={14} />}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(article.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      style={{ color: 'var(--error)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="rounded-none max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete this article? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-none">Cancel</Button>
            <Button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="rounded-none" variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INDICATORS EDITOR
   ═══════════════════════════════════════════════ */
const defaultIndicators10: Indicator[] = [
  { id: 'households', label: 'Households connected to services', current: 12400, target: 14000, unit: '', status: 'On Track' },
  { id: 'roads', label: 'Kilometers of road constructed', current: 847, target: 1000, unit: 'km', status: 'On Track' },
  { id: 'water', label: 'Water points installed', current: 234, target: 280, unit: '', status: 'On Track' },
  { id: 'digital', label: 'Digital hubs established', current: 45, target: 50, unit: '', status: 'On Track' },
  { id: 'cooperatives', label: "Women's cooperatives supported", current: 156, target: 180, unit: '', status: 'At Risk' },
  { id: 'trained', label: 'People trained in skills programs', current: 8200, target: 10000, unit: '', status: 'On Track' },
  { id: 'disaster', label: 'Districts with disaster preparedness plans', current: 18, target: 25, unit: '', status: 'In Progress' },
  { id: 'climate', label: 'Hectares under climate-smart agriculture', current: 3400, target: 5000, unit: 'ha', status: 'At Risk' },
  { id: 'community', label: 'Community plans developed', current: 42, target: 45, unit: '', status: 'On Track' },
  { id: 'research', label: 'Joint research publications', current: 4, target: 6, unit: '', status: 'In Progress' },
];

function IndicatorsEditor({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const [filter, setFilter] = useState<'all' | 'infrastructure' | 'community' | 'climate' | 'partnerships'>('all');

  // Ensure we have all 10 indicators
  const indicators = siteData.indicators.length >= 10
    ? siteData.indicators
    : [...siteData.indicators, ...defaultIndicators10.slice(siteData.indicators.length)];

  const filtered = filter === 'all' ? indicators : indicators.filter(ind => {
    const label = ind.label.toLowerCase();
    if (filter === 'infrastructure') return label.includes('road') || label.includes('water') || label.includes('digital') || label.includes('hub');
    if (filter === 'community') return label.includes('cooperative') || label.includes('community') || label.includes('trained') || label.includes('household');
    if (filter === 'climate') return label.includes('climate') || label.includes('disaster') || label.includes('agriculture');
    if (filter === 'partnerships') return label.includes('research') || label.includes('publication');
    return true;
  });

  const __onTrackCount = indicators.filter(i => i.status === 'On Track').length;
  const inProgressCount = indicators.filter(i => i.status === 'In Progress').length;
  const atRiskCount = indicators.filter(i => i.status === 'At Risk').length;

  const updateIndicator = (id: string, updates: Partial<Indicator>) => {
    const updated = indicators.map(ind => ind.id === id ? { ...ind, ...updates } : ind);
    updateSiteData({ indicators: updated });
    addActivity('Indicator Updated', `Updated "${indicators.find(i => i.id === id)?.label}"`);
  };

  const statusColors: Record<string, string> = {
    'On Track': 'var(--success)',
    'In Progress': 'var(--warning)',
    'At Risk': 'var(--error)',
  };

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="flex items-center gap-6 px-4 py-3 border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{indicators.length} Indicators</span>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--success)' }}>
          <Circle size={10} fill="var(--success)" /> {__onTrackCount} On Track
        </span>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--warning)' }}>
          <Circle size={10} fill="var(--warning)" /> {inProgressCount} In Progress
        </span>
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--error)' }}>
          <Circle size={10} fill="var(--error)" /> {atRiskCount} At Risk
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'infrastructure', 'community', 'climate', 'partnerships'] as const).map(f => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="rounded-none text-xs capitalize"
            style={filter === f ? { backgroundColor: 'var(--medium-blue)' } : {}}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Indicator cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((indicator) => {
          const progress = Math.min(100, Math.round((indicator.current / indicator.target) * 100));
          return (
            <Card key={indicator.id} className="rounded-none border" style={{ borderColor: 'var(--border)' }}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{indicator.label}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Unit: {indicator.unit || 'count'}</p>
                  </div>
                  <Select
                    value={indicator.status}
                    onValueChange={(v) => updateIndicator(indicator.id, { status: v as Indicator['status'] })}
                  >
                    <SelectTrigger className="w-[130px] h-8 rounded-none text-xs" style={{ borderColor: 'var(--border)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On Track">On Track</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="At Risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="h-2 w-full" style={{ backgroundColor: 'var(--border)' }}>
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${progress}%`, backgroundColor: statusColors[indicator.status] || 'var(--medium-blue)' }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-right" style={{ color: 'var(--text-muted)' }}>{progress}%</p>
                </div>

                {/* Editable fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>Current</Label>
                    <Input
                      type="number"
                      value={indicator.current}
                      onChange={(e) => updateIndicator(indicator.id, { current: Number(e.target.value) })}
                      className="h-9 rounded-none text-sm"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: 'var(--text-muted)' }}>Target</Label>
                    <Input
                      type="number"
                      value={indicator.target}
                      onChange={(e) => updateIndicator(indicator.id, { target: Number(e.target.value) })}
                      className="h-9 rounded-none text-sm"
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   PARTNER MANAGER
   ═══════════════════════════════════════════════ */
function PartnerManager({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Partner>>({});

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setEditData({ ...partner });
  };

  const handleSave = (id: string) => {
    const updated = siteData.partners.map(p =>
      p.id === id ? { ...p, ...editData } as Partner : p
    );
    updateSiteData({ partners: updated });
    addActivity('Partner Updated', `Updated "${editData.name}"`);
    setEditingId(null);
  };

  const handleFileUpload = (partnerId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updated = siteData.partners.map(p =>
        p.id === partnerId ? { ...p } : p
      );
      updateSiteData({ partners: updated });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {siteData.partners.map((partner) => (
        <Card key={partner.id} className="rounded-none border" style={{ borderColor: 'var(--border)' }}>
          <CardContent className="p-5 space-y-4">
            {/* Logo placeholder */}
            <div
              className="w-full h-[120px] flex flex-col items-center justify-center border-2 border-dashed cursor-pointer transition-colors hover:bg-gray-50"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}
              onClick={() => document.getElementById(`partner-file-${partner.id}`)?.click()}
            >
              <Building2 size={28} style={{ color: 'var(--text-muted)' }} />
              <span className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Click to upload logo</span>
              <input
                id={`partner-file-${partner.id}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(partner.id, e.target.files[0])}
              />
            </div>

            {editingId === partner.id ? (
              <div className="space-y-3">
                <div>
                  <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Name</Label>
                  <Input
                    value={editData.name || ''}
                    onChange={e => setEditData(p => ({ ...p, name: e.target.value }))}
                    className="h-9 rounded-none"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>
                <div>
                  <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Role</Label>
                  <Input
                    value={editData.role || ''}
                    onChange={e => setEditData(p => ({ ...p, role: e.target.value }))}
                    className="h-9 rounded-none"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>
                <div>
                  <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Type</Label>
                  <Select
                    value={editData.type || ''}
                    onValueChange={v => setEditData(p => ({ ...p, type: v }))}
                  >
                    <SelectTrigger className="h-9 rounded-none" style={{ borderColor: 'var(--border)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lead Institution">Lead Institution</SelectItem>
                      <SelectItem value="Funding Partner">Funding Partner</SelectItem>
                      <SelectItem value="Implementing Partner">Implementing Partner</SelectItem>
                      <SelectItem value="Knowledge Partner">Knowledge Partner</SelectItem>
                      <SelectItem value="Evaluation Partner">Evaluation Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Description</Label>
                  <Textarea
                    value={editData.description || ''}
                    onChange={e => setEditData(p => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="rounded-none"
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSave(partner.id)} className="rounded-none gap-1" style={{ backgroundColor: 'var(--success)' }}>
                    <Check size={14} /> Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="rounded-none gap-1">
                    <X size={14} /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{partner.name}</h4>
                    <p className="text-xs" style={{ color: 'var(--medium-blue)' }}>{partner.role}</p>
                  </div>
                  <Badge variant="outline" className="rounded-none text-xs" style={{ borderColor: 'var(--border)' }}>
                    {partner.type}
                  </Badge>
                </div>
                <p className="text-xs line-clamp-3 mb-3" style={{ color: 'var(--text-secondary)' }}>{partner.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(partner)}
                  className="rounded-none gap-1 text-xs w-full"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Pencil size={12} /> Edit Partner
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COUNTRY MANAGER
   ═══════════════════════════════════════════════ */
function CountryManager({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const [activeCountry, setActiveCountry] = useState<string>(siteData.countries[0]?.id || '');
  const country = siteData.countries.find(c => c.id === activeCountry);

  const updateCountry = (updates: Partial<Country>) => {
    if (!country) return;
    const updated = siteData.countries.map(c =>
      c.id === country.id ? { ...c, ...updates } as Country : c
    );
    updateSiteData({ countries: updated });
    addActivity('Country Updated', `Updated "${country.name}"`);
  };

  return (
    <div className="flex gap-0 border" style={{ borderColor: 'var(--border)', minHeight: 600 }}>
      {/* Country list */}
      <div className="w-[240px] flex-shrink-0 border-r" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Countries</h3>
        </div>
        <ScrollArea className="h-[600px]">
          {siteData.countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCountry(c.id)}
              className="w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2"
              style={{
                backgroundColor: activeCountry === c.id ? 'var(--medium-blue)' : 'transparent',
                color: activeCountry === c.id ? '#fff' : 'var(--text-primary)',
              }}
            >
              <MapPin size={14} />
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs" style={{ opacity: 0.7 }}>{c.region}</p>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Country editor */}
      <div className="flex-1 p-6">
        {country ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {country.name}
              </h2>
              <Badge variant="outline" className="rounded-none" style={{ borderColor: 'var(--border)' }}>
                {country.region}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="label-caption block mb-2">Country Name</Label>
                <Input
                  value={country.name}
                  onChange={e => updateCountry({ name: e.target.value })}
                  className="rounded-none h-10"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
              <div>
                <Label className="label-caption block mb-2">Region</Label>
                <Input
                  value={country.region}
                  onChange={e => updateCountry({ region: e.target.value })}
                  className="rounded-none h-10"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
            </div>

            <div>
              <Label className="label-caption block mb-2">Population</Label>
              <Input
                value={country.population}
                onChange={e => updateCountry({ population: e.target.value })}
                className="rounded-none h-10"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>

            <div>
              <Label className="label-caption block mb-2">Description</Label>
              <Textarea
                value={country.description}
                onChange={e => updateCountry({ description: e.target.value })}
                rows={4}
                className="rounded-none"
                style={{ borderColor: 'var(--border)' }}
              />
            </div>

            {/* Stats */}
            <div>
              <h3 className="label-caption mb-3">Country Statistics</h3>
              <div className="space-y-3">
                {country.stats.map((stat, idx) => (
                  <Card key={idx} className="rounded-none border" style={{ borderColor: 'var(--border)' }}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-3 items-end">
                        <div>
                          <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Label</Label>
                          <Input
                            value={stat.label}
                            onChange={e => {
                              const newStats = [...country.stats];
                              newStats[idx] = { ...stat, label: e.target.value };
                              updateCountry({ stats: newStats });
                            }}
                            className="h-9 rounded-none text-sm"
                            style={{ borderColor: 'var(--border)' }}
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Value</Label>
                          <Input
                            value={stat.value}
                            onChange={e => {
                              const newStats = [...country.stats];
                              newStats[idx] = { ...stat, value: e.target.value };
                              updateCountry({ stats: newStats });
                            }}
                            className="h-9 rounded-none text-sm"
                            style={{ borderColor: 'var(--border)' }}
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] uppercase block mb-1" style={{ color: 'var(--text-muted)' }}>Target</Label>
                          <Input
                            value={stat.target}
                            onChange={e => {
                              const newStats = [...country.stats];
                              newStats[idx] = { ...stat, target: e.target.value };
                              updateCountry({ stats: newStats });
                            }}
                            className="h-9 rounded-none text-sm"
                            style={{ borderColor: 'var(--border)' }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
            Select a country to edit
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   THEME SETTINGS
   ═══════════════════════════════════════════════ */
const allThemeTokens = [
  { key: 'primaryBlue', label: 'Primary Blue' },
  { key: 'mediumBlue', label: 'Medium Blue' },
  { key: 'lightBlue', label: 'Light Blue' },
  { key: 'accentGold', label: 'Accent Gold' },
  { key: 'brightBlue', label: 'Bright Blue' },
  { key: 'background', label: 'Background' },
  { key: 'lightGrey', label: 'Light Grey' },
  { key: 'darkText', label: 'Dark Text' },
  { key: 'textGrey', label: 'Text Grey' },
  { key: 'borderGrey', label: 'Border Grey' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
];

function ThemeSettings({ theme, setTheme, themePresets }: { theme: string; setTheme: (t: string) => void; themePresets: Record<string, ThemePreset> }) {
  const [customColors, setCustomColors] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(LS_KEYS.CUSTOM_THEME);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [_activeTab, _setActiveTab] = useState('presets');

  const applyCustomColors = (colors: Record<string, string>) => {
    const root = document.documentElement;
    const tokenMap: Record<string, string> = {
      primaryBlue: '--primary-blue',
      mediumBlue: '--medium-blue',
      lightBlue: '--light-blue',
      accentGold: '--accent-gold',
      brightBlue: '--bright-blue',
      background: '--bg-white',
      lightGrey: '--bg-grey',
      darkText: '--text-primary',
      textGrey: '--text-secondary',
      borderGrey: '--border',
      success: '--success',
      warning: '--warning',
      error: '--error',
    };
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = tokenMap[key];
      if (cssVar) root.style.setProperty(cssVar, value);
    });
  };

  const handlePresetSelect = (presetKey: string) => {
    setTheme(presetKey);
    // Reset custom overrides
    const preset = themePresets[presetKey];
    if (preset) {
      const root = document.documentElement;
      root.style.setProperty('--primary-blue', preset.primaryBlue);
      root.style.setProperty('--medium-blue', preset.mediumBlue);
      root.style.setProperty('--light-blue', preset.lightBlue);
      root.style.setProperty('--accent-gold', preset.accentGold);
      root.style.setProperty('--bright-blue', preset.brightBlue);
      root.style.setProperty('--accent', preset.accentGold);
    }
    addActivity('Theme Changed', `Switched to "${themePresets[presetKey]?.name}"`);
  };

  const handleCustomColorChange = (tokenKey: string, value: string) => {
    const newColors = { ...customColors, [tokenKey]: value };
    setCustomColors(newColors);
    applyCustomColors(newColors);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(LS_KEYS.CUSTOM_THEME, JSON.stringify(customColors));
    addActivity('Theme Customized', 'Saved custom color theme');
  };

  const handleReset = () => {
    setCustomColors({});
    localStorage.removeItem(LS_KEYS.CUSTOM_THEME);
    handlePresetSelect(theme);
  };

  // Build preview colors
  const getPreviewColor = (key: string) => {
    if (customColors[key]) return customColors[key];
    const preset = themePresets[theme];
    return preset ? (preset as unknown as Record<string, string>)[key] || '#000' : '#000';
  };

  return (
    <div className="space-y-6">
      {/* Preset selector */}
      <div>
        <h3 className="label-caption mb-3">Theme Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(themePresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePresetSelect(key)}
              className="text-left p-4 border-2 transition-all hover:shadow-md"
              style={{
                borderColor: theme === key ? 'var(--accent)' : 'var(--border)',
                backgroundColor: 'var(--bg-grey)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{preset.name}</span>
                {theme === key && <Check size={18} style={{ color: 'var(--accent)' }} />}
              </div>
              <div className="flex gap-2">
                {[preset.primaryBlue, preset.mediumBlue, preset.lightBlue, preset.accentGold, preset.brightBlue].map((c, i) => (
                  <div key={i} className="w-8 h-8 border" style={{ backgroundColor: c, borderColor: 'var(--border)' }} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Separator style={{ backgroundColor: 'var(--border)' }} />

      {/* Color token editor */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="label-caption">Color Tokens</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="rounded-none gap-1 text-xs">
              <RefreshCw size={12} /> Reset
            </Button>
            <Button size="sm" onClick={handleSaveCustom} className="rounded-none gap-1 text-xs" style={{ backgroundColor: 'var(--medium-blue)' }}>
              <Save size={12} /> Save Custom
            </Button>
          </div>
        </div>

        <div className="border" style={{ borderColor: 'var(--border)' }}>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: 'var(--bg-grey)' }}>
                <TableHead className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Token</TableHead>
                <TableHead className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Preview</TableHead>
                <TableHead className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Hex Value</TableHead>
                <TableHead className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Picker</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allThemeTokens.map((token) => {
                const currentVal = getPreviewColor(token.key);
                return (
                  <TableRow key={token.key}>
                    <TableCell className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{token.label}</TableCell>
                    <TableCell>
                      <div className="w-8 h-8 border" style={{ backgroundColor: currentVal, borderColor: 'var(--border)' }} />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={currentVal}
                        onChange={e => handleCustomColorChange(token.key, e.target.value)}
                        className="h-8 w-28 rounded-none text-xs font-mono"
                        style={{ borderColor: 'var(--border)' }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="color"
                        value={currentVal.startsWith('#') ? currentVal : '#000000'}
                        onChange={e => handleCustomColorChange(token.key, e.target.value)}
                        className="w-8 h-8 cursor-pointer border-0 p-0"
                        style={{ background: 'none' }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Preview */}
      <Card className="rounded-none border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-grey)' }}>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 space-y-4" style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border)' }}>
            <h4 style={{ color: 'var(--primary-blue)', fontFamily: 'Merriweather, serif' }}>Sample Heading</h4>
            <p style={{ color: 'var(--text-secondary)' }}>This is sample body text showing how the theme colors look together.</p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 text-xs font-medium text-white" style={{ backgroundColor: 'var(--medium-blue)' }}>Primary Button</span>
              <span className="px-3 py-1.5 text-xs font-medium" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--text-primary)' }}>Accent</span>
              <Badge className="rounded-none" style={{ backgroundColor: 'var(--success)', color: '#fff' }}>On Track</Badge>
              <Badge className="rounded-none" style={{ backgroundColor: 'var(--error)', color: '#fff' }}>At Risk</Badge>
            </div>
            <div className="h-2 w-full" style={{ backgroundColor: 'var(--border)' }}>
              <div className="h-full" style={{ width: '65%', backgroundColor: 'var(--accent)' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MEDIA LIBRARY
   ═══════════════════════════════════════════════ */
function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>(loadMedia());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);

  const categories = ['all', 'Hero', 'News', 'Icons', 'Logos', 'Maps'];

  const filtered = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newItem: MediaItem = {
        id: generateId(),
        name: file.name,
        category: 'News',
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        dimensions: 'Unknown',
        dataUrl: reader.result as string,
        createdAt: Date.now(),
      };
      const updated = [newItem, ...media];
      setMedia(updated);
      saveMedia(updated);
      addActivity('Media Uploaded', `Uploaded "${file.name}"`);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    const item = media.find(m => m.id === id);
    const updated = media.filter(m => m.id !== id);
    setMedia(updated);
    saveMedia(updated);
    if (item) addActivity('Media Deleted', `Deleted "${item.name}"`);
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        className="border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer"
        style={{
          borderColor: isDragging ? 'var(--medium-blue)' : 'var(--border)',
          backgroundColor: isDragging ? 'rgba(0,86,164,0.05)' : 'var(--bg-grey)',
          height: 160,
        }}
        onClick={() => document.getElementById('media-upload')?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFileUpload(file);
        }}
      >
        <Upload size={28} style={{ color: 'var(--text-muted)' }} />
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          Drag and drop images here, or click to browse
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          JPG, PNG, SVG, WebP — Max 5MB
        </p>
        <input
          id="media-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        />
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <Input
            placeholder="Search media..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 rounded-none"
            style={{ borderColor: 'var(--border)' }}
          />
        </div>
        <div className="flex gap-1">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className="rounded-none text-xs capitalize"
              style={categoryFilter === cat ? { backgroundColor: 'var(--medium-blue)' } : {}}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="rounded-none border overflow-hidden group" style={{ borderColor: 'var(--border)' }}>
            <div
              className="aspect-square flex items-center justify-center border-b relative"
              style={{ backgroundColor: 'var(--bg-grey)', borderColor: 'var(--border)' }}
            >
              {item.dataUrl ? (
                <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <Image size={32} style={{ color: 'var(--text-muted)' }} />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-white"
                  style={{ color: 'var(--error)' }}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center bg-white"
                  style={{ color: 'var(--medium-blue)' }}
                  onClick={() => navigator.clipboard.writeText(item.dataUrl || item.name)}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.dimensions}</span>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.size}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          <Image size={32} className="mx-auto mb-2" />
          <p className="text-sm">No media found</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ADMIN SETTINGS
   ═══════════════════════════════════════════════ */
function AdminSettings({ siteData, updateSiteData }: { siteData: SiteData; updateSiteData: (p: Partial<SiteData>) => void }) {
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      updateSiteData({ ...defaultSiteData });
      localStorage.removeItem(LS_KEYS.ACTIVITY);
      localStorage.removeItem(LS_KEYS.MEDIA);
      localStorage.removeItem(LS_KEYS.CUSTOM_THEME);
      addActivity('System Reset', 'All data reset to defaults');
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="rounded-none border" style={{ borderColor: 'var(--border)' }}>
        <CardHeader>
          <CardTitle className="text-lg" style={{ fontFamily: 'Barlow, sans-serif' }}>Data Management</CardTitle>
          <CardDescription>Manage your admin data and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Reset All Data</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Restore all content to factory defaults</p>
            </div>
            <Button variant="destructive" onClick={handleResetAll} className="rounded-none gap-2">
              <RefreshCw size={14} /> Reset All
            </Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Export Data</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Download all site data as JSON</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                const data = JSON.stringify(siteData, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'meridian-site-data.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="rounded-none gap-2"
            >
              <Download size={14} /> Export
            </Button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Activity Log</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Clear the recent activity feed</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                saveActivityLog([]);
                addActivity('Log Cleared', 'Activity log was cleared');
              }}
              className="rounded-none gap-2"
            >
              <Trash2 size={14} /> Clear Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   MAIN ADMIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function Admin() {
  const { isAdmin, setIsAdmin, siteData, updateSiteData, theme, setTheme, themePresets } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get section from URL or default to dashboard
  const sectionParam = searchParams.get('section') || 'dashboard';
  const [activeSection, setActiveSection] = useState<AdminSection>(
    sidebarNav.some(n => n.key === sectionParam) ? (sectionParam as AdminSection) : 'dashboard'
  );

  // Check auth on mount
  const [authenticated, setAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(LS_KEYS.AUTH) === 'true';
    } catch { return false; }
  });

  // Sync section with URL
  useEffect(() => {
    const s = searchParams.get('section') || 'dashboard';
    if (sidebarNav.some(n => n.key === s)) {
      setActiveSection(s as AdminSection);
    }
  }, [searchParams]);

  const handleSectionChange = (key: AdminSection) => {
    setActiveSection(key);
    setSearchParams({ section: key });
  };

  const handleLogin = () => {
    setAuthenticated(true);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(LS_KEYS.AUTH);
    setAuthenticated(false);
    setIsAdmin(false);
    addActivity('Admin Logout', 'User logged out');
  };

  // Show login screen if not authenticated
  if (!authenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const sectionLabels: Record<AdminSection, string> = {
    dashboard: 'Dashboard Overview',
    content: 'Content Management',
    navigation: 'Navigation Editor',
    news: 'News Manager',
    indicators: 'Indicators Editor',
    partners: 'Partner Manager',
    countries: 'Country Manager',
    theme: 'Theme Settings',
    media: 'Media Library',
    settings: 'Admin Settings',
  };

  return (
    <div className="flex min-h-[100dvh]" style={{ backgroundColor: 'var(--bg-white)' }}>
      {/* SIDEBAR */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
        style={{
          width: 240,
          backgroundColor: 'var(--primary-blue)',
        }}
      >
        {/* Admin Logo */}
        <div
          className="px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
        >
          <p className="text-base font-bold tracking-[0.1em] text-white">MERIDIAN</p>
          <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            ADMIN
          </p>
        </div>

        {/* Nav Items */}
        <ScrollArea className="flex-1">
          <nav className="py-3">
            {sidebarNav.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleSectionChange(item.key)}
                  className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-sm transition-colors"
                  style={{
                    backgroundColor: isActive ? 'var(--medium-blue)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                  }}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Profile */}
        <div
          className="px-5 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >
          <p className="text-sm text-white font-medium">Admin User</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>admin@meridianglobal.dev</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 mt-2 text-xs font-medium transition-colors hover:underline"
            style={{ color: 'var(--accent-gold)' }}
          >
            <LogOut size={12} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-[240px]">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6"
          style={{
            height: 56,
            backgroundColor: 'var(--bg-white)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Admin / {sectionLabels[activeSection]}
            </p>
            <h1 className="text-base font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Barlow, sans-serif' }}>
              {sectionLabels[activeSection]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/#/')}
              className="rounded-none gap-2 text-xs"
              style={{ borderColor: 'var(--border)' }}
            >
              <ExternalLink size={14} /> Preview Site
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {activeSection === 'dashboard' && <DashboardSection siteData={siteData} />}
          {activeSection === 'content' && <ContentEditor siteData={siteData} updateSiteData={updateSiteData} />}
          {activeSection === 'navigation' && <NavigationEditor siteData={siteData} updateSiteData={updateSiteData} />}
          {activeSection === 'news' && <NewsManager siteData={siteData} updateSiteData={updateSiteData} />}
          {activeSection === 'indicators' && <IndicatorsEditor siteData={siteData} updateSiteData={updateSiteData} />}
          {activeSection === 'partners' && <PartnerManager siteData={siteData} updateSiteData={updateSiteData} />}
          {activeSection === 'countries' && <CountryManager siteData={siteData} updateSiteData={updateSiteData} />}
          {activeSection === 'theme' && <ThemeSettings theme={theme} setTheme={setTheme} themePresets={themePresets} />}
          {activeSection === 'media' && <MediaLibrary />}
          {activeSection === 'settings' && <AdminSettings siteData={siteData} updateSiteData={updateSiteData} />}
        </div>
      </main>
    </div>
  );
}
