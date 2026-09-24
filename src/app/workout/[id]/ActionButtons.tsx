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

  const checkPlan = () => {
    try {
      const storedPlan: Workout[] = JSON.parse(
        localStorage.getItem("today_plan") || "[]",
      );

      const exists = storedPlan.some(
        (item) => String(item.id) === String(workout.id),
      );

      setIsAdded(exists);
      setPlanFull(storedPlan.length >= 5 && !exists);
    } catch {
      setIsAdded(false);
      setPlanFull(false);
    }
  };

  const checkSaved = () => {
    try {
      const storedSaved: Workout[] = JSON.parse(
        localStorage.getItem("saved_workouts") || "[]",
      );

      const exists = storedSaved.some(
        (item) => String(item.id) === String(workout.id),
      );

      setIsSaved(exists);
    } catch {
      setIsSaved(false);
    }
  };

  useEffect(() => {
    checkPlan();
    checkSaved();

    window.addEventListener("storage-update", checkPlan);
    window.addEventListener("storage", checkPlan);
    window.addEventListener("storage-update", checkSaved);
    window.addEventListener("storage", checkSaved);

    return () => {
      window.removeEventListener("storage-update", checkPlan);
      window.removeEventListener("storage", checkPlan);
      window.removeEventListener("storage-update", checkSaved);
      window.removeEventListener("storage", checkSaved);
    };
  }, [workout.id]);

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
        setIsAdded(true);
        toast.warning("Already in today's plan!");
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
      console.error("Error saving to plan:", error);
      toast.error("Failed to add workout");
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
        setIsSaved(true);
        toast.warning("Already saved for later!");
        return;
      }

      const updated = [...storedSaved, workout];

      localStorage.setItem("saved_workouts", JSON.stringify(updated));

      setIsSaved(true);

      triggerStorageUpdate();

      toast.success("Saved for later!");
    } catch (error) {
      console.error("Error saving workout:", error);
      toast.error("Failed to save workout");
    }
  };

  return (
    <div className="relative w-full pt-6 mt-6 border-t border-[#1d212c]">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <button
          onClick={handleAddToPlan}
          disabled={planFull || isAdded}
          className={`w-full md:w-auto font-black text-xs md:text-sm uppercase tracking-wide py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
            isAdded
              ? "bg-[#ccff00] text-black cursor-default"
              : planFull
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.98] text-black cursor-pointer shadow-lg shadow-[#ccff00]/10"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={18} strokeWidth={3} />
              <span>Added to today's plan</span>
            </>
          ) : (
            <>
              <Plus size={18} strokeWidth={3} />
              <span>
                {planFull ? "Plan is full" : "Add to today's plan"}
              </span>
            </>
          )}
        </button>

        <button
          onClick={handleSaveForLater}
          disabled={isSaved}
          className={`w-full md:w-auto font-bold text-xs md:text-sm py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
            isSaved
              ? "bg-[#ccff00] border-[#ccff00] text-black cursor-default"
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