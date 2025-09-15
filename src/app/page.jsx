import Header from "@/components/Header";
import About from "@/sections/About";
import Footer from "@/components/Footer";
import GridWorkShowcase from "@/sections/GridWorkShowcase";
import Hero from "@/sections/Hero";
import TechStack from "@/sections/TechStack";
import Testimonial from "@/sections/Testimonial";
import Work from "@/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <GridWorkShowcase />
      <TechStack />
      <About />
      <Testimonial />
    </>
  );
}
