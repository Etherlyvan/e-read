import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import SidebarClient from "@/components/sidebarClient";

const Sidebar = async () => {
  const session = await auth();

  if (!session) return null; // Do not render the sidebar if there is no session

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="py-10 p-4 flex flex-col items-center">
        <Link href="/">
          <Image
            className="h-32 mb-4"
            src="/logo_smk.svg"
            alt="SMK Logo"
            width={128}
            height={128}
          />
        </Link>
        <SidebarClient session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;
