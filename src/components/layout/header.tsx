"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Package, NotebookPen, Compass, Menu, LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/releases", label: "Releases", icon: Package },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/notes", label: "Notes", icon: NotebookPen },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Hide header on login page
  if (pathname === "/login") return null;

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/calendar"
          className="mr-10 flex items-center gap-2 text-[0.95rem] font-medium tracking-[-0.02em]"
        >
          <CalendarDays className="h-4 w-4" />
          <span>Launch Tracker</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2 px-3 tracking-[-0.01em]",
                  pathname.startsWith(item.href) && "font-medium text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Sign out"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" />}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 border-border bg-background">
              <nav className="flex flex-col gap-2 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-muted-foreground"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-muted-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
