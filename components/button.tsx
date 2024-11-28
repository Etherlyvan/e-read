"use client";

import { useFormStatus } from "react-dom";
import { clsx } from "clsx";
import Link from "next/link";
import { checkFavoriteStatus, deleteBook, toggleFavorite } from "@/lib/actions";
import React, { useEffect, useState } from 'react';
import Modal from "@/components/modal";



export const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center"
      >
        {pending ? "Authenticating..." : "Sign-In"}
      </button>
    );
  };

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center"
    >
      {pending ? "Registering..." : "Register"}
    </button>
  );
};


export const SubmitButton = ({label}:{label:string}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600",
        {
          "opacity-50 cursor-progress": pending,
        }
      )}
      type="submit"
      disabled={pending}
    >
      {label === "upload"?(
        <> {pending ? "Uploading..." : "Upload"}</>
      ):(
        <> {pending ? "Updating..." : "Update"}</>
      )}
      
    </button>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`edit/${id}`}
      className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
    >
      Edit
    </Link>
  );
};

const DeleteBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
};


export const DeleteButton = ({ id }: { id: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteBookWithId = async (formData: FormData) => {
    await deleteBook(id);
  };

  return (
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await deleteBookWithId(formData);
      }} 
      className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
    >
      <DeleteBtn />
    </form>
  );
};


// type AddFavoriteResult = 
//   | { id: string; createdAt: Date; bookId: string; userId: string; }
//   | { message: string };


// export const addFavoriteButton = ({ bookId, userId }:{bookId:string, userId:string}) => {
//   const [ message, setMessage] = useState('');

//   const handleAddFavorite = async () => {
//     const result: AddFavoriteResult = await addFavorite(bookId, userId);
//     if ('message' in result) {
//       setMessage(result.message);
//     } else {
//       setMessage('Book added to favorites');
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleAddFavorite}>Add to Favorites</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };


// type DeleteFavoriteResult = 
//   | { message: string };

// export const FavoriteButton = ({ bookId, userId }: { bookId: string, userId: string }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Cek status favorit saat komponen dimuat
//     const checkFavoriteStatus = async () => {
//       const existingFavorite = await prisma.favorite.findUnique({
//         where: {
//           userId_bookId: {
//             userId,
//             bookId,
//           },
//         },
//       });
//       setIsFavorite(!!existingFavorite);
//     };

//     checkFavoriteStatus();
//   }, [bookId, userId]);

//   const handleToggleFavorite = async () => {
//     if (isFavorite) {
//       const result: DeleteFavoriteResult = await deleteFavorite(bookId, userId);
//       if ('message' in result) {
//         setMessage(result.message);
//         setIsFavorite(false);
//       }
//     } else {
//       const result: AddFavoriteResult = await addFavorite(bookId, userId);
//       if ('message' in result) {
//         setMessage(result.message);
//       } else {
//         setMessage('Book added to favorites');
//         setIsFavorite(true);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleToggleFavorite}>
//         {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };






// export const FavoriteButton = ({ bookId, userId }: { bookId: string, userId: string }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const checkFavoriteStatus = async () => {
//       try {
//         const response = await fetch(`/api/favorites/checkFavorite?userId=${userId}&bookId=${bookId}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setIsFavorite(data.isFavorite);
//       } catch (error) {
//         console.error('Error checking favorite status:', error);
//       }
//     };

//     checkFavoriteStatus();
//   }, [bookId, userId]);

//   const handleToggleFavorite = async () => {
//     if (isFavorite) {
//       const result: DeleteFavoriteResult = await deleteFavorite(bookId, userId);
//       if ('message' in result) {
//         setMessage(result.message);
//         setIsFavorite(false);
//       }
//     } else {
//       const result: AddFavoriteResult = await addFavorite(bookId, userId);
//       if ('message' in result) {
//         setMessage(result.message);
//       } else {
//         setMessage('Book added to favorites');
//         setIsFavorite(true);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleToggleFavorite}>
//         {isFavorite ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };


export const FavoriteButton = ({ bookId, userId }: { bookId: string, userId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const isFav = await checkFavoriteStatus(userId, bookId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, [bookId, userId]);

  const handleToggleFavorite = async () => {
    try {
      const result = await toggleFavorite(userId, bookId);
      setMessage(result.message);
      setIsFavorite(result.isFavorite);
      setShowModal(true);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setMessage('Failed to update favorite status');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
      </button>
      {showModal && <Modal message={message} onClose={closeModal} />}
    </div>
  );
};