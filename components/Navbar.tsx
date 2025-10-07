"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import ProfileCard from "@/components/ProfileCard";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/repositories", label: "Repositories" },
  { href: "/insights", label: "Insights" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 gap-2">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-foreground/80 hover:text-foreground transition-colors flex-shrink-0"
          >
            <span className="text-base md:text-lg font-light tracking-tight">
              dev<span className="text-muted-foreground/60">/</span>dash
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-light tracking-wide uppercase transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side - Theme & Profile */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <ThemeToggle />
            <ProfileCard />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-1.5 py-1 text-[10px] font-light tracking-wider uppercase transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-2 ml-2 border-l border-border/50 pl-2">
              <ThemeToggle />
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
