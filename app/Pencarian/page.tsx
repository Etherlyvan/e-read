import { auth } from "@/auth";

const Pencarian = async () => {
  const session = await auth();
  return (
    <div className="mt-16">
          <h2 className="text-4xl font-bold tracking-wide">
        Selamat Datang <span className="font-bold">{session?.user?.name}</span>
      </h2>
      <h2 className="text-4xl font-bold tracking-wide">
        Di Pencarian Perpustakaan Digital
      </h2>
    </div>
  );
}

export default Pencarian;
