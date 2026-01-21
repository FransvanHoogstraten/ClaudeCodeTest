'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { StatusCell } from './status-cell';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  tasks,
  sections,
  months,
  monthNames,
  getTaskStatus,
  monthlyCompletionBadges,
  Task,
  TaskStatus,
} from '@/lib/data/tasks';

interface TaskModalData {
  task: Task;
  month: string;
  status: TaskStatus;
}

export function StatusMatrix() {
  const [selectedTask, setSelectedTask] = useState<TaskModalData | null>(null);

  const handleCellClick = (task: Task, month: string) => {
    const status = getTaskStatus(task.id, month);
    setSelectedTask({ task, month, status });
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'complete':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'blocked':
        return '#ef4444';
      default:
        return '#9ca3af';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'in-progress':
        return 'In Progress';
      case 'blocked':
        return 'Blocked';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Row */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="text-lg font-semibold p-4 pb-2">Overall Status</div>
        <div className="grid overflow-x-auto" style={{ gridTemplateColumns: '250px repeat(12, 60px)' }}>
          <div /> {/* Empty cell for task column */}
          {months.map((month) => {
            const badge = monthlyCompletionBadges[month];
            const isCurrent = month === 'dec';
            return (
              <div
                key={month}
                className={cn(
                  'text-center p-3 border-b border-r border-border',
                  isCurrent && 'bg-blue-50'
                )}
              >
                <div className={cn('text-sm font-semibold mb-1', isCurrent && 'text-primary')}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    'text-[10px] font-semibold',
                    badge.status === 'complete'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                  )}
                >
                  {badge.value}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Matrix Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden overflow-x-auto">
        {/* Header Row */}
        <div
          className="grid bg-secondary border-b border-border sticky top-0 z-10"
          style={{ gridTemplateColumns: '250px repeat(12, 60px)' }}
        >
          <div className="p-3 font-semibold text-sm">Task</div>
          {months.map((month) => (
            <div
              key={month}
              className={cn(
                'p-3 text-center border-r border-border last:border-r-0',
                month === 'dec' && 'bg-blue-50'
              )}
            />
          ))}
        </div>

        {/* Section Groups */}
        {sections.map((section) => {
          const sectionTasks = tasks.filter((t) => t.section === section.id);
          return (
            <div key={section.id}>
              {/* Section Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border font-semibold text-sm">
                {section.name}
              </div>

              {/* Task Rows */}
              {sectionTasks.map((task) => (
                <div
                  key={task.id}
                  className="grid border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors"
                  style={{ gridTemplateColumns: '250px repeat(12, 60px)' }}
                >
                  <div className="p-3 text-sm border-r border-border">{task.name}</div>
                  {months.map((month) => {
                    const status = getTaskStatus(task.id, month);
                    const isCurrent = month === 'dec';
                    return (
                      <div
                        key={month}
                        className={cn(
                          'p-3 flex items-center justify-center border-r border-border/50 last:border-r-0',
                          isCurrent && 'bg-blue-50'
                        )}
                      >
                        <StatusCell
                          status={status}
                          onClick={() => handleCellClick(task, month)}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask?.task.name}</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Month:</span>
                <span className="text-sm font-medium">{monthNames[selectedTask.month]}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className="text-sm font-medium flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStatusColor(selectedTask.status) }}
                  />
                  {getStatusLabel(selectedTask.status)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Owner:</span>
                <span className="text-sm font-medium">{selectedTask.task.owner}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Due:</span>
                <span className="text-sm font-medium">{selectedTask.task.dueDay}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">Notes:</span>
                <span className="text-sm font-medium max-w-[250px] text-right">
                  {selectedTask.task.notes}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
