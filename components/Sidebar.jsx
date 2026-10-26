'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, BookmarkCheck, Clock, DollarSign, Bell, User, 
  Users, Layers, FileText, Settings, ShieldCheck, ArrowRightLeft, BookMarked, Code2
} from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'ADMIN';

  const studentLinks = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/catalog', label: 'Browse Catalog', icon: BookOpen },
    { href: '/student/borrowings', label: 'My Borrowings', icon: Clock },
    { href: '/student/reservations', label: 'Reservations', icon: BookMarked },
    { href: '/student/fines', label: 'Fines & Payments', icon: DollarSign },
    { href: '/resources', label: 'Digital Resources', icon: Layers },
    { href: '/student/notifications', label: 'Notifications', icon: Bell },
    { href: '/student/profile', label: 'Profile Settings', icon: User },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { href: '/admin/books', label: 'Book Inventory', icon: BookOpen },
    { href: '/admin/students', label: 'Student Directory', icon: Users },
    { href: '/admin/circulation', label: 'Circulation Desk', icon: ArrowRightLeft },
    { href: '/admin/reservations', label: 'Reservation Queue', icon: BookMarked },
    { href: '/admin/fines', label: 'Fine Collection Ledger', icon: DollarSign },
    { href: '/admin/resources', label: 'Digital Resources', icon: Layers },
    { href: '/admin/notifications', label: 'Announcements', icon: Bell },
    { href: '/admin/java-features', label: 'Java 8+ Concepts', icon: Code2 },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] p-4 hidden md:block">
      <div className="mb-6 px-3 py-2 bg-primary-50 rounded-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
          {isAdmin ? 'Management Portal' : 'Student Portal'}
        </p>
        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
