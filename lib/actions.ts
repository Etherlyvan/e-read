"use server";

import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma"; // Mengimpor PrismaClient dengan benar
import { redirect } from "next/navigation"; // Mengimpor fungsi redirect dari Next.js
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import {put, del} from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getBookById } from "@/lib/data";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signInCredentials = async (prevState: unknown, formData: FormData) => {
  const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {  email, password } = validatedFields.data
 
  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };
        default:
          return { message: "Something went wrong." };
      }
    }
    throw error;
  }
  
  
};

export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
  const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = hashSync(password, 10);

  // Simpan pengguna baru ke database
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });

  
   
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      message: "Failed to register user",
    };
  }
    // Redirect pengguna ke halaman login setelah berhasil mendaftar
    return redirect("/login");
};


const UploadSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size===0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 40000000, {
      message: "Image must be less than 40MB",
    }),
  PDF: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "PDF is required" })
    .refine((file) => file.size===0 || file.type === "application/pdf", {
      message: "Only PDFs are allowed",
    })
    .refine((file) => file.size < 40000000, {
      message: "PDF must be less than 40MB",
    }),
});


export const uploadBook= async (prevState: unknown, formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, genre, image,PDF } = validatedFields.data;
  // Pastikan fungsi `put` mengembalikan objek dengan properti `url`
  const { url: urlImage } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });
  const { url: urlPDF } = await put(PDF.name, PDF, {
    access: "public",
    multipart: true,
  });


  try {
    await prisma.book.create({
      data: {
        title,
        image: urlImage,
        genre,
        pdf: urlPDF
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: "Failed to create data" };
  }
  
  revalidatePath("/dashboard");
  redirect("/dashboard");
};


const EditSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size===0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 40000000, {
      message: "Image must be less than 40MB",
    })
    .optional(),
  PDF: z
    .instanceof(File)
    .refine((file) => file.size===0 || file.type === "application/pdf", {
      message: "Only PDFs are allowed",
    })
    .refine((file) => file.size < 40000000, {
      message: "PDF must be less than 40MB",
    })
    .optional(),
});


export const updateBook= async (id: string,prevState: unknown, formData: FormData) => {
  const validatedFields = EditSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = await getBookById(id);
  if (!data) return { message: "No Data Found" };

  const { title, genre, image,PDF } = validatedFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    // Pastikan fungsi `put` mengembalikan objek dengan properti `url`
    const { url: urlImage } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = urlImage;
  }
  let PDFPath;
  if (!PDF || PDF.size <= 0) {
    PDFPath = data.pdf;
  } else {
    await del(data.pdf);
    const { url: urlPDF } = await put(PDF.name, PDF, {
      access: "public",
      multipart: true,
    });
  
    PDFPath = urlPDF;
  }


  try {
    await prisma.book.update({
      data: {
        title,
        image: imagePath,
        genre,
        pdf: PDFPath,
      },
      where: { id },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: "Failed to update data" };
  }
  
  revalidatePath("/dashboard");
  redirect("/dashboard");
};



export const deleteBook = async (id: string) => {
  const data = await getBookById(id);
  if (!data) return { message: "No data found" };

  // Menghapus gambar
  await del(data.image);

  // Menghapus PDF
  if (data.pdf) {
    await del(data.pdf);
  }

  try {
    // Menghapus entri favorit yang terkait dengan buku
    await prisma.favorite.deleteMany({
      where: { bookId: id },
    });

    // Menghapus buku
    await prisma.book.delete({
      where: { id },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: "Failed" };
  }

  revalidatePath("/");
  return { message: "success" };
};


export async function toggleFavorite(userId: string, bookId: string) {
  try {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      return { message: 'Favorite removed', isFavorite: false };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return { message: 'Favorite added', isFavorite: true };
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw new Error('Failed to toggle favorite');
  }
}

export async function checkFavoriteStatus(userId: string, bookId: string) {
  try {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });
    return !!existingFavorite;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    throw new Error('Failed to check favorite status');
  }
}