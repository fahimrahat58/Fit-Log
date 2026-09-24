"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Clock3,
  Flame,
  Star,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

import type { Workout } from "@/app/types/workout";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanContent() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

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
      setPlan([]);
      setSaved([]);
      setCompleted([]);
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
    const currentPlan = Array.isArray(plan) ? plan : [];
    return {
      exercises: currentPlan.length,
      minutes: currentPlan.reduce(
        (total, workout) => total + Number(workout?.duration || 0),
        0,
      ),
      calories: currentPlan.reduce(
        (total, workout) => total + Number(workout?.caloriesBurned || 0),
        0,
      ),
    };
  }, [plan]);

  const filteredWorkouts = useMemo(() => {
    const rawList = activeTab === "plan" ? plan : saved;
    const list = Array.isArray(rawList) ? rawList : [];

    const q = searchQuery.toLowerCase().trim();
    const filtered = list.filter((workout) => {
      if (!workout) return false;
      if (!q) return true;

      const matchName = workout.name?.toLowerCase().includes(q);
      const matchEquipment = workout.equipment?.toLowerCase().includes(q);
      const matchDifficulty = workout.difficulty?.toLowerCase().includes(q);
      const matchMuscleGroups = workout.muscleGroups?.some((group) =>
        group.toLowerCase().includes(q),
      );

      return (
        matchName || matchEquipment || matchDifficulty || matchMuscleGroups
      );
    });

    return filtered.sort((a, b) => {
      if (sortBy === "duration") {
        return Number(b?.duration || 0) - Number(a?.duration || 0);
      }
      if (sortBy === "calories") {
        return Number(b?.caloriesBurned || 0) - Number(a?.caloriesBurned || 0);
      }
      if (sortBy === "rating") {
        return Number(b?.rating || 0) - Number(a?.rating || 0);
      }
      return 0;
    });
  }, [activeTab, plan, saved, sortBy, searchQuery]);

  const sortLabels: Record<SortOption, string> = {
    duration: "Duration",
    calories: "Calories",
    rating: "Rating",
  };

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-10">
        <div className="mb-4 sm:mb-6">
          <h1 className="font-oswald text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="bg-[#13151c] border border-[#1e2230] rounded-xl p-3 sm:p-5 mb-5 sm:mb-8 grid grid-cols-3 divide-x divide-[#1e2230] text-left">
          <div className="pr-2 sm:pr-4">
            <p className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider truncate">
              EXERCISES
            </p>
            <p className="font-oswald text-lg sm:text-2xl md:text-4xl font-black text-[#ccff00] mt-0.5 sm:mt-1">
              {metrics.exercises}
            </p>
          </div>

          <div className="px-2 sm:px-4">
            <p className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider truncate">
              MINUTES
            </p>
            <p className="font-oswald text-lg sm:text-2xl md:text-4xl font-black text-white mt-0.5 sm:mt-1">
              {metrics.minutes}
            </p>
          </div>

          <div className="pl-2 sm:pl-4">
            <p className="text-neutral-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider truncate">
              CALORIES
            </p>
            <p className="font-oswald text-lg sm:text-2xl md:text-4xl font-black text-white mt-0.5 sm:mt-1">
              {metrics.calories}
            </p>
          </div>
        </div>

        <div className="relative mb-3 sm:mb-4">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 shrink-0"
          />
          <input
            type="text"
            placeholder="Search workouts by name, muscle group, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#13151c] border border-[#1e2230] rounded-xl pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-row items-center justify-between border-b border-[#1e2230] pb-3 mb-4 sm:mb-6 gap-2">
          <div className="bg-[#13151c] border border-[#1e2230] p-1 rounded-xl flex items-center gap-1 w-auto">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all ${
                activeTab === "plan"
                  ? "bg-[#1d212c] text-white border border-[#2a2e3d] shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all ${
                activeTab === "saved"
                  ? "bg-[#1d212c] text-white border border-[#2a2e3d] shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="relative flex items-center gap-2 ml-auto sm:ml-0">
            <span className="text-xs text-neutral-400 hidden sm:inline">
              Sort By
            </span>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white bg-[#13151c] border border-[#1e2230] px-2.5 sm:px-3 py-1.5 rounded-lg hover:border-[#2a2e3d] transition"
            >
              <span className="font-medium">{sortLabels[sortBy]}</span>
              <ChevronDown
                size={14}
                className={`text-neutral-400 transition-transform duration-200 ${
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
                <div className="absolute right-0 top-full mt-2 w-32 sm:w-36 bg-[#13151c] border border-[#1e2230] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                  {(["duration", "calories", "rating"] as SortOption[]).map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-[11px] sm:text-xs transition flex items-center justify-between ${
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
        ) : (filteredWorkouts?.length ?? 0) === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <div className="space-y-3">
            {filteredWorkouts.map((workout) => (
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

function EmptyState({ searchQuery }: { searchQuery?: string }) {
  return (
    <div className="min-h-60 flex flex-col items-center justify-center text-center bg-[#13151c] border border-[#1e2230] rounded-xl px-4 py-10 sm:py-12">
      <h2 className="font-oswald text-lg sm:text-xl font-black uppercase text-white">
        {searchQuery ? "NO MATCHING WORKOUTS" : "NOTHING HERE YET"}
      </h2>

      <p className="text-neutral-400 text-xs mt-1 max-w-xs sm:max-w-sm">
        {searchQuery
          ? `No workouts found matching "${searchQuery}". Try searching by muscle group, name or equipment.`
          : "Browse the library and add a lift to get today moving."}
      </p>

      {!searchQuery && (
        <Link
          href="/"
          className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold text-[11px] uppercase px-4 py-2.5 rounded-full hover:bg-[#b8e600] transition"
        >
          Go to workouts
        </Link>
      )}
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
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden bg-[#0d0e12] border border-[#1e2230]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 640px) 48px, 64px"
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
              className={`font-oswald text-xs sm:text-base font-black uppercase text-white truncate ${
                isDone ? "line-through decoration-[#ccff00]" : ""
              }`}
            >
              {workout.name}
            </h2>

            <p className="text-neutral-400 text-[10px] sm:text-xs mt-0.5 truncate">
              {workout.equipment}
            </p>

            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5 text-[9px] sm:text-[11px] text-neutral-400">
              <span className="flex items-center gap-0.5 sm:gap-1">
                <Clock3 size={11} className="sm:w-3 sm:h-3" />
                {workout.duration} min
              </span>

              <span className="flex items-center gap-0.5 sm:gap-1">
                <Flame size={11} className="sm:w-3 sm:h-3" />
                {workout.caloriesBurned} kcal
              </span>

              <span className="flex items-center gap-0.5 sm:gap-1">
                <Star
                  size={11}
                  className="text-[#ccff00] sm:w-3 sm:h-3"
                  fill="#ccff00"
                />
                {workout.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto border-t md:border-t-0 border-[#1e2230] pt-2.5 md:pt-0">
          <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-end">
            <Link
              href={`/workout/${workout.id}`}
              className="flex-1 md:flex-initial text-[10px] sm:text-[11px] font-bold text-neutral-300 hover:text-white px-2.5 sm:px-3.5 py-1.5 rounded-full bg-transparent border border-[#2a2e3d] hover:bg-[#252a38] transition text-center"
            >
              View Details
            </Link>

            {activeTab === "plan" && (
              <button
                onClick={() => onMarkDone(workout.id)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase transition bg-[#ccff00] text-black hover:bg-[#b8e600]"
              >
                <Check size={12} strokeWidth={3} />
                {isDone ? "Done" : "Mark as Done"}
              </button>
            )}

            <button
              onClick={() => onRemove(workout.id, activeTab)}
              className="p-1 text-neutral-500 hover:text-red-400 transition ml-1"
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
