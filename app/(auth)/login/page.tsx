import FormLogin from "@/components/auth/form-login";
import { GithubButton, GoogleButton } from "@/components/auth/social-button";

interface SegmentParams {
  id: string;
}

// Generated types by Next.JS
export interface LayoutProps {
  children?: React.ReactNode;
  params?: Promise<SegmentParams>;
}



const Login = ({ searchParams }: { searchParams?: { error?: string } }) => {
  const params = searchParams?.error;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Sign In to your account
      </h1>
      {params === "OAuthAccountNotLinked" ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">Account Alredy Been Used in another Platform</span>
        </div>
      ) : null}
      <FormLogin />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">Or</p>
      </div>
      <GoogleButton />
      <GithubButton />
    </div>
  );
};

export default Login;
