import "./globals.css";
import { WhyteInktrap, poppins, instrumentSerif } from "./fonts";
import TitleChanger from "@/components/TitleChanger";
import InitGsapAnimations from "./animations/InitGsapAnimations";
import { Toaster } from "react-hot-toast";
import ClarityProvider from "@/components/ClarityProvider";
import AppChrome from "@/components/AppChrome";

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
        <ClarityProvider />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <InitGsapAnimations />
        <TitleChanger />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
