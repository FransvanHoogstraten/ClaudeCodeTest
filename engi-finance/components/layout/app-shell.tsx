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
        <main className="flex-1 p-8 bg-background overflow-auto">
          <div className="max-w-[1280px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
