import { getUsers } from "@/lib/data";
import { DeleteAccountButton } from "@/components/button"; // Pastikan path ini benar
import Link from "next/link";

const UserTable = async () => {
  const users = await getUsers();
  if (!users?.length) return <h1 className="text-2xl">No User Found</h1>;

  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Role</th>
          <th className="py-3 px-6 text-left text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b border-gray-100">
            <td className="py-3 px-6">{user.name}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6">{user.role}</td>
            <td className="py-3 px-6 flex space-x-2">
              <DeleteAccountButton userId={user.id} />
              <Link href={`/userHistory/${user.id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                  View History
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
