"use client";

import { usePathname } from "next/navigation";

const NavbarClient = () => {
  const pathname = usePathname();

  const getPageName = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Beranda";
      case "/pencarian":
        return "Pencarian";
      case "/product":
        return "Rak";
      case "/user":
        return "Users";
      default:
        return "";
    }
  };

  return (
    <div className="text-3xl font-semibold">
      {getPageName(pathname)}
    </div>
  );
};

export default NavbarClient;
