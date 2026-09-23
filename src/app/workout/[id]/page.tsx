import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/app/lib/workout";

interface WorkoutDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailPage({ params }: WorkoutDetailProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  // ডাটা না পাওয়া গেলে 404 পেজ দেখাবে
  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0e1015] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#ccff00] transition"
        >
          ← Back to Library
        </Link>

        {/* Hero / Header Card */}
        <div className="bg-[#15171e] border border-[#222630] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-64 sm:h-80 rounded-xl overflow-hidden bg-neutral-900">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Core Info */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group, index) => (
                <span
                  key={index}
                  className="text-xs font-black uppercase tracking-wider bg-[#ccff00] text-black px-3 py-1 rounded-full"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="font-oswald text-3xl sm:text-4xl font-black uppercase tracking-wide">
              {workout.name}
            </h1>

            <p className="text-neutral-400 text-sm">
              <strong className="text-neutral-200">Equipment:</strong> {workout.equipment}
            </p>

            <p className="text-neutral-300 text-sm leading-relaxed">
              {workout.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-800 text-center text-xs">
              <div className="bg-[#1c2029] p-3 rounded-lg">
                <p className="text-neutral-400">Duration</p>
                <p className="font-bold text-white mt-1">{workout.duration} min</p>
              </div>
              <div className="bg-[#1c2029] p-3 rounded-lg">
                <p className="text-neutral-400">Calories</p>
                <p className="font-bold text-white mt-1">{workout.caloriesBurned} kcal</p>
              </div>
              <div className="bg-[#1c2029] p-3 rounded-lg">
                <p className="text-neutral-400">Rating</p>
                <p className="font-bold text-[#ccff00] mt-1">⭐ {workout.rating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        {workout.instructions && workout.instructions.length > 0 && (
          <div className="bg-[#15171e] border border-[#222630] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-oswald text-xl font-bold uppercase tracking-wider text-[#ccff00]">
              Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-neutral-300 text-sm leading-relaxed">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

      </div>
    </main>
  );
}