'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { 
  Home, 
  Building, 
  FileText, 
  CheckSquare, 
  Receipt, 
  Users, 
  Menu, 
  X,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { 
  containerVariants, 
  textVariants, 
  buttonVariants, 
  navLinkVariants 
} from "@/styles/variants";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Buildings', href: '/buildings', icon: Building },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Bills', href: '/bills', icon: Receipt },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Don't render navbar on login page
  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className={containerVariants({ size: 'xl' })}>
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className={textVariants({ variant: 'h4', weight: 'bold' })}>Ferbely</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={navLinkVariants({ 
                    variant: isActive(item.href) ? 'active' : 'default',
                    size: 'md'
                  })}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - Notifications, Settings, Profile */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Notifications */}
            <button className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
              <Bell className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button className={cn(buttonVariants({ variant: 'ghost' }), "space-x-2")}>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className={cn(textVariants({ variant: 'small', weight: 'medium' }), "text-white")}>
                    {user?.first_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span>{user?.first_name || 'User'}</span>
              </button>
            </div>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "hover:text-red-600 hover:bg-red-50")}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    navLinkVariants({ 
                      variant: isActive(item.href) ? 'active' : 'default',
                      size: 'lg',
                      display: 'mobile'
                    }),
                    "space-x-3",
                    isActive(item.href) && "border-l-4 border-blue-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Mobile Profile Section */}
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className={cn(textVariants({ weight: 'medium' }), "text-white")}>
                  {user?.first_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <div className={textVariants({ variant: 'body', weight: 'medium' })}>
                  {user?.first_name || 'User'}
                </div>
                <div className={textVariants({ variant: 'muted' })}>
                  {user?.email || 'user@ferbely.com'}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <button className={cn(buttonVariants({ variant: 'ghost' }), "w-full justify-start space-x-3")}>
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className={cn(buttonVariants({ variant: 'ghost' }), "w-full justify-start space-x-3 hover:text-red-600 hover:bg-red-50")}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 