"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import type { Workout } from "@/app/types/workout";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanContent() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem("today_plan") || "[]");
      const storedSaved = JSON.parse(
        localStorage.getItem("saved_workouts") || "[]",
      );
      const storedCompleted = JSON.parse(
        localStorage.getItem("completed_workouts") || "[]",
      );

      setPlan(Array.isArray(storedPlan) ? storedPlan : []);
      setSaved(Array.isArray(storedSaved) ? storedSaved : []);
      setCompleted(Array.isArray(storedCompleted) ? storedCompleted : []);
    } catch (error) {
      console.error("Failed to load workout data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    window.addEventListener("storage-update", loadData);
    window.addEventListener("storage", loadData);

    return () => {
      window.removeEventListener("storage-update", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const markAsDone = (id: number) => {
    const alreadyDone = completed.includes(id);

    const updatedCompleted = alreadyDone
      ? completed.filter((item) => item !== id)
      : [...completed, id];

    setCompleted(updatedCompleted);

    localStorage.setItem(
      "completed_workouts",
      JSON.stringify(updatedCompleted),
    );

    if (alreadyDone) {
      toast.info("Workout marked as not done");
    } else {
      toast.success("Workout marked as done");
    }

    window.dispatchEvent(new Event("storage-update"));
  };

  const removeWorkout = (id: number, type: Tab) => {
    if (type === "plan") {
      const updatedPlan = plan.filter((item) => item.id !== id);
      setPlan(updatedPlan);
      localStorage.setItem("today_plan", JSON.stringify(updatedPlan));
      toast.warning("Workout removed from today's plan");
    } else {
      const updatedSaved = saved.filter((item) => item.id !== id);
      setSaved(updatedSaved);
      localStorage.setItem("saved_workouts", JSON.stringify(updatedSaved));
      toast.warning("Workout removed from saved");
    }

    const updatedCompleted = completed.filter((item) => item !== id);
    setCompleted(updatedCompleted);
    localStorage.setItem(
      "completed_workouts",
      JSON.stringify(updatedCompleted),
    );

    window.dispatchEvent(new Event("storage-update"));
  };

  const metrics = useMemo(() => {
    return {
      exercises: plan.length,
      minutes: plan.reduce(
        (total, workout) => total + Number(workout.duration || 0),
        0,
      ),
      calories: plan.reduce(
        (total, workout) => total + Number(workout.caloriesBurned || 0),
        0,
      ),
    };
  }, [plan]);

  const sortedWorkouts = useMemo(() => {
    const list = [...(activeTab === "plan" ? plan : saved)];

    return list.sort((a, b) => {
      if (sortBy === "duration") {
        return Number(b.duration || 0) - Number(a.duration || 0);
      }
      if (sortBy === "calories") {
        return Number(b.caloriesBurned || 0) - Number(a.caloriesBurned || 0);
      }
      if (sortBy === "rating") {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }
      return 0;
    });
  }, [activeTab, plan, saved, sortBy]);

  const sortLabels: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-5 sm:mb-6">
          <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="bg-[#13151c] border border-[#1e2230] rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 grid grid-cols-3 gap-2 sm:gap-4 text-left">
          <div>
            <p className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider">
              EXERCISES
            </p>
            <p className="font-oswald text-xl sm:text-3xl md:text-4xl font-black text-[#ccff00] mt-0.5 sm:mt-1">
              {metrics.exercises}
            </p>
          </div>

          <div>
            <p className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider">
              MINUTES
            </p>
            <p className="font-oswald text-xl sm:text-3xl md:text-4xl font-black text-white mt-0.5 sm:mt-1">
              {metrics.minutes}
            </p>
          </div>

          <div>
            <p className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider">
              CALORIES
            </p>
            <p className="font-oswald text-xl sm:text-3xl md:text-4xl font-black text-white mt-0.5 sm:mt-1">
              {metrics.calories}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between border-b border-[#1e2230] pb-3 mb-6 gap-2">
         
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase rounded-md transition ${
                activeTab === "plan"
                  ? "bg-[#1d212c] text-white border border-[#2a2e3d]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase rounded-md transition ${
                activeTab === "saved"
                  ? "bg-[#1d212c] text-white border border-[#2a2e3d]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

        
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-neutral-400 hover:text-white bg-[#13151c] sm:bg-transparent border sm:border-0 border-[#1e2230] px-2.5 py-1.5 sm:p-0 rounded-md transition"
            >
              <span>
                Sort by:{" "}
                <strong className="text-white font-medium">
                  {sortLabels[sortBy]}
                </strong>
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-[#13151c] border border-[#1e2230] rounded-lg shadow-xl z-20 py-1 overflow-hidden">
                  {(["duration", "calories", "rating"] as SortOption[]).map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition flex items-center justify-between ${
                          sortBy === option
                            ? "bg-[#1d212c] text-[#ccff00] font-bold"
                            : "text-neutral-300 hover:bg-[#181b24] hover:text-white"
                        }`}
                      >
                        <span>{sortLabels[option]}</span>
                        {sortBy === option && <Check size={12} />}
                      </button>
                    ),
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="min-h-60 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-neutral-700 border-t-[#ccff00] rounded-full animate-spin" />
            <p className="text-neutral-400 text-xs mt-3">Loading workouts…</p>
          </div>
        ) : sortedWorkouts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                isDone={completed.includes(workout.id)}
                activeTab={activeTab}
                onMarkDone={markAsDone}
                onRemove={removeWorkout}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="min-h-60 flex flex-col items-center justify-center text-center bg-[#13151c] border border-[#1e2230] rounded-xl px-4 py-10 sm:py-12">
      <h2 className="font-oswald text-lg sm:text-xl font-black uppercase text-white">
        NOTHING HERE YET
      </h2>

      <p className="text-neutral-400 text-xs mt-1 max-w-xs sm:max-w-sm">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold text-[11px] uppercase px-4 py-2.5 rounded-md hover:bg-[#b8e600] transition"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function WorkoutCard({
  workout,
  isDone,
  activeTab,
  onMarkDone,
  onRemove,
}: {
  workout: Workout;
  isDone: boolean;
  activeTab: Tab;
  onMarkDone: (id: number) => void;
  onRemove: (id: number, type: Tab) => void;
}) {
  return (
    <div
      className={`bg-[#13151c] border border-[#1e2230] rounded-xl p-3 sm:p-4 transition ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-[#0d0e12] border border-[#1e2230]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="64px"
              className="object-cover"
            />
            {isDone && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Check size={16} className="text-[#ccff00]" strokeWidth={3} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2
              className={`font-oswald text-sm sm:text-base font-black uppercase text-white truncate ${
                isDone ? "line-through decoration-[#ccff00]" : ""
              }`}
            >
              {workout.name}
            </h2>

            <p className="text-neutral-400 text-[11px] sm:text-xs mt-0.5 truncate">
              {workout.equipment}
            </p>

            <div className="flex items-center gap-2.5 sm:gap-3 mt-1.5 text-[10px] sm:text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Clock3 size={12} />
                {workout.duration} min
              </span>

              <span className="flex items-center gap-1">
                <Flame size={12} />
                {workout.caloriesBurned} kcal
              </span>

              <span className="flex items-center gap-1">
                <Star size={12} className="text-[#ccff00]" fill="#ccff00" />
                {workout.rating}
              </span>
            </div>
          </div>
        </div>

        
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto border-t md:border-t-0 border-[#1e2230] pt-2.5 md:pt-0">
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Link
              href={`/workout/${workout.id}`}
              className="text-[10px] sm:text-[11px] font-bold text-neutral-300 hover:text-white px-3 py-1.5 rounded bg-[#1d212c] hover:bg-[#252a38] transition text-center"
            >
              View Details
            </Link>

            {activeTab === "plan" && (
              <button
                onClick={() => onMarkDone(workout.id)}
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-bold uppercase transition bg-[#ccff00] text-black hover:bg-[#b8e600]"
              >
                <Check size={12} strokeWidth={3} />
                {isDone ? "Done" : "Mark as Done"}
              </button>
            )}

            <button
              onClick={() => onRemove(workout.id, activeTab)}
              className="p-1.5 text-neutral-500 hover:text-red-400 transition"
              title="Remove"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
