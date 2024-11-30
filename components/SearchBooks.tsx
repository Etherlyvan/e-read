// /components/SearchBooks.tsx

import Card from "@/components/card";
import { getBooks } from "@/lib/data";

interface SearchBooksProps {
  searchTerm: string;
}

const SearchBooks = async ({ searchTerm }: SearchBooksProps) => {
  const books = await getBooks();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="grid md:grid-cols-4 gap-5 mt-10">
      {filteredBooks.map((book) => (
        <Card key={book.id} data={book} />
      ))}
    </div>
  );
};

export default SearchBooks;
