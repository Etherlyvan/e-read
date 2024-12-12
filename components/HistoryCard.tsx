import Image from "next/image";
import Link from 'next/link';

type HistoryCardProps = {
  bookId: string;
  title: string;
  genre: string;
  image: string;
  openedAt: string;
};

const HistoryCard = ({ bookId, title, genre, image, openedAt }: HistoryCardProps) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-md shadow p-4 bg-white transition-transform duration-300 hover:scale-105">
      <Link href={`/bookDetail/${bookId}`}>
        <div className="relative w-16 h-24 mr-4">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{genre}</p>
        <p className="text-xs text-gray-500">Opened At: {new Date(openedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
