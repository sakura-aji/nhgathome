interface HeaderProps {
  onBack?: () => void;
  clinicianName?: string;
  clinicianRole?: string;
  showBackButton?: boolean;
}

export function Header({ onBack, clinicianName = "NHG Admin", clinicianRole = "Admin", showBackButton = true }: HeaderProps) {
  return (
    <header className="bg-white/85 backdrop-blur flex items-center justify-end p-3.5 rounded-3xl border border-white/70 shadow-sm">
      <div className="flex items-center gap-3">
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="bg-white px-4 py-2 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900">{clinicianName}</p>
          <p className="text-xs text-slate-400">{clinicianRole}</p>
        </div>
        <div className="size-10 bg-slate-100 rounded-2xl flex items-center justify-center ring-1 ring-slate-200 text-lg">
          👤
        </div>
      </div>
    </header>
  );
}
