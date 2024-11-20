import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
