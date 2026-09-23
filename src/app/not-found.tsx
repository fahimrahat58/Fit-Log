import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#0f1115] text-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 sm:mb-8 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10">
          <Dumbbell size={30} className="text-[#ccff00] sm:hidden" />

          <Dumbbell size={38} className="hidden text-[#ccff00] sm:block" />
        </div>

        <p className="font-oswald text-7xl sm:text-8xl md:text-9xl font-black leading-none text-[#ccff00]">
          404
        </p>

        <h1 className="mt-5 sm:mt-6 font-oswald text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
          WORKOUT NOT FOUND
        </h1>

        <p className="mx-auto mt-3 sm:mt-4 max-w-md text-sm sm:text-base leading-6 text-neutral-400">
          The workout or page you're looking for doesn't exist. Let's get you
          back to the workout library.
        </p>

        <Link
          href="/"
          className="mt-7 sm:mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#ccff00] px-5 sm:px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#b8e600] active:scale-95"
        >
          <ArrowLeft size={17} />
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}
