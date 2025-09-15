import Header from "@/components/Header";
import { WhyteInktrap, poppins, instrumentSerif } from "./fonts";
import "./globals.css";
import TitleChanger from "@/components/TitleChanger";
import Footer from "@/components/Footer";

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
