import ProfileFrame from "@/components/ui/ProfileFrame";
import React from "react";

const About = () => {
  return (
    <div id="about" className="about-section bg-primary section-clip-left pt-10 pb-50 border-t-2 shadow-md">
      <div className="sticky top-16">
        <h2 className="font-whyte font-bold text-center text-[15vw] text-nowrap leading-[70%]  pt-2 z-1">
          About Hardik
        </h2>
        <div className="flex items-center justify-between text-text px-2 z-1 opacity-80">
          <span className="text-xs sm:text-sm uppercase font-medium sm:font-bold">
            Developer
          </span>
          <span className="text-xs sm:text-sm uppercase font-medium sm:font-bold">
            Designer
          </span>
          <span className="text-xs sm:text-sm uppercase font-medium sm:font-bold">
            Freelancer
          </span>
          <span className="text-xs sm:text-sm uppercase font-medium sm:font-bold">
            Learner
          </span>
          <span className="text-xs sm:text-sm uppercase font-medium sm:font-bold">Seeker</span>
        </div>
      </div>
      <div className="container-fluid mt-60 md:mt-80 z-20">
        <ProfileFrame
          name="Hardik Patel"
          designation="hkpatelofficial69@gmail.com"
          image="/assets/hardik.jpeg"
        />
        <div className="py-40 flex flex-col sm:flex-row gap-5 sm:gap-10 justify-start mix-blend-difference text-white">
          <div className="basis-[35%]">
            <p className="uppercase text-sm font-bold">Approach</p>
          </div>
          <div className="lg:basis-[40%]">
            <h4 className="text-4xl sm:text-5xl font-bold ">
              Designing for <br /> Impact and <br />{" "}
              <em className="font-serif font-medium">Clarity</em>
            </h4>
            <p className="font-medium text-lg mt-15">
              I believe design is more than just visuals. For me, it’s about
              clarity and purpose. Every project I work on starts with
              understanding the goal and making sure the final result feels
              simple, clear, and effective.
            </p>
          </div>
        </div>

        <div className="py-40 flex flex-col sm:flex-row gap-5 sm:gap-10 justify-end mix-blend-difference text-white">
          <div className="basis-[20%]">
            <p className="uppercase text-sm font-bold">Background</p>
          </div>
          <div className="lg:basis-[40%]">
            <h4 className="text-4xl sm:text-5xl font-bold ">
              From Work <br /> to Creative <br />{" "}
              <em className="font-serif font-medium">Freedom</em>
            </h4>
            <p className="font-medium text-lg mt-10">
              I began my career as a web designer at a startup, where I later
              explored frontend development and learned how clarity and
              communication shape real impact.
            </p>
            <p className="font-medium text-lg mt-5">
              Today, I balance a full-time job with freelance projects. This mix
              keeps me steady yet gives me the freedom to experiment, explore
              new ideas, and deliver work that feels meaningful.
            </p>
          </div>
        </div>
        <div className="pt-40 flex flex-col sm:flex-row gap-5 sm:gap-10 justify-start mix-blend-difference text-white">
          <div className="basis-[20%]">
            <p className="uppercase text-sm font-bold text-nowrap">
              Beyond Design
            </p>
          </div>
          <div className="lg:basis-[40%]">
            <h4 className="text-4xl sm:text-5xl font-bold ">
              Life Outside the <br />{" "}
              <em className="font-serif font-medium">Workspace</em>
            </h4>
            <p className="font-medium text-lg mt-15">
              When I’m not designing or developing, I enjoy traveling, playing
              games, watching movies, and exploring new creative ideas. Watching
              movies & shows is something I truly enjoy, and all inspires me in
              different ways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
