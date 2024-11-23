import { auth } from "@/auth";
import Hero from "@/components/hero";

const Home = async () => {
  const session = await auth();
  return (
    <Hero userName={session?.user?.name ?? ' '} />
  );
}

export default Home;
