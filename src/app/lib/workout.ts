export async function getWorkouts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}
