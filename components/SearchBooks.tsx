"use client";

import { useState } from 'react';
import Card from '@/components/card';
import type { Book } from '@prisma/client';

const SearchBooks = ({ books }: { books: Book[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredBooks(
      books.filter(book => book.title.toLowerCase().includes(value))
    );
  };

  return (
    <div>
      <div className="mt-5 mb-10">
        <input
          type="text"
          placeholder="Cari buku..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid md:grid-cols-4 gap-5 mt-10">
        {filteredBooks.map((book) => (
          <Card key={book.id} data={book} />
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
