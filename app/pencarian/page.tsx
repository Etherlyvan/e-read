// /pages/pencarian/page.tsx

import { getBooks } from "@/lib/data";
import Card from "@/components/card";

type SearchParamsPromise = Promise<{ search?: string }>;

const Pencarian = async ({ searchParams }: { searchParams: SearchParamsPromise }) => {
  const books = await getBooks();
  const { search = '' } = await searchParams;
  const searchTerm = search.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));

  return (
    <div className="mt-16 px-4 md:px-8">

      <form method="GET" className="mt-5 mb-10 flex space-x-2">
        <input
          type="text"
          name="search"
          placeholder="Cari buku..."
          defaultValue={searchTerm}
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="p-2 w-32 bg-blue-500 text-white rounded-md">Cari</button>
      </form>
      <div className="grid md:grid-cols-6 gap-5 mt-10">
        {filteredBooks.map((book) => (
          <Card key={book.id} data={book} />
        ))}
      </div>
    </div>
  );
}

export default Pencarian;
