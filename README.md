<div align="center">

# 🏋️ FitLog

### **TRAIN WITH INTENT. LOG EVERY SET.**

A modern and responsive workout management and personal workout planning application built with **Next.js, TypeScript, and Tailwind CSS**.

<br />

<a href="https://fit-log-plum.vercel.app/">
  <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-OPEN%20FITLOG-7C3AED?style=for-the-badge&labelColor=111827" alt="Live Demo" />
</a>

<a href="https://github.com/fahimrahat58/Fit-Log">
  <img src="https://img.shields.io/badge/GITHUB-REPOSITORY-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
</a>

<br /><br />

<img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />

</div>

---

## 📌 Project Overview

**FitLog** is a modern and responsive **workout management and personal workout planning application**.

The application allows users to browse a workout library, search and sort exercises, view detailed workout information, create a personalized **Today's Plan**, save workouts for later, and track completed workouts.

Workout data is fetched from a REST API, while user-specific workout information is persisted using browser **localStorage**.

The project focuses on:

- 🏋️ Workout discovery and management
- 📋 Personal daily workout planning
- 🔖 Saved workout management
- 📊 Workout tracking
- 🔎 Search and sorting
- 📱 Responsive design
- 🎨 Modern user interface

---

## 📸 Project Preview

<p align="center">
  <img
    src="./public/Screenshot 2026-10-04 214408.png"
    alt="FitLog Homepage"
    width="100%"
  />
</p>

<p align="center">
  <em>FitLog Homepage</em>
</p>

---

## ✨ Main Features

### 🏋️ 1. Workout Library

Users can browse a collection of workouts with information such as:

- Workout name
- Muscle groups
- Equipment
- Difficulty
- Duration
- Calories
- Rating
- Workout image

The workout library also supports **search and sorting**.

---

### 🔎 2. Workout Details

Each workout has a dedicated dynamic details page.

The details page displays:

- Workout image
- Description
- Muscle groups
- Equipment
- Difficulty
- Sets & reps
- Duration
- Calories
- Rating
- Step-by-step instructions

Users can add workouts to their daily plan or save them for later.

---

### 📋 3. Today's Workout Plan

Users can create and manage their daily workout plan.

The **My Plan** page displays:

- Total exercises
- Total workout minutes
- Total calories
- Planned workouts
- Completion status
- Remove workout option
- View Details option

The daily plan supports a maximum of **five workouts**.

---

### 🔖 4. Save & Track Workouts

Users can save workouts for later and access them from the **Saved** section.

Planned workouts can also be marked as **Done**.

Workout information is stored in browser **localStorage**, allowing user data to remain available after refreshing the page.

---

### 🔍 5. Search & Sort

Users can quickly find workouts by searching workout names or tags.

Workouts can be sorted by:

- Duration
- Calories
- Rating

---

### 📱 6. Fully Responsive Design

FitLog is designed to work across:

- 📱 Mobile
- 📲 Tablet
- 💻 Desktop

The navigation, hero section, workout cards, details pages, buttons, and My Plan dashboard adapt to different screen sizes.

---

### 🔔 7. Toast Notifications

The application provides feedback for important user actions, including:

- Adding a workout to Today's Plan
- Saving a workout
- Removing a workout
- Marking a workout as done
- Duplicate workout actions
- Plan limit notifications

---

### ⚡ 8. Loading & Error States

FitLog includes:

- Loading states while workout data is being fetched
- Empty states when no workout is available
- Error handling when workout data cannot be loaded
- Custom Not Found page for invalid routes

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework and App Router |
| **React 19** | User interface |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 4** | Styling and responsive design |
| **Lucide React** | UI icons |
| **React Toastify** | Toast notifications |
| **REST API** | Workout data fetching |
| **LocalStorage** | Client-side data persistence |
| **Next.js Image** | Optimized image rendering |
| **Vercel** | Deployment |

---

## 📦 Dependencies

The main dependencies used in this project include:

- `next` — React framework
- `react` — UI library
- `react-dom` — React DOM rendering
- `typescript` — Type-safe development
- `tailwindcss` — Utility-first CSS framework
- `lucide-react` — Icon library
- `react-toastify` — Toast notifications

For the complete dependency list and exact versions, check the project's `package.json` file.

---

## 📡 API

FitLog uses a REST API to retrieve workout information.

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

The workout ID is used to retrieve individual workout information.

---

## 💾 LocalStorage

FitLog uses browser **localStorage** to persist user-specific workout information.

