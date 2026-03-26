
import dynamic from "next/dynamic";
import About from "@/sections/About";
import Hero from "@/sections/Hero";
import TechStack from "@/sections/TechStack";
import Testimonial from "@/sections/Testimonial";
import Loader from "@/components/Loader";

const Work = dynamic(() => import("@/sections/Work"), {
  loading: () => <Loader />,
});
const GridWorkShowcase = dynamic(
  () => import("@/sections/GridWorkShowcase"),
  { loading: () => <Loader /> }
);

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
