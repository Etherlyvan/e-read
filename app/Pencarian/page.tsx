import { auth } from "@/auth";
import Hero from "@/components/hero";

const Pencarian = async () => {
  const session = await auth();
  return (
    <Hero userName={session?.user?.name ?? 'Pengguna'} />
  );
}

export default Pencarian;
