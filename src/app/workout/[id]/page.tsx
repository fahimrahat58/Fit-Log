import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
  Dumbbell,
  BarChart3,
  Repeat,
  ListChecks,
} from "lucide-react";

import { getWorkouts } from "@/app/lib/workout";
import ActionButtons from "@/app/workout/[id]/ActionButtons";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workouts = await getWorkouts();
  const workout = workouts.find((item) => String(item.id) === String(id));

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07080a] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition mb-4 font-medium"
        >
          <ArrowLeft size={14} />
          Back to workouts
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
          <div className="w-full md:sticky md:top-6">
            <div className="relative w-full aspect-[4/3] md:aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-[#12141c] border border-[#1e2230]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="bg-[#ccff00] text-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-white">
                {workout.name}
              </h1>

              <p className="text-neutral-400 text-xs leading-relaxed mt-2 max-w-xl">
                {workout.description}
              </p>

              <div className="mt-5">
                <h2 className="font-oswald text-sm font-extrabold uppercase tracking-wider mb-2 text-neutral-200">
                  KEY SPECS
                </h2>

                <div className="border border-[#1f2433] rounded-xl overflow-hidden bg-[#10121a]">
                  <SpecRow
                    icon={<Dumbbell size={14} />}
                    label="Equipment"
                    value={workout.equipment}
                  />
                  <SpecRow
                    icon={<BarChart3 size={14} />}
                    label="Difficulty"
                    value={workout.difficulty || "Intermediate"}
                  />
                  <SpecRow
                    icon={<ListChecks size={14} />}
                    label="Sets"
                    value={String(workout.sets || 4)}
                  />
                  <SpecRow
                    icon={<Repeat size={14} />}
                    label="Reps"
                    value={workout.reps || "6 - 8"}
                  />
                  <SpecRow
                    icon={<Clock3 size={14} />}
                    label="Duration"
                    value={`${workout.duration} min`}
                  />
                  <SpecRow
                    icon={<Flame size={14} />}
                    label="Calories"
                    value={`${workout.caloriesBurned} kcal`}
                  />

                  <SpecRow
                    icon={
                      <Star
                        size={14}
                        className="text-[#ccff00]"
                        fill="#ccff00"
                      />
                    }
                    label="Rating"
                    value={String(workout.rating)}
                    last
                  />
                </div>
              </div>

              {workout.instructions && workout.instructions.length > 0 && (
                <div className="mt-5">
                  <h2 className="font-oswald text-sm font-extrabold uppercase tracking-wider mb-2.5 text-neutral-200">
                    INSTRUCTIONS
                  </h2>

                  <ol className="space-y-2">
                    {workout.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-2.5 items-start">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-[10px] font-black">
                          {index + 1}
                        </span>

                        <p className="text-xs text-neutral-400 leading-relaxed pt-0.5">
                          {instruction}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <ActionButtons workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3.5 py-2 ${
        !last ? "border-b border-[#1f2433]" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-neutral-400">
        <span>{icon}</span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <span className="text-xs font-semibold text-neutral-100 text-right">
        {value}
      </span>
    </div>
  );
}
