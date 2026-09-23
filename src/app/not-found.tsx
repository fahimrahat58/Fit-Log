import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#0f1115] text-white flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-10">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 sm:mb-7 sm:h-18 sm:w-18 md:h-20 md:w-20">
          <Dumbbell
            className="h-7 w-7 text-[#ccff00] sm:h-8 sm:w-8 md:h-9 md:w-9"
            strokeWidth={2}
          />
        </div>

        <p className="font-oswald text-7xl font-black leading-none text-[#ccff00] sm:text-8xl md:text-9xl">
          404
        </p>

        <h1 className="mt-4 font-oswald text-2xl font-black uppercase tracking-tight sm:mt-5 sm:text-4xl md:mt-6 md:text-5xl">
          WORKOUT NOT FOUND
        </h1>

        <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-neutral-400 sm:mt-4 sm:max-w-md sm:text-sm sm:leading-6 md:max-w-lg md:text-base">
          The workout or page you're looking for doesn't exist. Let's get you
          back to the workout library.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-[11px] font-black uppercase tracking-wide text-black transition-all duration-200 hover:bg-[#b8e600] active:scale-95 sm:mt-7 sm:px-6 sm:py-3.5 sm:text-xs md:mt-8"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}
