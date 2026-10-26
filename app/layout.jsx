'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Digital Library Management System</title>
        <meta name="description" content="A complete digital library management system for colleges and universities." />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        <Provider store={store}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
