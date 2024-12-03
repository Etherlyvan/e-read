import { getBookById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FavoriteButton } from '@/components/button';
import { auth } from '@/auth';
import Link from 'next/link';

type Params = Promise < {
    id: string;
}>;

const BookDetailPage = async ({ params }:{params:Params} ) => {
  const { id } = await params;
  const data = await getBookById(id);
  if (!data) return notFound();

  const session = await auth();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/3 aspect-[3/4] mb-4 md:mb-0">
            <Image
              src={data.image}
              alt={data.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
            />
          </div>
          <div className="md:ml-6 flex-1">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-700 mb-2"><strong>Genre:</strong> {data.genre}</p>
            {data.description && <p className="text-gray-700 mb-4"><strong>Description:</strong> {data.description}</p>}
            <div className="flex items-center space-x-4">
              <FavoriteButton bookId={data.id} userId={session?.user?.id ?? ""} />

              <Link href={`/books/${data.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Read PDF
              
              </Link>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
