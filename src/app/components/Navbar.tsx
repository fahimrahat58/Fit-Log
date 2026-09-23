"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dumbbellIcon from "@/app/assets/logo.png";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isWorkoutActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <nav className="bg-[#1C1F26] border-b border-neutral-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 tracking-wider text-lg sm:text-xl"
          >
            <Image
              src={dumbbellIcon}
              alt="FitLog Logo"
              width={22}
              height={22}
              className="h-5 w-5 object-contain"
            />

            <span className="font-oswald font-extrabold uppercase tracking-widest text-white text-xl leading-none">
              FITLOG
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-all px-4 py-1.5 rounded-full ${
                isWorkoutActive
                  ? "bg-[#1c2600] text-[#ccff00]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`text-sm font-medium transition-all px-4 py-1.5 rounded-full ${
                isMyPlanActive
                  ? "bg-[#1c2600] text-[#ccff00]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-5">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm font-medium text-white hover:opacity-80 transition"
            >
              <span>Plan</span>
              <span className="bg-[#ccff00] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-sm font-medium text-white hover:opacity-80 transition"
            >
              <span>Saved</span>
              <span className="bg-neutral-800 text-white border border-neutral-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            </Link>
          </div>

          <div className="flex sm:hidden items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#1c2600] text-[#ccff00] font-bold px-2 py-0.5 rounded-full">
                P {planCount}
              </span>
              <span className="bg-neutral-800 text-white border border-neutral-700 font-bold px-2 py-0.5 rounded-full">
                S {savedCount}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-neutral-400 hover:text-white focus:outline-none"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1C1F26] border-b border-neutral-800 px-4 pt-3 pb-5 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
              isWorkoutActive
                ? "bg-[#1c2600] text-[#ccff00]"
                : "text-neutral-300 hover:bg-neutral-900"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
              isMyPlanActive
                ? "bg-[#1c2600] text-[#ccff00]"
                : "text-neutral-300 hover:bg-neutral-900"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
