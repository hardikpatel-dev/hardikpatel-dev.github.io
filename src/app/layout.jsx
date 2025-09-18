import "./globals.css";
import { WhyteInktrap, poppins, instrumentSerif } from "./fonts";
import TitleChanger from "@/components/TitleChanger";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
        <TitleChanger />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