The application uses the following localStorage keys:

```text
today_plan
saved_workouts
completed_workouts
```

This allows workout-related data to remain available after refreshing or reopening the browser.

---

## 📂 Project Structure

```text
Fit-Log/
│
├── src/
│   └── app/
│       │
│       ├── assets/
│       │   ├── banner.png
│       │   ├── logo.png
│       │   └── Vector.png
│       │
│       ├── components/
│       │   ├── Footer.tsx
│       │   ├── Hero.tsx
│       │   ├── Navbar.tsx
│       │   └── workoutLibary.tsx
│       │
│       ├── lib/
│       │   └── workout.ts
│       │
│       ├── my-plan/
│       │   ├── page.tsx
│       │   └── my-plan-content.tsx
│       │
│       ├── workout/
│       │   └── [id]/
│       │       ├── ActionButtons.tsx
│       │       └── page.tsx
│       │
│       ├── types/
│       │   └── workout.ts
│       │
│       ├── globals.css
│       ├── layout.tsx
│       ├── loading.tsx
│       ├── not-found.tsx
│       └── page.tsx
│
├── public/
│   └── screenshots/
│       └── homepage.png
│
├── package.json
├── next.config.ts
└── README.md
```

---

## 📖 Main Pages

### 🏠 Home

Introduces the FitLog application and provides access to the workout library.

### 🏋️ Workout Library

Displays available workouts with information including:

- Name
- Muscle groups
- Equipment
- Difficulty
- Duration
- Calories
- Rating

### 📋 My Plan

Allows users to manage their daily workout plan.

Users can:

- Add workouts
- Remove workouts
- View workout details
- Track completion
- View total exercises
- View total duration
- View total calories

### 🔖 Saved Workouts

Displays workouts that users have saved for later.

### 📖 Workout Details

Each workout has a dynamic route:

```text
/workout/[id]
```

The page displays complete workout information and provides actions for adding or saving the workout.

---

## 🚀 Getting Started

Follow the steps below to run **FitLog** locally.

### 1. Clone the Repository

```bash
git clone https://github.com/fahimrahat58/Fit-Log.git
```

### 2. Navigate to the Project

```bash
cd Fit-Log
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Visit:

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

Checks the project for linting issues.

---

## 🌐 Live Project

<div align="center">

### 🚀 Try FitLog Live

<a href="https://fit-log-plum.vercel.app/">
  <img
    src="https://img.shields.io/badge/🔥%20VISIT%20FITLOG%20LIVE-7C3AED?style=for-the-badge&logo=vercel&logoColor=white"
    alt="Visit FitLog Live"
  />
</a>

<br /><br />

<a href="https://fit-log-plum.vercel.app/">
  https://fit-log-plum.vercel.app/
</a>

</div>

---

## 🔗 Relevant Links

| Resource | Link |
|---|---|
| 🌐 Live Website | [FitLog](https://fit-log-plum.vercel.app/) |
| 💻 GitHub Repository | [Fit-Log](https://github.com/fahimrahat58/Fit-Log) |
| 👨‍💻 GitHub Profile | [Fahim Muntasir Rahat](https://github.com/fahimrahat58) |


## 🎯 Project Goals

This project was built to practice and demonstrate modern web development concepts, including:

- Next.js App Router
- Server Components
- Client Components
- Dynamic Routes
- REST API data fetching
- TypeScript
- LocalStorage
- Responsive UI development
- Tailwind CSS
- Component-based architecture
- Client-side state management
- Toast notifications
- Loading and error handling
- Production deployment

---

## 📱 Responsive Support

FitLog is designed to work across different screen sizes.

| Device | Support |
|---|---|
| 📱 Mobile | ✅ |
| 📲 Tablet | ✅ |
| 💻 Desktop | ✅ |
| 🖥️ Large Screens | ✅ |

---

## 👨‍💻 Developer

<div align="center">

### Fahim Muntasir Rahat

**Frontend Developer | Next.js & TypeScript Learner**

Built as a **Programming Hero assignment project**.

<br />

<a href="https://github.com/fahimrahat58">
  <img
    src="https://img.shields.io/badge/GitHub-fahimrahat58-181717?style=for-the-badge&logo=github"
    alt="GitHub"
  />
</a>

</div>

---

## 📄 License

This project was created for **educational and learning purposes**.

---

<div align="center">

### ⭐ Thanks for visiting FitLog!

**TRAIN WITH INTENT. LOG EVERY SET.**

</div>
