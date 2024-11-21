"use client";

import Link from "next/link";
import { signInCredentials } from "@/lib/actions";
import { LoginButton } from "@/components/button";
import { useActionState } from 'react';

const FormLogin = () => {
  const [state, formAction] = useActionState(signInCredentials, null);
  return (
    <form action={formAction} className="space-y-6">
      {state?.message ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">{state?.message}</span>
          </div>
      ) : null}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">{state?.error?.email}</span>
        </div>
      </div>
      {/* Password */}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">{state?.error?.password}</span>
        </div>
      </div>
     
      {/* Submit Button */}
    
        <LoginButton />
    
      {/* Already have an account */}
      <div className="text-sm font-medium text-gray-500">
        Doesn&apos;t have an account yet?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Sign up here!
        </Link>
      </div>
    </form>
  );
};

export default FormLogin;
