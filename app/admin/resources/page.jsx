'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addResource, deleteResource } from '@/store/resourceSlice';
import Sidebar from '@/components/Sidebar';
import { Layers, Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminResourcesPage() {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.resources.resources);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [type, setType] = useState('Research Database');

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addResource({ title, description, url, category, type }));
    setTitle('');
    setDescription('');
    setUrl('');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Digital Learning Resources Management</h1>
          <p className="text-gray-600 mt-1">Add and manage authorized research databases, journals, and courseware links.</p>
        </div>

        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Add New Resource</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="IEEE Xplore"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource URL</label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="https://ieeexplore.ieee.org"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="General Engineering">General Engineering</option>
                <option value="Mathematics & Physics">Mathematics & Physics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
              <input
                type="text"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Research Database"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="2"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Description of the digital resource..."
            />
          </div>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
            Add Resource
          </button>
        </form>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Current Digital Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div key={res.id} className="p-5 border border-gray-200 rounded-xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-primary-50 text-primary-700">{res.category}</span>
                    <button onClick={() => dispatch(deleteResource(res.id))} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-gray-900">{res.title}</h3>
                  <p className="text-xs text-gray-600">{res.description}</p>
                </div>
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline flex items-center space-x-1">
                  <span>{res.url}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
