'use client';

import { useLocalStorage } from './use-local-storage';

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebarCollapsed', false);

  const toggle = () => setIsCollapsed(!isCollapsed);
  const collapse = () => setIsCollapsed(true);
  const expand = () => setIsCollapsed(false);

  return {
    isCollapsed,
    toggle,
    collapse,
    expand,
  };
}
