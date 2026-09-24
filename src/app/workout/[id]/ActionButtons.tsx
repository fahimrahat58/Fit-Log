"use client";

import { Plus, Bookmark, Check } from "lucide-react";
import { toast } from "react-toastify";
import { Workout } from "@/app/types/workout";
import { useEffect, useState } from "react";

interface ActionButtonsProps {
  workout: Workout;
}

export default function ActionButtons({ workout }: ActionButtonsProps) {
  const [planFull, setPlanFull] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const checkPlanFull = () => {
    try {
      const storedPlan: Workout[] = JSON.parse(
        localStorage.getItem("today_plan") || "[]",
      );

      setPlanFull(storedPlan.length >= 5 && !isAdded);
    } catch {
      setPlanFull(false);
    }
  };

  useEffect(() => {
    checkPlanFull();

    const handleStorageUpdate = () => {
      checkPlanFull();
    };

    window.addEventListener("storage-update", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage-update", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [isAdded]);

  const triggerStorageUpdate = () => {
    window.dispatchEvent(new Event("storage-update"));
  };

  const handleAddToPlan = () => {
    try {
      const storedPlan: Workout[] = JSON.parse(
        localStorage.getItem("today_plan") || "[]",
      );

      const exists = storedPlan.some(
        (item) => String(item.id) === String(workout.id),
      );

      if (exists) {
        const updated = storedPlan.filter(
          (item) => String(item.id) !== String(workout.id),
        );

        localStorage.setItem("today_plan", JSON.stringify(updated));

        setIsAdded(false);
        setPlanFull(updated.length >= 5);

        triggerStorageUpdate();

        toast.warning("Removed from today's plan!");
        return;
      }

      if (storedPlan.length >= 5) {
        toast.error("Plan is full! Maximum 5 workouts allowed.");
        setPlanFull(true);
        return;
      }

      const updated = [...storedPlan, workout];

      localStorage.setItem("today_plan", JSON.stringify(updated));

      setIsAdded(true);
      setPlanFull(updated.length >= 5);

      triggerStorageUpdate();

      toast.success("Added to today's plan!");
    } catch (error) {
      console.error("Error updating today's plan:", error);
      toast.error("Failed to update today's plan");
    }
  };

  const handleSaveForLater = () => {
    try {
      const storedSaved: Workout[] = JSON.parse(
        localStorage.getItem("saved_workouts") || "[]",
      );

      const exists = storedSaved.some(
        (item) => String(item.id) === String(workout.id),
      );

      if (exists) {
        const updated = storedSaved.filter(
          (item) => String(item.id) !== String(workout.id),
        );

        localStorage.setItem("saved_workouts", JSON.stringify(updated));

        setIsSaved(false);

        triggerStorageUpdate();

        toast.warning("Removed from saved!");
        return;
      }

      const updated = [...storedSaved, workout];

      localStorage.setItem("saved_workouts", JSON.stringify(updated));

      setIsSaved(true);

      triggerStorageUpdate();

      toast.success("Saved for later!");
    } catch (error) {
      console.error("Error updating saved workout:", error);
      toast.error("Failed to update saved workout");
    }
  };

  return (
    <div className="relative w-full pt-6 mt-6 border-t border-[#1d212c]">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <button
          onClick={handleAddToPlan}
          className={`w-full md:w-auto font-black text-xs md:text-sm uppercase tracking-wide py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
            isAdded
              ? "bg-[#ccff00] text-black hover:bg-[#b8e600] cursor-pointer"
              : planFull
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.98] text-black cursor-pointer shadow-lg shadow-[#ccff00]/10"
          }`}
          disabled={planFull && !isAdded}
        >
          {isAdded ? (
            <>
              <Check size={18} strokeWidth={3} />
              <span>Added to today's plan</span>
            </>
          ) : (
            <>
              <Plus size={18} strokeWidth={3} />
              <span>{planFull ? "Plan is full" : "Add to today's plan"}</span>
            </>
          )}
        </button>

        <button
          onClick={handleSaveForLater}
          className={`w-full md:w-auto font-bold text-xs md:text-sm py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
            isSaved
              ? "bg-[#ccff00] border-[#ccff00] text-black hover:bg-[#b8e600] cursor-pointer"
              : "bg-transparent border border-[#2a2e3d] hover:bg-[#1f2230] active:scale-[0.98] text-neutral-200 cursor-pointer"
          }`}
        >
          {isSaved ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              <span>Saved for later</span>
            </>
          ) : (
            <>
              <Bookmark size={16} />
              <span>Save for later</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
