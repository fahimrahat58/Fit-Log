# 🏋️ FitLog

> **TRAIN WITH INTENT. LOG EVERY SET.**

FitLog is a modern and responsive workout library application built with Next.js. It allows users to explore different workouts, view detailed exercise information, create a personal workout plan, save workouts for later, mark exercises as completed, and manage their daily fitness routine.

## 🚀 Live Project

🔗 **Live Demo:** [Add your deployed URL here]

---

## 📖 About The Project

FitLog is designed to make workout planning simple and organized. Users can browse a collection of exercises, check workout details such as equipment, difficulty, duration, calories, sets, reps, and ratings, and then add workouts to their personal plan.

The application also uses browser localStorage to keep the user's plan, saved workouts, and completed workout status available across sessions.

---

## 🛠️ Technologies Used

* **Next.js 16** — React framework with App Router
* **React 19** — Building interactive UI components
* **TypeScript** — Type-safe development
* **Tailwind CSS 4** — Responsive and modern styling
* **Lucide React** — UI icons
* **React Toastify** — Success, error, and information notifications
* **REST API** — Fetching workout data
* **LocalStorage** — Saving personal workout plans and saved exercises
* **Next.js Image** — Optimized image rendering

---

## ✨ Key Features

### 1. 🏋️ Workout Library

Browse a collection of workouts covering different muscle groups. Each workout card displays important information such as:

* Workout name
* Muscle groups
* Equipment
* Duration
* Calories burned
* Rating

### 2. 🔎 Workout Details

Every workout has a dedicated details page containing:

* Workout description
* Muscle group tags
* Equipment
* Difficulty
* Sets and reps
* Duration
* Calories burned
* Rating
* Step-by-step instructions

### 3. 📋 Personal Workout Plan

Users can add workouts to **Today's Plan** and manage their daily routine from the My Plan page.

The dashboard also calculates:

* Total exercises
* Total workout minutes
* Total calories

### 4. 🔖 Save & Complete Workouts

Users can save workouts for later and mark planned workouts as completed.

The application provides toast notifications when users:

* Add a workout
* Save a workout
* Mark a workout as done
* Remove a workout

### 5. 📊 Workout Sorting & Management

The My Plan page includes sorting options to organize workouts by:

* Duration
* Calories
* Rating

Users can also switch between **Today's Plan** and **Saved** workouts and remove exercises whenever needed.

---

## 📱 Responsive Design

FitLog is fully responsive and designed to work across:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The interface adapts the workout cards, navigation, buttons, layouts, and content for different screen sizes.

---

## 📂 Project Structure

```text
src/
└── app/
    ├── assets/
    │   ├── banner.png
    │   ├── logo.png
    │   └── Vector.png
    │
    ├── components/
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── Navbar.tsx
    │   ├── WorkoutActions.tsx
    │   └── workoutLibary.tsx
    │
    ├── lib/
    │   └── workout.ts
    │
    ├── my-plan/
    │   ├── page.tsx
    │   └── PlanManager.tsx
    │
    ├── workout/
    │   └── [id]/
    │       ├── ActionButtons.tsx
    │       └── page.tsx
    │
    ├── types/
    │   └── workout.ts
    │
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

---

## ⚙️ Getting Started

### Clone the repository

```bash
git clone <your-repository-url>
```

### Go to the project directory

```bash
cd Fit-Log-main
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔧 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint to check the project code.

---

## 📡 Workout API

Workout information is fetched from the FitLog API:

```text
https://api.abcz.workers.dev/api/fitlog
```

Individual workout details are fetched using the workout ID.

---

## 💾 Local Storage

FitLog uses browser localStorage to manage user-specific workout information.

The application stores:

```text
today_plan
saved_workouts
completed_workouts
```

This allows users to maintain their workout plan and saved exercises without requiring an account or database.

---

## 🎯 Project Goals

The main goal of FitLog is to provide a clean, responsive, and easy-to-use workout management experience while practicing modern Next.js development concepts such as:

* App Router
* Server Components
* Client Components
* Dynamic Routes
* API Data Fetching
* Local Storage
* Responsive UI
* TypeScript
* Component-based architecture

---

## 👨‍💻 Developer

**Fahim Muntasir Rahat**

Built as a Programming Hero assignment project.

---

## 📄 License

This project is created for educational and learning purposes.
