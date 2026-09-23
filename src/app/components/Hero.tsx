import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import heroImg from "@/app/assets/banner.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="bg-[#181a20] border border-neutral-800/80 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-6 sm:gap-8 md:gap-6 lg:gap-8 p-5 sm:p-8 md:p-10 lg:p-12">
          <div className="md:col-span-1 lg:col-span-7 space-y-4 sm:space-y-5 text-left z-10">
            <span className="block text-[#ccff00] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              WORKOUT LIBRARY
            </span>

            <h1 className="font-oswald text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
              TRAIN WITH INTENT.
              <br className="hidden sm:block" /> LOG EVERY SET.
            </h1>

            <p className="text-neutral-400 text-xs sm:text-sm md:text-sm lg:text-base max-w-xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link
                href="#library"
                className="inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black hover:bg-[#b8e600] font-bold text-[10px] sm:text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 sm:py-3 rounded-md transition-all duration-200"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-5 flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-60 sm:max-w-xs md:max-w-sm lg:max-w-md">
              <Image
                src={heroImg}
                alt="FitLog Hero Gym Illustration"
                width={400}
                height={400}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
