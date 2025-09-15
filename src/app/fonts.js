import localFont from "next/font/local";
import { Instrument_Serif, Poppins } from "next/font/google";

// Whyte Inktrap (local)
export const WhyteInktrap = localFont({
  src: [
    {
      path: "../../public/fonts/whyte-inktrap/WhyteInktrap-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/whyte-inktrap/WhyteInktrap-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/whyte-inktrap/WhyteInktrap-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/whyte-inktrap/WhyteInktrap-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/whyte-inktrap/WhyteInktrap-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/whyte-inktrap/WhyteInktrap-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-whyte",
  display: "swap",
});

// Poppins (Google)
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});