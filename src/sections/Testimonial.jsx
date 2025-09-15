import testimonials from "@/data/testimonials";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Testimonial = () => {
  return (
    <div id="testimonials" className=" py-20 bg-primary">
      <div className="text-center container-fluid">
        <span className="inline-block mx-auto rounded-full p-2 mb-4 text-sm border">
          Testimonials
        </span>
        <h2 className="font-whyte font-bold text-center text-[12vw] text-nowrap leading-[70%]  pb-20 z-1">
          <em className="font-serif font-medium">Voices</em> of Trust
        </h2>
        <div className="flex items-center justify-between font-whyte px-2 z-1 text-text-muted">
          <span className="text-xs sm:text-sm uppercase font-bold hidden sm:inline">
            Don’t just take my word for it
          </span>
          <span className="text-xs sm:text-sm uppercase font-bold">
            Kind words
          </span>
          <span className="text-xs sm:text-sm uppercase font-bold">
            Notes from friends & clients.
          </span>
        </div>
      </div>
      <div className="container-fluid py-20 bg-secondary rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2  xl:flex-row flex-col items-start justify-around gap-16 sm:gap-24">
          {testimonials.map((t, index) => {
            const isLastSingle =
              index === testimonials.length - 1 &&
              testimonials.length % 2 !== 0;
            return (
              <div
                key={t.id}
                className={`flex flex-col items-center gap-8  w-full
              ${isLastSingle ? "md:col-span-2 md:justify-center" : ""}`}
              >
                {/* Profile Frame */}
                <div
                  className={`min-w-45 w-45 h-65 bg-white mx-auto sm:mx-0 p-2 rounded-sm overflow-hidden 
                    ${index % 2 === 1 ? "rotate-2" : "-rotate-2"}
                     shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-0 box-shadow`}
                >
                  <Link href={t.linkedin} target="_blank" className="block w-full h-50">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={80}
                      height={100}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      quality={100}
                    />
                  </Link>
                  <div className="flex justify-between items-center gap-2 pt-2">
                    <p className="text-xs font-medium capitalize  text-black">
                      {t.name}
                    </p>
                    {/* LinkedIn Link */}
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600"
                      >
                        <IconBrandLinkedinFilled size={20} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs font-normal text-gray-600">
                    {t.designation}
                  </p>
                </div>

                {/* Feedback */}
                <div className="min-w-0 w-full sm:max-w-sm font-serif text-lg sm:text-xl text-center ">
                  <p className="tracking-wider">"{t.feedback}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
