import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      <div></div>
      <div className="flex items-center gap-3">
        {session && (
          <div className="flex gap-3 items-center">
            <div className="flex flex-col justify-center -space-y-1 text-right">
              <span className="font-semibold text-gray-600 capitalize">{session?.user.name}</span>
              <span className="text-xs text-gray-400 capitalize">{session?.user.role}</span>
            </div>
            <button type="button" className="text-sm ring-2 bg-gray-100">
              <Image src={session.user.image ?? "/logo_profile.png"} alt="avatar" width={64} height={64} className="w-8 h-8 rounded-full"/>
            </button>
          </div>
        )}
        {session ? (
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500">
              Sign Out
            </button>
          </form>
        ) : (
          <Link href="/login" className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
