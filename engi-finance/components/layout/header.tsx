'use client';

import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onToggleSidebar: () => void;
  notificationCount?: number;
}

export function Header({ onToggleSidebar, notificationCount = 3 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-[15px] font-semibold tracking-tight text-foreground">ENGI finance</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] flex items-center justify-center bg-foreground text-background text-[10px] font-medium tabular-nums">
                {notificationCount}
              </span>
            )}
          </Button>
          <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center text-[13px] font-medium">
            FM
          </div>
        </div>
      </div>
    </header>
  );
}
