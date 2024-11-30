import { auth } from "@/auth";
import { getBooks } from "@/lib/data";
import Card from "@/components/card";

type SearchParamsPromise = Promise<{ search?: string }>;

const Pencarian = async ({ searchParams }: { searchParams: SearchParamsPromise }) => {
  const session = await auth();
  const books = await getBooks();
  const { search = '' } = await searchParams;
  const searchTerm = search.toLowerCase();
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));

  return (
    <div className="mt-16">
      <h2 className="text-4xl font-bold tracking-wide">
        Selamat Datang <span className="font-bold">{session?.user?.name}</span>
      </h2>
      <h2 className="text-4xl font-bold tracking-wide">
        Di Pencarian Perpustakaan Digital
      </h2>
      <form method="GET" className="mt-5 mb-10">
        <input
          type="text"
          name="search"
          placeholder="Cari buku..."
          defaultValue={searchTerm}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">Cari</button>
      </form>
      <div className="grid md:grid-cols-4 gap-5 mt-10">
        {filteredBooks.map((book) => (
          <Card key={book.id} data={book} />
        ))}
      </div>
    </div>
  );
}

export default Pencarian;
