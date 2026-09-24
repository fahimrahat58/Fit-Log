import Image from "next/image";
import Link from "next/link";
import { getWorkouts } from "@/app/lib/workout";
import { Workout } from "@/app/types/workout";

export default async function WorkoutLibrary() {
  const workouts: Workout[] = await getWorkouts();

  if (!workouts || workouts.length === 0) {
    return (
      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="font-oswald text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wider">
            THE LIBRARY
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="bg-[#15171e] border border-[#222630] rounded-2xl py-16 px-6 text-center">
          <h3 className="font-oswald text-xl sm:text-2xl font-black uppercase text-white">
            UNABLE TO LOAD WORKOUTS
          </h3>

          <p className="text-neutral-400 text-sm mt-2">
            Please refresh the page and try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="library"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="mb-6 sm:mb-8 text-left">
        <h2 className="font-oswald text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wider">
          THE LIBRARY
        </h2>

        <p className="text-neutral-400 text-xs sm:text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {workouts.map((workout) => (
          <Link
            key={workout.id}
            href={`/workout/${workout.id}`}
            className="group bg-[#15171e] border border-[#222630] rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="relative w-full h-48 sm:h-52 bg-neutral-900">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority={Number(workout.id) <= 3}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {workout.muscleGroups.map((group, index) => (
                    <span
                      key={`${group}-${index}`}
                      className="text-[11px] font-black uppercase tracking-wider bg-[#ccff00] text-black px-3 py-1 rounded-full leading-none"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                <h3 className="font-oswald text-xl font-black text-white uppercase tracking-wide group-hover:text-[#ccff00] transition line-clamp-1">
                  {workout.name}
                </h3>

                <p className="text-neutral-400 text-xs mt-1 font-normal line-clamp-1">
                  {workout.equipment}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 flex items-center gap-5 text-xs text-neutral-400 font-medium">
                {/* Duration */}
                <span className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {workout.duration} min
                </span>

                <span className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 fill-neutral-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 23c-4.97 0-9-3.582-9-8 0-3.8 2.92-6.52 5.09-8.48.51-.46 1.25-.13 1.3.55.13 1.77.89 3.29 2.01 4.3 1.05-2.02 1.34-4.63.45-6.95-.21-.55.33-1.08.87-.9 2.97 1.01 7.28 4.29 7.28 9.48 0 4.418-4.03 8-9 8z" />
                  </svg>
                  {workout.caloriesBurned} kcal
                </span>

                <span className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>

                  {workout.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
