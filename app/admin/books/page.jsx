'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, updateBook, deleteBook } from '@/store/bookSlice';
import Sidebar from '@/components/Sidebar';
import { BookOpen, Plus, Trash2, Edit3, X } from 'lucide-react';

export default function AdminBooksPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [totalCopies, setTotalCopies] = useState(5);
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishYear, setPublishYear] = useState(2024);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setAuthor('');
    setIsbn('');
    setCategory('Computer Science');
    setTotalCopies(5);
    setDescription('');
    setPublisher('');
    setPublishYear(2024);
    setIsOpen(true);
  };

  const handleOpenEdit = (book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setCategory(book.category);
    setTotalCopies(book.totalCopies);
    setDescription(book.description);
    setPublisher(book.publisher);
    setPublishYear(book.publishYear);
    setCoverImage(book.coverImage);
    setIsOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateBook({ id: editingId, title, author, isbn, category, totalCopies, description, publisher, publishYear, coverImage }));
    } else {
      dispatch(addBook({ title, author, isbn, category, totalCopies, description, publisher, publishYear, coverImage }));
    }
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-950">Book Inventory Management</h1>
            <p className="text-gray-600 mt-1">Add, edit, and manage book catalog and stock counts.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Book</span>
          </button>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Book Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">ISBN</th>
                  <th className="px-4 py-3">Available / Total</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{b.title}</td>
                    <td className="px-4 py-3 text-gray-600">{b.author}</td>
                    <td className="px-4 py-3 text-gray-600">{b.category}</td>
                    <td className="px-4 py-3 text-gray-600">{b.isbn}</td>
                    <td className="px-4 py-3 text-gray-600">{b.availableCopies} / {b.totalCopies}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button onClick={() => handleOpenEdit(b)} className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => dispatch(deleteBook(b.id))} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Book' : 'Add New Book'}</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                    <input
                      type="text"
                      required
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Copies</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={totalCopies}
                      onChange={(e) => setTotalCopies(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Publish Year</label>
                    <input
                      type="number"
                      required
                      value={publishYear}
                      onChange={(e) => setPublishYear(parseInt(e.target.value) || 2024)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                  <input
                    type="text"
                    required
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded-lg text-sm">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold">
                    Save Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
