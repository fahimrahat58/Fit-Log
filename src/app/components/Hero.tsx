import Image from "next/image";
import heroImg from "@/app/assets/banner.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">
      <div className="bg-[#181a20] border border-neutral-800/80 rounded-2xl p-5 sm:p-8 lg:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 z-10 text-left">
            <span className="text-[#ccff00] text-[11px] sm:text-xs font-bold uppercase tracking-widest block">
              WORKOUT LIBRARY
            </span>

            <h1 className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none sm:leading-tight">
              TRAIN WITH INTENT. <br className="hidden sm:inline" />
              LOG EVERY SET.
            </h1>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it{" "}
              <br />
              into today's plan, and watch the week's work add up.
            </p>

            <div className="pt-2">
              <a
                href="#library"
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black hover:bg-[#b8e600] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md transition-all duration-200"
              >
                <span>BROWSE WORKOUTS</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10 pt-2 lg:pt-0">
            <div className="relative w-full max-w-55 sm:max-w-xs md:max-w-sm lg:max-w-none">
              <Image
                src={heroImg}
                alt="FitLog Hero Gym Illustration"
                width={400}
                height={400}
                priority
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
