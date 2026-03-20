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
  Menu,
  X,
  Zap,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Zap },
  { href: '/my-et', label: 'My ET', icon: Newspaper },
  { href: '/navigator', label: 'Navigator', icon: Compass },
  { href: '/video-studio', label: 'Video Studio', icon: Video },
  { href: '/story-arc', label: 'Story Arc', icon: GitBranch },
  { href: '/vernacular', label: 'Vernacular', icon: Languages },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="surface-glass fixed top-0 left-0 right-0 z-50 border-b border-border/80">
      <div className="mx-auto flex h-[4.5rem] max-w-[1280px] items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] shadow-[0_10px_24px_rgba(79,70,229,0.24)]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-gradient-primary text-lg font-bold tracking-tight">
            ArcSense
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1.5 rounded-2xl border border-border/80 bg-white/80 p-1 shadow-[0_6px_16px_rgba(15,23,42,0.06)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`ui-transition flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] text-white shadow-[0_8px_20px_rgba(79,70,229,0.24)]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          className="ui-transition md:hidden rounded-xl border border-border/80 bg-white p-2 text-muted-foreground shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/80 bg-background/95 pb-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`ui-transition mx-2 mt-1.5 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-[linear-gradient(135deg,#4f46e5_0%,#7c3aed_100%)] text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
