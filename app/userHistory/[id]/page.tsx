import { getBooks, getUserHistory } from '@/lib/data'; 
import HistoryCard from '@/components/HistoryCard';

type Params = Promise<{ id: string }>;

const UserHistoryPage = async ({ params }: { params: Params }) => {
    try {
      const { id } = await params;
      const history = await getUserHistory(id);
      const books = await getBooks();
  
      if (!history?.length) {
        return <h1 className="text-2xl text-center mt-10">No History Found</h1>;
      }
  
      // Gabungkan data buku dengan riwayat
      const historyWithBookDetails = history.map(entry => {
        const bookDetails = books.find(book => book.id === entry.bookId);
        return { ...entry, ...bookDetails };
      }).filter(entry => entry.title); // Pastikan hanya data yang valid
  
      return (
        <div className="w-full px-10 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">User History</h1>
            <ul className="space-y-4">
                {historyWithBookDetails.map((entry) => (
                <li key={entry.id} className="bg-white rounded-lg shadow-md">
                    <HistoryCard 
                    bookId={entry.bookId}
                    title={entry.title ?? 'Unknown Title'}
                    genre={entry.genre ?? 'Unknown Genre'}
                    image={entry.image ?? '/default-image.jpg'} // Ganti dengan path gambar default
                    openedAt={entry.openedAt.toISOString()} // Konversi Date ke string
                    />
                </li>
                ))}
            </ul>
        </div>

      );
    } catch (error) {
      console.error("Error fetching user history:", error);
      return <h1 className="text-2xl text-center mt-10">Error loading history</h1>;
    }
  };
  
  export default UserHistoryPage;