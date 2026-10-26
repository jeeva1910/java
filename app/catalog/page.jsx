'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSearchQuery, setSortBy } from '@/store/bookSlice';
import Link from 'next/link';
import { Search, Filter, BookOpen, CheckCircle, XCircle, ArrowUpDown } from 'lucide-react';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { books, selectedCategory, searchQuery, sortBy } = useSelector((state) => state.books);

  const categories = ['All', 'Computer Science', 'Electronics', 'Mechanical Engineering', 'Physics', 'Mathematics'];

  const filteredBooks = books
    .filter((book) => {
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'year') return b.publishYear - a.publishYear;
      if (sortBy === 'availability') return b.availableCopies - a.availableCopies;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Library Book Catalog</h1>
          <p className="text-gray-600 mt-1">Search, filter, and borrow textbooks and engineering manuals.</p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search by title, author, ISBN..."
            className="pl-10 w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="w-full lg:w-64 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-2">
              <Filter className="h-4 w-4 text-primary-600" />
              <span>Categories</span>
            </div>
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => dispatch(setCategory(cat))}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-2">
              <ArrowUpDown className="h-4 w-4 text-primary-600" />
              <span>Sort Books By</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="title">Book Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="year">Publication Year (Newest)</option>
              <option value="availability">Availability (Most)</option>
            </select>
          </div>
        </div>

        {/* Book Grid */}
        <div className="flex-grow">
          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800">No books found</h3>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search query or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col hover:shadow-md transition-shadow">
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
                      <div className="flex items-center space-x-1.5">
                        {book.availableCopies > 0 ? (
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-xs font-semibold ${book.availableCopies > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                          {book.availableCopies} of {book.totalCopies} available
                        </span>
                      </div>
                      <Link
                        href={`/catalog/${book.id}`}
                        className="bg-primary-50 text-primary-700 hover:bg-primary-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
