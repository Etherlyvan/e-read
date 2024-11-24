import { auth } from "@/auth";
import Card from "@/components/card";
import Hero from "@/components/hero";
import Link from "next/link";
import { getBooks } from "@/lib/data";

const Dashboard = async () => {
  const session = await auth();
  const books = await getBooks();
  return (
    <div>

      <Hero userName={session?.user?.name ?? 'Pengguna'} />
      
      
      <div className="max-w-screen-lg mx-auto py-14">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold">Latest Book</h1>
          <Link href="/create" className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white">
            New Image
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {/* Content goes here */}
          {books.map((book) => (
            
            <Card key={book.id} data ={book} />
          ))}
        </div>
      </div>

    </div>

  );




}

export default Dashboard;
