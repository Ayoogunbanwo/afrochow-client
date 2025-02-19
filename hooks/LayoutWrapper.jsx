"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();


  const noFooterPages = [
    "/customer/Createaccount",
    "/customer/Profile",
    "/Shop/storemanagement",
    "/customer",
    "/Shop/signup-business",
    "/Shop/business-owner-profile",
    "/Shop/signin-business",
    "/customer/displayProfile",
    "/customer/forgot-password",
    "/customer/reset-password",
  ];

  return (
    <>
      {children}
      {!noFooterPages.includes(pathname) && <Footer />}
    </>
  );
}
