import { auth } from "@/auth";
import Hero from "@/components/hero";

const Home = async () => {
  const session = await auth();
  return (
    <div  className="flex justify-center items-center  h-min-screen pt-14 ">
      <Hero userName={session?.user?.name ?? ' '} />
    </div>
  );
}

export default Home;
