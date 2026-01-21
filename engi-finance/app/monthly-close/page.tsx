import { StatusMatrix } from '@/components/monthly-close/status-matrix';

export default function MonthlyClosePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Monthly Close Status</h2>
        <p className="text-sm text-muted-foreground">
          2025 Year-over-Year Progress Tracker
        </p>
        <div className="flex gap-6 mt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Complete</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Blocked/Issue</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span>Not Started</span>
          </div>
        </div>
      </div>

      <StatusMatrix />
    </div>
  );
}
