'use client';

import React, { useState, use } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { issueBook } from '@/store/borrowingSlice';
import { createReservation } from '@/store/reservationSlice';
import { adjustInventory } from '@/store/bookSlice';
import Link from 'next/link';
import { BookOpen, ArrowLeft, CheckCircle, XCircle, Calendar, BookmarkPlus, Clock, Award } from 'lucide-react';

export default function BookDetailPage({ params }) {
  const unwrappedParams = use(params);
  const bookId = unwrappedParams.id;
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books.books);
  const user = useSelector((state) => state.auth.user);
  const book = books.find((b) => b.id === bookId);

  const [message, setMessage] = useState(null);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Book Not Found</h2>
        <p className="text-gray-600 mt-2">The requested book does not exist or has been removed.</p>
        <Link href="/catalog" className="mt-6 inline-block bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleBorrow = () => {
    if (book.availableCopies <= 0) {
      setMessage({ type: 'error', text: 'No copies currently available. You may place a reservation.' });
      return;
    }
    dispatch(issueBook({ bookId: book.id, bookTitle: book.title, userId: user?.id || 'u2', userName: user?.name || 'Alex Johnson' }));
    dispatch(adjustInventory({ id: book.id, quantityChange: -1 }));
    setMessage({ type: 'success', text: 'Book successfully borrowed for 14 days!' });
  };

  const handleReserve = () => {
    dispatch(createReservation({ bookId: book.id, bookTitle: book.title, userId: user?.id || 'u2', userName: user?.name || 'Alex Johnson' }));
    setMessage({ type: 'success', text: 'Book successfully reserved in queue!' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/catalog" className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 font-medium mb-8">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Catalog</span>
      </Link>

      {message && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-3">
        <div className="h-80 md:h-full bg-gray-200 relative">
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="md:col-span-2 p-8 space-y-6">
          <div>
            <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
              {book.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3">{book.title}</h1>
            <p className="text-base text-gray-600 mt-1">By {book.author}</p>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-sm">
            <div>
              <p className="text-gray-500">ISBN</p>
              <p className="font-semibold text-gray-900 mt-0.5">{book.isbn}</p>
            </div>
            <div>
              <p className="text-gray-500">Publisher</p>
              <p className="font-semibold text-gray-900 mt-0.5">{book.publisher}</p>
            </div>
            <div>
              <p className="text-gray-500">Publication Year</p>
              <p className="font-semibold text-gray-900 mt-0.5">{book.publishYear}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {book.availableCopies > 0 ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-semibold text-sm ${book.availableCopies > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {book.availableCopies} of {book.totalCopies} copies available
              </span>
            </div>

            <div className="space-x-3">
              {book.availableCopies > 0 ? (
                <button
                  onClick={handleBorrow}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Borrow Book (14 Days)
                </button>
              ) : (
                <button
                  onClick={handleReserve}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Place Reservation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
