"use server";

import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma"; // Mengimpor PrismaClient dengan benar
import { redirect } from "next/navigation"; // Mengimpor fungsi redirect dari Next.js
import { signIn } from "@/auth";
import { AuthError } from "next-auth";


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

  
   
  } catch (error) {
    return {
      message: "Failed to register user",
    };
  }
    // Redirect pengguna ke halaman login setelah berhasil mendaftar
    return redirect("/login");
};
