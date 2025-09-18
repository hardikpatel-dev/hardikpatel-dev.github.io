import "./globals.css";
import { WhyteInktrap, poppins, instrumentSerif } from "./fonts";
import TitleChanger from "@/components/TitleChanger";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Suspense } from "react";
import { IconLoader } from "@tabler/icons-react";
import LenisProvider from "./LenisProvider";

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
        <LenisProvider>
          <TitleChanger />
          <Header />
          <Suspense
            fallback={
              <div className="fixed inset-0 flex items-center justify-center">
                <IconLoader className="text-white animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
