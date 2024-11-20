"use client";

import { useFormStatus } from "react-dom";

export const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center"
      >
        {pending ? "Authenticating..." : "Sign-In"}
      </button>
    );
  };

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center"
    >
      {pending ? "Registering..." : "Register"}
    </button>
  );
};
