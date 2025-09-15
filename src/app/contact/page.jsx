"use client";
import { fields } from "@/data/form-input";
import {
  IconArrowDownLeft,
  IconArrowDownRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconHeartHandshake,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  // 🔥 Array me fields define kardo
  
  return (
    <div className="bg-primary min-h-[calc(100vh-100px)] mx-2 xs:mx-4 mb-2 xs:mb-4 rounded-xl shadow-sm">
      <div className="flex xs:flex-row flex-col py-12 md:py-24 container-fluid gap-4">
        <h2 className="heading basis-[80%] md:basis-[70%]">
          <p className="inline-flex items-baseline flex-nowrap text-nowrap">
            <span className=" w-14 h-14 rounded-[50%] overflow-hidden me-3 inline-block xs:hidden">
              <Image
                src="/assets/hardik.jpeg"
                alt="Hardik's Photo"
                width={50}
                height={50}
                quality={50}
                loading="lazy"
                className="object-cover h-full w-full "
              />
            </span>{" "}
            Open to <span className="text-green-600">.</span>
          </p>{" "}
          <br />{" "}
          <span className="font-serif tracking-wide text-5xl">
            Opportunities & Collaborations
          </span>
        </h2>
        <div className="flex-1 flex flex-col xs:items-start items-end justify-between">
          <div className="w-25 h-25 rounded-[50%] overflow-hidden mb-20  hidden xs:inline">
            <Image
              src="/assets/hardik.jpeg"
              alt="Hardik's Photo"
              width={100}
              height={100}
              quality={50}
              priority
              className="object-cover h-full w-full"
            />
          </div>
          <IconArrowDownRight
            size={40}
            stroke={1}
            className="hidden md:block"
          />
          <IconArrowDownLeft size={40} stroke={1} className="block md:hidden" />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row container-fluid gap-12">
        <div className="basis-[100%] md:basis-[70%] h-full">
          <div className="flex xs:items-center gap-1 mb-4">
            <IconHeartHandshake className="text-amber-400" />
            <p className="text-md italic font-whyte  text-text-muted">
              — let’s connect! — I’d love to hear from you."
            </p>
          </div>
          <form className="w-full lg:max-w-3xl space-y-12">
            {fields.map((field, index) => (
              <div key={field.id} className="border-t border-light pt-8">
                <div className="flex gap-8">
                  {/* Number */}
                  <span className="text-text-muted text-sm w-6">
                    {field.number}
                  </span>

                  {/* Label + Input */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor={field.id}
                      className="text-xl tracking-tight font-medium mb-2 cursor-pointer"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="bg-transparent border-none text-xl py-4 placeholder-text-muted focus:outline-none focus:ring-0 w-full min-h-32 resize-y"
                      />
                    ) : (
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="bg-transparent border-none text-xl py-4 placeholder-text-muted focus:outline-none focus:ring-0 w-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="py-30">
              <div className="flex relative">
                <div className="stripe block w-full h-[1px] bg-gray-700 "></div>
                <div className="absolute top-0 right-0 transform -translate-x-1/3 sm:-translate-x-1/2 -translate-y-1/2">
                  <button
                    type="submit"
                    className="magnetic-hover inline-flex  w-30 sm:w-40 h-30 sm:h-40 justify-center items-center rounded-full bg-inverse text-inverse text-shadow-lg cursor-pointer"
                  >
                    Send it!
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 flex flex-row md:flex-col gap-6 md:gap-12 flex-wrap items-stretch justify-between md:justify-start ">
          <div className="flex flex-col gap-4 bg-secondary md:bg-transparent p-2 rounded-xl flex-1 md:flex-0">
            <span className="uppercase text-xs tracking-wider text-text-muted">
              Contact Details
            </span>
            <Link
              href="mailto:hkpatelofficial69@gmail.com"
              className="relative group text-md w-fit"
            >
              hkpatelofficial69@gmail.com
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-inverse transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>

            <Link href="tel:+916386921922" className="relative group text-md w-fit">
              +91 6386 921 922
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-inverse transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:gap-2 bg-secondary md:bg-transparent p-2 rounded-xl flex-1 md:flex-0">
            <span className="uppercase text-xs tracking-wider text-text-muted">
              Address Details
            </span>
            <span className="text-md capitalize">Varanasi, Uttar Pradesh</span>
            <span className="text-md capitalize">Country: India</span>
            <span className="text-md capitalize">Zip code: 221103</span>
          </div>
          <div className="flex flex-col gap-4 bg-secondary md:bg-transparent p-2 rounded-xl flex-1 md:flex-0">
            <span className="uppercase text-xs tracking-wider text-text-muted">
              Socials
            </span>
            <Link
              href="tel:+916386921922"
              className="text-md flex items-center gap-2 relative group w-fit"
            >
              <IconBrandWhatsapp size={20} />
              Whatsapp
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-inverse transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/hardik-kumar-patel-564798227"
              className="text-md flex items-center gap-2 relative group w-fit"
            >
              <IconBrandLinkedin size={20} />
              LinkedIn
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-inverse transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              href="https://github.com/hardikpatel-dev"
              className="text-md flex items-center gap-2 relative group w-fit"
            >
              <IconBrandGithub size={20} />
              Github
              <span className="absolute left-1/2 bottom-0 h-[1px] w-0 bg-inverse transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
