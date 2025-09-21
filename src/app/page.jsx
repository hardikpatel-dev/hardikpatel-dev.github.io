
import { Suspense, lazy } from "react";
import Loader from "@/components/Loader";
import About from "@/sections/About";
const Work = lazy(() => import("@/sections/Work"));
const GridWorkShowcase = lazy(() => import("@/sections/GridWorkShowcase"));
import Hero from "@/sections/Hero";
import TechStack from "@/sections/TechStack";
import Testimonial from "@/sections/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loader />}>
        <Work />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <GridWorkShowcase />
      </Suspense>
      <TechStack />
      <About />
      <Testimonial />
    </>
  );
}
