import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Gauge,
  FileText,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  Droplets,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Meter Readings", href: "/readings", icon: Gauge },
  { name: "Bills", href: "/bills", icon: FileText },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Complaints", href: "/complaints", icon: MessageSquare },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        mobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg text-foreground">Thika Water</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm">
        <div className="flex h-16 items-center px-6 border-b">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg text-foreground">Thika Water</span>
          </div>
        </div>
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              July 2024 | Thika Water & Sewage Company
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Admin User
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}