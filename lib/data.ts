import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getBooks = async () => {
  try {
    const result = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
export const deleteUser = async (userId: string) => {
  try {
    const result = await prisma.user.delete({
      where: { id: userId },
    });
    return result;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const getUsers = async () => {
  const session = await auth();
  if (session?.user?.role !== 'admin') {
    redirect('/dashboard');
    return;
  }

  try {
    const users = await prisma.user.findMany();
    console.log('Fetched users:', users); // Tambahkan logging di sini
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};
  
export const getProductByUser = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/dashboard");
        return; 
      }
    const role = session?.user.role;
    
    if (role === "admin") {
        try {
            const products = await prisma.product.findMany({
                include:{user:{select:{name:true}}},
            });
            return products;
          } catch (error) {
            console.log(error);
          }
    }else{
        try {
            const products = await prisma.product.findMany({
                where:{userId:session.user.id},
                include:{user:{select:{name:true}}},
            });
            return products;
          } catch (error) {
            console.log(error);
          }
    }

  };
  
  export const getBookById = async (id: string) => {
    try {
      const result = await prisma.book.findUnique({
        where: { id },
      });
      return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };
  




export const getFavoriteBooks = async (userId: string) => {
  const favoriteBooks = await prisma.favorite.findMany({
    where: { userId },
    include: { book: true },
  });
  return favoriteBooks.map(fav => fav.book);
};