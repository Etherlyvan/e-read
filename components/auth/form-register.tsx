"use client";

import React from "react";
import Link from "next/link";
import { signUpCredentials } from "@/lib/actions";
import { RegisterButton } from "@/components/button";

const FormRegister = () => {
  const [state, formAction] = React.useActionState(signUpCredentials, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.message?(<div className="p-4 mb-4 text-sm text-red-800 rounded---lg bg-red-100" role="alert">
        <span className="font-medium">
          {state?.message}
        </span>
      </div>): null}
      
      {/* Nama */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">{state?.error?.name}</span>
        </div>
      </div>
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
      {/* Confirm Password */}
      <div>
        <label htmlFor="ConfirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
          Confirm Password
        </label>
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="********"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">{state?.error?.ConfirmPassword}</span>
        </div>
      </div>
      {/* Submit Button */}
      <RegisterButton />
      {/* Already have an account */}
      <div className="text-sm font-medium text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign-In
        </Link>
      </div>
    </form>
  );
};

export default FormRegister;
