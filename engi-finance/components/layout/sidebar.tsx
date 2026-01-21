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
        'bg-sidebar flex flex-col gap-0.5 py-4 transition-all duration-300',
        isCollapsed ? 'w-0 overflow-hidden p-0' : 'w-[200px]'
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
              'flex items-center gap-3 px-4 py-2 text-[13px] transition-colors',
              isActive
                ? 'text-white font-medium'
                : 'text-white/60 hover:text-white'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">{item.label}</span>
            {badgeCount !== undefined && badgeCount > 0 && (
              <span className="text-[11px] text-white/50 font-medium tabular-nums">
                {badgeCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
