'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { BookOpen, CalendarDays, CheckCircle2, Code2, Layers3, RefreshCw, Server, Zap } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const topics = [
  ['Unit I', 'Lambda, Predicate, Function, Consumer, Supplier, method references, Stream basics'],
  ['Unit II', 'filter, map, reduce, sorted, groupingBy, aggregation, Optional, Collectors'],
  ['Unit III', 'LocalDate, LocalDateTime, parsing, formatting, Period, Duration, ChronoUnit'],
  ['Unit IV', 'CompletableFuture, chaining, ExecutorService, parallelStream'],
  ['Unit V', 'switch expressions, records, text blocks, pattern matching'],
];

export default function JavaFeaturesPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/java/overview`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Backend returned ${response.status}`);
      setData(await response.json());
    } catch (err) {
      setError('Start the Spring Boot backend on port 8080 to load the live Java syllabus calculations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary-700 text-sm font-semibold mb-2">
              <Code2 className="h-4 w-4" /> Subject Demonstration
            </div>
            <h1 className="text-3xl font-bold text-gray-950">Java 8+ Concepts</h1>
            <p className="text-gray-600 mt-1">Live examples from the Digital Library backend mapped to the syllabus.</p>
          </div>
          <button onClick={loadData} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700">
            <RefreshCw className="h-4 w-4" /> Refresh Demo
          </button>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-5">
            <p className="font-semibold">Backend not connected</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Metric icon={BookOpen} label="Books" value={data?.totalBooks ?? '—'} />
          <Metric icon={Layers3} label="Available Copies" value={data?.availableCopies ?? '—'} />
          <Metric icon={CalendarDays} label="Active Borrowings" value={data?.activeBorrowings ?? '—'} />
          <Metric icon={Zap} label="Overdue Borrowings" value={data?.overdueBorrowings ?? '—'} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Server className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-bold">Stream & Collector Results</h2>
            </div>
            <div className="space-y-3 text-sm">
              <Row label="reduce() total available copies" value={data?.totalAvailableCopiesUsingReduce} />
              <Row label="parallelStream() total" value={data?.parallelAvailableCopyCount} />
              <Row label="Optional book lookup" value={data?.optionalBookResult} />
              <Row label="Formatted due date" value={data?.formattedDueDate} />
              <Row label="Borrowing Period" value={data?.sampleBorrowingPeriod} />
              <Row label="Days until sample due date" value={data?.daysUntilFirstDueDate} />
              <Row label="Duration demo (seconds)" value={data?.processingDurationSeconds} />
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-5">Books grouped by category</h2>
            {data?.booksByCategory ? Object.entries(data.booksByCategory).map(([category, count]) => (
              <div key={category} className="flex justify-between py-2 border-b last:border-0 text-sm">
                <span className="text-gray-600">{category}</span>
                <span className="font-bold">{count} book{count === 1 ? '' : 's'}</span>
              </div>
            )) : <p className="text-gray-500 text-sm">Waiting for backend...</p>}
          </section>
        </div>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-5">Syllabus Mapping</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topics.map(([unit, text]) => (
              <div key={unit} className="rounded-xl bg-slate-50 border border-gray-100 p-4">
                <p className="font-bold text-primary-700">{unit}</p>
                <p className="text-sm text-gray-600 mt-1">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4"><CheckCircle2 className="h-5 w-5" /><h2 className="font-bold">CompletableFuture Notifications</h2></div>
            {data?.asyncNotifications?.length ? data.asyncNotifications.map((message) => <p key={message} className="text-sm text-slate-200 py-2 border-b border-slate-700">{message}</p>) : <p className="text-sm text-slate-300">Waiting for asynchronous result...</p>}
          </section>

          <section className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold mb-3">Java 9+ Feature Examples</h2>
            <pre className="whitespace-pre-wrap text-sm text-slate-200 font-mono">{data?.modernFeatureReport || 'Loading text block...'}</pre>
            <p className="mt-4 text-sm text-slate-300">{data?.patternMatchingResult || 'Loading pattern matching...'}</p>
            <p className="mt-4 text-sm text-slate-300">{data?.statusMessage || 'Loading status...'}</p>
          </section>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="/admin/dashboard" className="text-primary-700 font-semibold hover:underline">← Back to Dashboard</Link>
          <Link href="/catalog" className="text-primary-700 font-semibold hover:underline">Browse Catalog →</Link>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
      <Icon className="h-5 w-5 text-primary-600 mb-4" />
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b last:border-0 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-right">{value ?? '—'}</span>
    </div>
  );
}
