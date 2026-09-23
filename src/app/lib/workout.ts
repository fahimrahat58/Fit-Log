import { Workout } from "@/app/types/workout";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching workout ${id}:`, error);
    return null;
  }
}
