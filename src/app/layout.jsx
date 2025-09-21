import "./globals.css";
import { Suspense } from "react";
import { WhyteInktrap, poppins, instrumentSerif } from "./fonts";
import TitleChanger from "@/components/TitleChanger";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LenisProvider from "./LenisProvider";
import Loader from "@/components/Loader";
import InitGsapAnimations from "./animations/InitGsapAnimations";
import GlobalLoader from "@/components/GlobalLoader";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "Hardik Patel | FrontEnd Developer",
  description: "Hardik Patel portfolio built with Next.js and Tailwind CSS v4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${WhyteInktrap.variable} ${poppins.variable} ${instrumentSerif.variable} antialiased`}
      >
        <InitGsapAnimations />
        <TitleChanger />
        <LenisProvider>
          <GlobalLoader />
          <CustomCursor />
          <Header />
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
