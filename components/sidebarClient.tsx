"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

interface SidebarClientProps {
  session: Session;
}

const SidebarClient: React.FC<SidebarClientProps> = ({ session }) => {
  const currentPath = usePathname();

  const isActive = (pathname: string) => currentPath === pathname;

  return (
    <ul className="space-y-4 font-semibold text-gray-600">
      {!session && (
        <li className={`p-2 ${isActive('/') ? 'text-blue-500' : ''}`}>
          <Link href="/">Home</Link>
        </li>
      )}
      {session && (
        <>
          <li className={`p-2 ${isActive('/dashboard') ? 'text-blue-500' : ''}`}>
            <Link href="/dashboard">Beranda</Link>
          </li>
          <li className={`p-2 ${isActive('/pencarian') ? 'text-blue-500' : ''}`}>
            <Link href="/pencarian">Pencarian</Link>
          </li>
          <li className={`p-2 ${isActive('/product') ? 'text-blue-500' : ''}`}>
            <Link href="/product">Rak</Link>
          </li>
          {session.user.role === 'admin' && (
            <li className={`p-2 ${isActive('/user') ? 'text-blue-500' : ''}`}>
              <Link href="/user">Users</Link>
            </li>
            
          )}
          {session.user.role === 'admin' && (
            <li className={`p-2 ${isActive('/bookList') ? 'text-blue-500' : ''}`}>
              <Link href="/bookList">Book List</Link>
            </li>
            
          )}
        </>
      )}
    </ul>
  );
};

export default SidebarClient;
