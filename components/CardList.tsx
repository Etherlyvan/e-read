import Image from "next/image";
import Link from 'next/link';
import { DeleteButton, EditButton, FavoriteButton } from "@/components/button";
import type { Book } from "@prisma/client";
import { auth } from "@/auth";

// Dynamically import the client component
import CardClient from "@/components/CardClient";

const CardList = async ({ data }: { data: Book }) => {
  const session = await auth();
  return (
    <div className="flex items-center border border-gray-200 rounded-md shadow p-4 bg-white transition-transform duration-300 hover:scale-105">
      <Link href={`/bookDetail/${data.id}`}>
        <div className="relative w-24 h-32 mr-4">
          <Image
            src={data.image}
            alt={data.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="flex-1">
        <CardClient title={data.title} genre={data.genre} />
      </div>
      <div className="flex items-center space-x-2">
        <FavoriteButton bookId={data.id} userId={session?.user?.id ?? ""} />
        {session && session.user.role === 'admin' && (
          <>
            <EditButton id={data.id} />
            <DeleteButton id={data.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default CardList;
