import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/app/lib/workout";

interface WorkoutDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07080a] text-white p-4 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl w-full relative z-10">
        <div className="bg-[#101218]/90 backdrop-blur-md border border-[#1e222d] hover:border-[#2a2f3e] transition-colors duration-300 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[420px] lg:h-auto lg:min-h-[540px] rounded-2xl overflow-hidden bg-[#161822] border border-[#222634] group shrink-0">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101218]/60 via-transparent to-transparent opacity-80" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide text-white leading-tight">
                {workout.name}
              </h1>

              <p className="text-neutral-400 text-xs sm:text-sm lg:text-base mt-2.5 leading-relaxed font-normal">
                {workout.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {workout.muscleGroups?.map((group: string, index: number) => (
                  <span
                    key={index}
                    className="text-[11px] sm:text-xs font-black uppercase tracking-wider bg-[#ccff00] text-black px-3.5 py-1.5 rounded-full shadow-sm shadow-[#ccff00]/20"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-b border-[#1c202b] divide-y divide-[#1c202b] text-xs sm:text-sm">
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    EQUIPMENT
                  </span>
                  <span className="text-white font-medium">
                    {workout.equipment}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    DIFFICULTY
                  </span>
                  <span className="text-white font-medium">
                    {workout.difficulty || "Intermediate"}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    SETS
                  </span>
                  <span className="text-white font-medium">
                    {workout.sets || 4}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    REPS
                  </span>
                  <span className="text-white font-medium">
                    {workout.reps || "6 - 8"}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    DURATION
                  </span>
                  <span className="text-white font-medium">
                    {workout.duration} min
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    CALORIES
                  </span>
                  <span className="text-white font-medium">
                    {workout.caloriesBurned} kcal
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-neutral-400">
                  <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
                    RATING
                  </span>
                  <span className="text-[#ccff00] font-bold text-sm sm:text-base">
                    ★ {workout.rating}
                  </span>
                </div>
              </div>

              {workout.instructions && workout.instructions.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-oswald text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3">
                    INSTRUCTIONS
                  </h2>
                  <ol className="space-y-2 text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {workout.instructions.map((step: string, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[#ccff00] font-bold shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button className="w-full sm:flex-1 bg-[#ccff00] hover:bg-[#d8ff33] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-5 rounded-xl transition duration-200 shadow-lg shadow-[#ccff00]/10 flex items-center justify-center gap-2">
                <span className="text-base leading-none">+</span> Add to today's
                plan
              </button>
              <button className="w-full sm:w-auto bg-[#161822] hover:bg-[#1f2230] active:scale-[0.98] border border-[#252938] text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2">
                <span>🔖</span> Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
