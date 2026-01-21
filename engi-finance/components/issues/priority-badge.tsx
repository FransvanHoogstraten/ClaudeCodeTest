import { cn } from '@/lib/utils';
import { Priority } from '@/lib/data/issues';

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold',
        priority === 'high' && 'bg-rose-100 text-rose-600',
        priority === 'medium' && 'bg-amber-100 text-amber-600',
        priority === 'low' && 'bg-blue-100 text-blue-600'
      )}
    >
      {priority === 'high' && '\u2191'}
      {priority === 'medium' && '='}
      {priority === 'low' && '\u2193'}
    </span>
  );
}
