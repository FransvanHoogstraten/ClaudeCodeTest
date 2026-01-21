'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Map,
  Layers,
  Calendar,
  AlertCircle,
  CheckSquare,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isCollapsed: boolean;
  approvalCount?: number;
  issueCount?: number;
}

const navItems = [
  {
    href: '/structure-maps',
    label: 'Structure Maps',
    icon: Map,
  },
  {
    href: '/software-stack',
    label: 'Software Stack',
    icon: Layers,
  },
  {
    href: '/monthly-close',
    label: 'Monthly Close',
    icon: Calendar,
  },
  {
    href: '/issues',
    label: 'Issues',
    icon: AlertCircle,
    badge: 'issueCount',
  },
  {
    href: '/approvals',
    label: 'Approvals',
    icon: CheckSquare,
    badge: 'approvalCount',
  },
];

export function Sidebar({ isCollapsed, approvalCount = 3, issueCount = 5 }: SidebarProps) {
  const pathname = usePathname();

  const badges: Record<string, number> = {
    approvalCount,
    issueCount,
  };

  return (
    <nav
      className={cn(
        'bg-sidebar border-r border-sidebar-border flex flex-col gap-1 py-4 transition-all duration-300',
        isCollapsed ? 'w-0 overflow-hidden p-0 border-r-0' : 'w-[220px]'
      )}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;
        const badgeCount = item.badge ? badges[item.badge] : undefined;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-4 py-2 mx-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">{item.label}</span>
            {badgeCount !== undefined && badgeCount > 0 && (
              <Badge
                variant="secondary"
                className="h-5 min-w-[20px] px-1.5 text-[11px] font-semibold bg-sidebar-foreground/20 text-sidebar-foreground hover:bg-sidebar-foreground/20"
              >
                {badgeCount}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
