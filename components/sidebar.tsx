import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

const Sidebar = async () => {
  const session = await auth();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col items-center">
        <Link href="/">
          <Image
            className="h-32 mb-4"
            src="/logo_smk.svg"
            alt="SMK Logo"
            width={128}
            height={128}
          />
        </Link>
        <ul className="space-y-4 font-semibold text-gray-600">
          <li className="p-2"><Link href="/">Home</Link></li>
          {session && (
            <>
              <li className="p-2"><Link href="/dashboard">Beranda</Link></li>
              <li className="p-2"><Link href="/product">Pencarian</Link></li>
              <li className="p-2"><Link href="/product">Rak</Link></li>
              {session.user.role === 'admin' && (
                <li className="p-2"><Link href="/user">Users</Link></li>
              )}
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
