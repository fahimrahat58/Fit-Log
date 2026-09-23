import Image from "next/image";
import Link from "next/link";
import logoImg from "@/app/assets/Vector.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#08090b] border-t border-[#1a1d26] py-5 sm:py-6 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90 shrink-0"
        >
          <Image
            src={logoImg}
            alt="FitLog Logo"
            width={28}
            height={28}
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
          />
          <span className="font-oswald text-base sm:text-lg font-black uppercase tracking-widest text-white group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        <p className="text-neutral-500 text-xs sm:text-sm text-center sm:text-right font-normal leading-relaxed">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
