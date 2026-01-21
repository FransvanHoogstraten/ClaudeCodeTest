'use client';

import { ReactNode } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useSidebar } from '@/hooks/use-sidebar';
import { Toaster } from '@/components/ui/sonner';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={toggle} />
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} />
        <main className="flex-1 p-6 bg-background overflow-auto">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
