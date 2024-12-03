"use client";

import { useFormStatus } from "react-dom";
import { clsx } from "clsx";
import Link from "next/link";
import { checkFavoriteStatus,  deleteAccount,  deleteBook, toggleFavorite } from "@/lib/actions";
import React, { useEffect, useState, useRef } from 'react';

import styles from './FavoriteButton.module.css'; // Impor CSS Module
import { PlusIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';




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
      className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full hover:bg-blue-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z" />
      </svg>
    </Link>
  );
};

const DeleteBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600"
    >
      {pending ? (
        <span>Deleting...</span>
      ) : (
        <TrashIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const deleteBookWithId = async () => {
    setIsLoading(true);
    try {
      const result = await deleteBook(id);
      setMessage(result.message);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage('Failed ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={async (e) => {
        e.preventDefault();
        await deleteBookWithId();
      }} 
      className="py-3 text-sm w-full-center"
    >
      <DeleteBtn />
      {isLoading && <p>Deleting...</p>}
      {message && <p>{message}</p>}
    </form>
  );
};

export const FavoriteButton = ({ bookId, userId }: { bookId: string, userId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    const buttonElement = buttonRef.current;
    if (buttonElement && buttonElement.parentNode) {
      // Akses parentNode di sini jika diperlukan
      console.log(buttonElement.parentNode);
    }
  }, [isFavorite]);

  return (
    <button ref={buttonRef} onClick={handleToggleFavorite} className={styles.button}>
      {isFavorite ? (
        <CheckIcon className={`${styles.icon} ${styles.greenIcon}`} />
      ) : (
        <PlusIcon className={`${styles.icon} ${styles.blueIcon}`} />
      )}
    </button>
  );
};


interface DeleteAccountButtonProps {
  userId: string;
}

export const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Menandakan bahwa komponen ini dijalankan di sisi klien
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    setIsLoading(true);
    setMessage('');

    try {
      await deleteAccount(userId); // Panggil fungsi untuk menghapus pengguna dari database
      setMessage('Account deleted successfully.');
      if (isClient) {
    ; // Navigasi ke halaman lain setelah penghapusan berhasil
      }
    } catch (error) {
      setMessage('Failed to delete account. Please try again.');
      console.error("Failed to delete user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteAccount}
        disabled={isLoading}
        className={`text-red-500 hover:text-red-700 ${isLoading ? 'cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Deleting...' : 'Delete Account'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};