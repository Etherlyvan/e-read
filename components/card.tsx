import Image from "next/image";
import Link from 'next/link';
import { DeleteButton, EditButton } from "./button";
import type { Book } from "@prisma/client";

const Card = ({ data }: { data: Book }) => {
  return (
    <Link href={`/books/${data.id}`} legacyBehavior>
      <div className="max-w-sm border border-gray-200 rounded-md shadow cursor-pointer block transition-transform duration-300 hover:scale-105">
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
        <div className="p-5">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{data.title}</h1>
        </div>
        <div className="flex items-center justify-between p-5">
          <EditButton id={data.id}/>
          <DeleteButton id={data.id}/>
        </div>
      </div>
    </Link>
  );
};

export default Card;
