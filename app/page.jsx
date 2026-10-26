'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { BookOpen, Search, ShieldCheck, Clock, Layers, Award, ArrowRight, BookMarked, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const books = useSelector((state) => state.books.books);
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-blue-900 to-indigo-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-800/60 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-200 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>Next-Generation College Library Platform</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Empowering Academic Excellence with Digital Knowledge
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-normal">
            Access thousands of academic books, engineering journals, and online research databases instantly through our intelligent digital library management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link
              href="/catalog"
              className="w-full sm:w-auto bg-white text-primary-900 hover:bg-blue-50 font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Explore Book Catalog</span>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 border border-primary-500"
            >
              <span>Student & Admin Portal</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200 shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-gray-100 last:border-none">
              <p className="text-3xl font-extrabold text-primary-600">12,500+</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Catalog Books</p>
            </div>
            <div className="p-4 border-r border-gray-100 last:border-none">
              <p className="text-3xl font-extrabold text-primary-600">4,200+</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Active Students</p>
            </div>
            <div className="p-4 border-r border-gray-100 last:border-none">
              <p className="text-3xl font-extrabold text-primary-600">99.8%</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Circulation Uptime</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-extrabold text-primary-600">24/7</p>
              <p className="text-sm font-medium text-gray-500 mt-1">Digital Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Comprehensive Library Capabilities</h2>
          <p className="text-gray-600">Designed to streamline academic workflow, inventory management, and resource discovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-primary-50 text-primary-600 p-3 rounded-xl w-fit mb-6">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Catalog & Inventory</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Search by title, author, ISBN, or engineering department. Real-time availability tracking with automated stock updates.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit mb-6">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Circulation & Renewals</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Seamless 14-day borrowing periods, self-service renewals (up to 2 times), and instant queue-based book reservations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-purple-50 text-purple-600 p-3 rounded-xl w-fit mb-6">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Learning Resources</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Direct links and authenticated access to ACM Digital Library, IEEE Xplore, MIT OpenCourseWare, and Springer e-books.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Academic Additions</h2>
              <p className="text-gray-600 mt-2">Explore recently cataloged textbooks and reference manuals.</p>
            </div>
            <Link href="/catalog" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1">
              <span>View Full Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-gray-800">
                    {book.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-1">{book.author}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4 flex-grow">{book.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${book.availableCopies > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {book.availableCopies > 0 ? `${book.availableCopies} available` : 'Checked out'}
                    </span>
                    <Link href={`/catalog/${book.id}`} className="text-xs font-semibold text-primary-600 hover:text-primary-800">
                      Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
