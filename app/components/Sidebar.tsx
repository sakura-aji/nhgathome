import { useState } from 'react';
import {
  Activity, Users, UserX, Building2, Stethoscope, FileText,
  MessageSquare, Calendar, ClipboardList, Settings,
  ChevronDown, ChevronRight, AlertCircle, AlertTriangle, BarChart3, UserCircle,
  Gauge, BookOpen
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge?: boolean;
  badgeColor?: string;
}

interface MenuCategory {
  id: string;
  label: string;
  icon: any;
  items: MenuItem[];
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['patients', 'readings', 'admin']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const topMenuItem: MenuItem = { id: 'latest-readings', label: 'Latest Readings', icon: BarChart3 };

  const categories: MenuCategory[] = [
    {
      id: 'patients',
      label: 'Patients',
      icon: Users,
      items: [
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'discharged', label: 'Discharged Patients', icon: UserX }
      ]
    },
    {
      id: 'readings',
      label: 'Readings',
      icon: Activity,
      items: [
        { id: 'missed-reading', label: 'Missed Reading', icon: AlertCircle, badgeColor: 'red', badge: true },
        { id: 'abnormal-reading', label: 'Abnormal Reading', icon: AlertTriangle, badgeColor: 'orange', badge: true }
      ]
    },
    {
      id: 'admin',
      label: 'Administration',
      icon: FileText,
      items: [
        { id: 'hospital', label: 'Hospital', icon: Building2 },
        { id: 'clinical-staff', label: 'Clinical Staff', icon: Stethoscope },
        { id: 'admin', label: 'Admin', icon: UserCircle }
      ]
    }
  ];

  const singleMenuItems: MenuItem[] = [
    { id: 'reading-notes', label: 'Reading Notes', icon: FileText },
    { id: 'messages', label: 'Message/Alert', icon: MessageSquare },
    { id: 'thresholds', label: 'Thresholds', icon: Gauge, badge: true },
    { id: 'meetings', label: 'Meetings', icon: Calendar },
    { id: 'educational-material', label: 'Educational Material', icon: BookOpen },
    { id: 'survey', label: 'Survey', icon: ClipboardList },
    { id: 'device', label: 'Device Management', icon: Settings }
  ];

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;

    return (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-500 hover:bg-slate-50'
        }`}
      >
        <Icon className="size-4 flex-shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className={`size-2 rounded-full ${
            item.badgeColor === 'red' ? 'bg-rose-500' :
            item.badgeColor === 'orange' ? 'bg-amber-500' :
            'bg-blue-500'
          }`}></span>
        )}
      </button>
    );
  };

  return (
    <div className="hidden lg:block w-64 shrink-0 bg-white border-r border-slate-100 px-4 py-5">
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="text-3xl font-black italic tracking-tight text-blue-700">NHG</div>
        <div className="-mt-1 text-xl font-semibold text-emerald-500">Health</div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 text-sm font-semibold">
        {/* Top Menu Item - Latest Readings */}
        {renderMenuItem(topMenuItem)}

        {/* Categorized Menu Items */}
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          const hasActiveItem = category.items.some(item => item.id === currentPage);

          return (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all ${
                  hasActiveItem && !isExpanded
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <CategoryIcon className="size-4 flex-shrink-0" />
                <span className="flex-1 text-left">{category.label}</span>
                {isExpanded ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </button>

              {/* Subcategory Items */}
              {isExpanded && (
                <div className="ml-4 space-y-1 border-l-2 border-slate-100 pl-2">
                  {category.items.map((item) => renderMenuItem(item))}
                </div>
              )}
            </div>
          );
        })}

        {/* Single Menu Items */}
        {singleMenuItems.map((item) => renderMenuItem(item))}
      </nav>
    </div>
  );
}
