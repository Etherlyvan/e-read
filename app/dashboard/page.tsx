import { auth } from "@/auth";
import Hero from "@/components/hero";

const Dashboard = async () => {
  const session = await auth();
  return (
    <Hero userName={session?.user?.name ?? 'Pengguna'} />
  );
}

export default Dashboard;
