import Image from "next/image";
import Link from 'next/link';
import { DeleteButton, EditButton, FavoriteButton } from "@/components/button";
import type { Book } from "@prisma/client";
import { auth } from "@/auth";

// Dynamically import the client component
import CardClient from "@/components/CardClient";

const Card = async ({ data }: { data: Book }) => {
  const session = await auth();
  return (
    <div className="max-w-xs border border-gray-200 rounded-md shadow cursor-pointer block transition-transform duration-300 hover:scale-105">
      <Link href={`/bookDetail/${data.id}`}>
        <div className="relative aspect-[3/4]">
          <Image
            src={data.image}
            alt={data.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-md object-cover"
          />
        </div>
      </Link>
      <CardClient title={data.title} genre={data.genre} />
      <div className="flex items-center justify-between p-3">
        <FavoriteButton bookId={data.id} userId={session?.user?.id ?? ""} />
        {session && session.user.role === 'admin' && (
          <div className="flex items-center space-x-2">
            <EditButton id={data.id} />
            <DeleteButton id={data.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
