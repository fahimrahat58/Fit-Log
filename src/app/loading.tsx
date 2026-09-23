import { Dumbbell } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#0f1115] text-white flex items-center justify-center px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10">
      <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24">
          <div className="absolute inset-0 rounded-full border-4 border-neutral-800" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#ccff00] border-r-[#ccff00]" />

          <Dumbbell
            className="h-6 w-6 text-[#ccff00] sm:h-8 sm:w-8 md:h-9 md:w-9"
            strokeWidth={2.5}
          />
        </div>

        <h1 className="mt-5 font-oswald text-xl font-black uppercase tracking-wide sm:mt-6 sm:text-2xl md:text-3xl">
          Loading Workouts
        </h1>

        <p className="mt-2 max-w-xs text-xs leading-5 text-neutral-500 sm:max-w-sm sm:text-sm sm:leading-6 md:text-base">
          Getting your workout library ready...
        </p>

        <div className="mt-4 flex items-center gap-1.5 sm:mt-5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ccff00]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ccff00] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ccff00] [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}
