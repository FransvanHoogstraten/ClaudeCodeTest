'use client';

import { cn } from '@/lib/utils';
import { TaskStatus } from '@/lib/data/tasks';

interface StatusCellProps {
  status: TaskStatus;
  onClick?: () => void;
}

export function StatusCell({ status, onClick }: StatusCellProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-3.5 h-3.5 rounded-full transition-all duration-150 cursor-pointer hover:scale-125',
        status === 'complete' && 'bg-emerald-500',
        status === 'in-progress' && 'bg-amber-500',
        status === 'blocked' && 'bg-rose-500',
        status === 'not-started' && 'bg-gray-400'
      )}
    />
  );
}
