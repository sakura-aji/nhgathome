import { Moon } from 'lucide-react';

interface TopBarProps {
  clinicianName: string;
  clinicianRole: string;
  currentStatus?: string;
}

export function TopBar({ clinicianName, clinicianRole, currentStatus = 'Onboarding' }: TopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-slate-200/60 flex items-center justify-between px-6 shadow-sm">
      {/* Status Badge */}
      <div>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white shadow-sm">
          {currentStatus}
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Moon className="size-5 text-slate-600" />
        </button>

        {/* Clinician Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-slate-900">{clinicianName}</div>
            <div className="text-xs text-slate-500">{clinicianRole}</div>
          </div>
          <div className="size-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-medium">
              {clinicianName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
