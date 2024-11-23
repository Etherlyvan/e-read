import { ReactNode } from "react";

interface SegmentParams {
  id: string;
}

export interface LayoutProps {
  children?: React.ReactNode;
  params?: Promise<SegmentParams>;
}

export default async function Layout(props: { children: ReactNode; params: Promise<{ id: string }> }) {
  const { children, params } = props;
  const { id } = await params;

  const renderErrorAlert = (error?: string) => {
    if (error === "OAuthAccountNotLinked") {
      return (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">Account Already Been Used in another Platform</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {children}
      {renderErrorAlert(id)}
    </div>
  );
}
