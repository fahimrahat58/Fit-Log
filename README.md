# 🏋️ FitLog

> **TRAIN WITH INTENT. LOG EVERY SET.**

A modern, responsive workout library and personal workout planning application built with **Next.js, TypeScript, and Tailwind CSS**.

FitLog helps users discover workouts, view detailed exercise information, build a daily workout plan, save exercises for later, and track completed workouts.

---

## 🌐 Live Demo

🔗 **Live Project:** https://fit-log-plum.vercel.app/

---

## 📖 About FitLog

**FitLog** is a dark-themed workout management application designed to make workout planning simple and organized.

Users can explore a workout library, view detailed exercise information, add workouts to **Today's Plan**, save exercises for later, mark workouts as completed, and manage their daily routine from a single dashboard.

Workout data is fetched from a REST API, while **localStorage** keeps the user's plan, saved workouts, and completed workout status available even after refreshing the browser.

---

## ✨ Features

### 🏋️ Workout Library

* Browse workouts from the FitLog API
* View workouts by muscle group
* Responsive workout card layout
* Workout duration, calories, and rating
* Search and sort workout entries
* Click any workout to view its details

### 🔎 Workout Details

Each workout has a dedicated dynamic details page with:

* Workout image
* Workout description
* Muscle group tags
* Equipment
* Difficulty
* Sets & reps
* Duration
* Calories
* Rating
* Step-by-step instructions

### 📋 Today's Workout Plan

Users can create their own daily workout plan.

The **My Plan** dashboard displays:

* Total exercises
* Total workout minutes
* Total calories
* Planned workouts
* Workout details
* Completion status
* Remove action

### 🔖 Save for Later

Users can save workouts and access them from the **Saved** tab.

Saved workouts remain available through browser localStorage.

### ✅ Workout Completion

Users can mark planned workouts as **Done**.

Toast notifications provide feedback when users:

* Add a workout
* Save a workout
* Mark a workout as completed
* Remove a workout

### 📊 Sorting & Management

Workouts can be sorted by:

* Duration
* Calories
* Rating

Users can also switch between:

* **Today's Plan**
* **Saved**

### 📱 Fully Responsive

FitLog is designed for:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The navbar, hero section, workout grid, details page, buttons, and plan layout adapt to different screen sizes.

---

## 🛠️ Technologies

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| **Next.js 16**     | React framework & App Router |
| **React 19**       | Interactive UI               |
| **TypeScript**     | Type-safe development        |
| **Tailwind CSS 4** | Styling & responsive design  |
| **Lucide React**   | UI icons                     |
| **React Toastify** | Toast notifications          |
| **REST API**       | Workout data                 |
| **LocalStorage**   | Client-side data persistence |
| **Next.js Image**  | Optimized image rendering    |

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

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd Fit-Log-main
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Runs the production build.

### Lint

```bash
npm run lint
```

Checks the project for ESLint issues.

---

## 📡 API

FitLog uses the following REST API to retrieve workout information:

```text
https://api.abcz.workers.dev/api/fitlog
```

Individual workouts are accessed using their unique workout ID.

Example:

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

---

## 💾 Local Storage

FitLog uses browser **localStorage** to persist user-specific workout information.

The application stores:

```text
today_plan
saved_workouts
completed_workouts
```

This allows users to keep their workout data after refreshing or reopening the application without requiring an account or database.

---

## 🎯 Project Goals

This project was built to practice and demonstrate modern Next.js development concepts, including:

* Next.js App Router
* Server Components
* Client Components
* Dynamic Routes
* REST API Data Fetching
* TypeScript
* LocalStorage
* Responsive UI
* Tailwind CSS
* Component-based architecture
* State Management
* Toast Notifications

---

## 👨‍💻 Developer

### Fahim Muntasir Rahat

Built as a **Programming Hero assignment project**.

---

## 📄 License

This project was created for **educational and learning purposes**.
