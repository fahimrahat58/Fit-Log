"use client";

import { useState } from "react";
import { Check, Bookmark, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { Workout } from "@/app/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const [isPlanAdded, setIsPlanAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const addToPlan = () => {
    try {
      const currentPlan: Workout[] = JSON.parse(
        localStorage.getItem("today_plan") || "[]",
      );

      const alreadyExists = currentPlan.some((item) => item.id === workout.id);

      if (alreadyExists) {
        setIsPlanAdded(true);
        toast.info("Already added to today's plan");
        return;
      }

      if (currentPlan.length >= 5) {
        toast.error("Today's plan can contain maximum 5 workouts");
        return;
      }

      const updatedPlan = [...currentPlan, workout];

      localStorage.setItem("today_plan", JSON.stringify(updatedPlan));

      window.dispatchEvent(new Event("storage-update"));

      setIsPlanAdded(true);

      toast.success("Added to today's plan");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const saveForLater = () => {
    try {
      const savedWorkouts: Workout[] = JSON.parse(
        localStorage.getItem("saved_workouts") || "[]",
      );

      const alreadySaved = savedWorkouts.some((item) => item.id === workout.id);

      if (alreadySaved) {
        setIsSaved(true);
        toast.info("Already saved");
        return;
      }

      const updatedSaved = [...savedWorkouts, workout];

      localStorage.setItem("saved_workouts", JSON.stringify(updatedSaved));

      window.dispatchEvent(new Event("storage-update"));

      setIsSaved(true);

      toast.success("Saved for later");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 pt-7">
      <button
        onClick={addToPlan}
        className="w-full sm:flex-1 bg-[#ccff00] hover:bg-[#d8ff33] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-5 rounded-xl transition duration-200 flex items-center justify-center gap-2"
      >
        {isPlanAdded ? (
          <>
            <Check size={17} />
            Added to plan
          </>
        ) : (
          <>
            <Plus size={17} />
            Add to today's plan
          </>
        )}
      </button>

      <button
        onClick={saveForLater}
        className="w-full sm:w-auto bg-[#161822] hover:bg-[#1f2230] active:scale-[0.98] border border-[#252938] text-white text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2"
      >
        {isSaved ? (
          <>
            <Check size={16} />
            Saved
          </>
        ) : (
          <>
            <Bookmark size={16} />
            Save for later
          </>
        )}
      </button>
    </div>
  );
}
