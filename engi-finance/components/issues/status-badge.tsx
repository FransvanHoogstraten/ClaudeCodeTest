import { cn } from '@/lib/utils';
import { IssueStatus } from '@/lib/data/issues';

interface StatusBadgeProps {
  status: IssueStatus;
}

const statusLabels: Record<IssueStatus, string> = {
  'open': 'Open',
  'in-progress': 'In Progress',
  'resolved': 'Resolved',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 rounded text-xs font-medium',
        status === 'open' && 'bg-rose-100 text-rose-800',
        status === 'in-progress' && 'bg-amber-100 text-amber-800',
        status === 'resolved' && 'bg-emerald-100 text-emerald-800'
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
