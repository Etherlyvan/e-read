"use client";

import { useFormStatus } from "react-dom";
import { clsx } from "clsx";

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


export const SubmitButton = ({label}:{label:string}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        "bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600",
        {
          "opacity-50 cursor-progress": pending,
        }
      )}
      type="submit"
      disabled={pending}
    >
      {label === "upload"?(
        <> {pending ? "Uploading..." : "Upload"}</>
      ):(
        <> {pending ? "Updating..." : "Update"}</>
      )}
      
    </button>
  );
};