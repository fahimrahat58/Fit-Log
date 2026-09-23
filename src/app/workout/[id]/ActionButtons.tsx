"use client";

import { Plus, Bookmark } from "lucide-react";
import { toast } from "react-toastify";
import { Workout } from "@/app/types/workout";

interface ActionButtonsProps {
  workout: Workout;
}

export default function ActionButtons({ workout }: ActionButtonsProps) {
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
        toast.warning("Already in today's plan!");
        return;
      }

      if (storedPlan.length >= 5) {
        toast.error("Plan is full! Maximum 5 workouts allowed.");
        return;
      }

      const updated = [...storedPlan, workout];
      localStorage.setItem("today_plan", JSON.stringify(updated));
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
        toast.warning("Already saved for later!");
        return;
      }

      const updated = [...storedSaved, workout];
      localStorage.setItem("saved_workouts", JSON.stringify(updated));
      triggerStorageUpdate();

      toast.info("Saved for later!");
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
          className="w-full md:w-auto bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.98] text-black font-black text-xs md:text-sm uppercase tracking-wide py-3.5 px-6 rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ccff00]/10"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Add to today's plan</span>
        </button>

        <button
          onClick={handleSaveForLater}
          className="w-full md:w-auto bg-[#161822] hover:bg-[#1f2230] active:scale-[0.98] border border-[#252938] text-neutral-200 font-bold text-xs md:text-sm py-3.5 px-6 rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Bookmark size={16} />
          <span>Save for later</span>
        </button>
      </div>
    </div>
  );
}
