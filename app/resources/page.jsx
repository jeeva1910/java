'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Layers, ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

export default function DigitalResourcesPage() {
  const resources = useSelector((state) => state.resources.resources);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-950">Digital Learning Resources</h1>
        <p className="text-gray-600 mt-1">Authorized access to premier research databases, journals, and open courseware.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {res.category}
                </span>
                <span className="text-xs text-gray-500 font-medium">{res.type}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{res.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>Campus Network Authorized</span>
              </div>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors flex items-center space-x-1.5"
              >
                <span>Access Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
