import React from 'react';
import { BookOpen, Github, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Apex Library</span>
            </div>
            <p className="text-sm text-gray-400">
              A complete digital library management system empowering students and administrators with seamless circulation, cataloging, and digital learning resources.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/catalog" className="hover:text-white transition-colors">Book Catalog</a></li>
              <li><a href="/resources" className="hover:text-white transition-colors">Digital Resources</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Student Portal</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Admin Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Computer Science</li>
              <li>Electronics Engineering</li>
              <li>Mechanical Engineering</li>
              <li>Physics & Mathematics</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact & Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span>University Campus, Library Block, Room 402</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span>library@college.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-500 flex-shrink-0" />
                <span>+1 (555) 382-9100</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Apex Digital Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
