"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Mapa" },
  { href: "/liga", label: "Liga" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#0a0e1a]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nba-orange">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#0a0e1a]"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 2.69 3 6s-1.34 6-3 6-3-2.69-3-6 1.34-6 3-6z"
                fill="#0a0e1a"
                opacity="0.3"
              />
              <path
                d="M2.5 9.5h19M2.5 14.5h19"
                stroke="#0a0e1a"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            NBA<span className="text-nba-orange">Map</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-nba-orange/10 text-nba-orange"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

