"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LenisProvider from "@/app/LenisProvider";
import Loader from "@/components/Loader";
import GlobalLoader from "@/components/GlobalLoader";
import CustomCursor from "@/components/CustomCursor";

export default function AppChrome({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <Suspense fallback={<Loader />}>{children}</Suspense>;
  }

  return (
    <LenisProvider>
      <GlobalLoader />
      <CustomCursor />
      <Header />
      <Suspense fallback={<Loader />}>{children}</Suspense>
      <Footer />
    </LenisProvider>
  );
}
