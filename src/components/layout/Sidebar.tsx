'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Newspaper,
  Compass,
  Video,
  GitBranch,
  Languages,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/', label: 'Dashboard', icon: Zap },
  { href: '/my-et', label: 'My ET', icon: Newspaper },
  { href: '/navigator', label: 'Navigator', icon: Compass },
  { href: '/video-studio', label: 'Video Studio', icon: Video },
  { href: '/story-arc', label: 'Story Arc', icon: GitBranch },
  { href: '/vernacular', label: 'Vernacular', icon: Languages },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`surface-glass hidden fixed left-0 top-[4.5rem] bottom-0 z-40 lg:flex flex-col border-r border-border/80 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-1 flex-col gap-1.5 px-3 py-5">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              title={link.label}
              className={`ui-transition flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium leading-none ${
                isActive
                  ? 'bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] text-white shadow-[0_8px_20px_rgba(79,70,229,0.24)]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{link.label}</span>}
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="ui-transition flex items-center justify-center border-t border-border/80 py-3 text-muted-foreground hover:text-foreground"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
