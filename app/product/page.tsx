import { auth } from "@/auth";
import Card from "@/components/card";
import { getFavoriteBooks } from '@/lib/data';


const Dashboard = async () => {
  const session = await auth();
  const books = await getFavoriteBooks(session?.user.id??"");

  return (
    <div>
      <div className="max-w-screen-lg mx-auto py-5">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold">Favorite Books</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-5 mt-10">
          {books.map((book) => (
            <Card key={book.id} data={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;