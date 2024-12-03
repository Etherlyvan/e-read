import UserTable from "@/components/user-table";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users",
};

const UserPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User List</h1>
          <Link href="/register" passHref>
            <button className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
              Create Account
            </button>
          </Link>
        </div>
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
