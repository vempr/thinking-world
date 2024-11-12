import { Link } from "@remix-run/react";
import { Heart } from "lucide-react";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="flex w-full flex-col gap-y-5 items-center bg-gray-900 py-6 dark:bg-neutral-950 static">
      <div className="flex justify-center items-center gap-x-1">
        <p className="font-title text-white">Thank you for using <span className="text-sky-500">t-w</span>.</p>
        <Heart className="text-sky-500 text-2xl" />
      </div>

      <div className="flex flex-row gap-x-8 items-center justify-center">
        <ul className="text-sm text-gray-400 dark:text-neutral-400">
          <li><Link to="/" className="hover:text-sky-500">Home</Link></li>
          <li><Link to="/" className="hover:text-sky-500">Application Guide</Link></li>
          <li><Link to="/" className="hover:text-sky-500">Your Account</Link></li>
          <li><Link to="/" className="hover:text-sky-500">Work/School Schedule</Link></li>
        </ul>
        <hr className="bg-white/60 w-[2px] h-20 rounded"></hr>
        <a
          className="inline-flex size-16 items-center justify-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          href="https://github.com/vempr/thinking-world/tree/main"
          target="_blank"
        >
          <svg
            className="size-12 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.71 4.78 6.64.35.06.48-.15.48-.33 0-.17-.01-.72-.01-1.3-1.76.32-2.21-.43-2.35-.82-.08-.2-.42-.82-.72-.99-.24-.13-.59-.45-.01-.46.55-.01.94.51 1.07.72.63 1.06 1.63.76 2.04.58.06-.46.24-.76.44-.94-1.55-.18-3.18-.78-3.18-3.45 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .58-.18 1.92.72.56-.16 1.15-.24 1.74-.24.59 0 1.19.08 1.74.24 1.34-.9 1.92-.72 1.92-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.88 0 2.68-1.63 3.27-3.19 3.45.25.22.47.64.47 1.29 0 .93-.01 1.68-.01 1.92 0 .18.13.4.48.33A7 7 0 0 0 15 8c0-3.87-3.13-7-7-7z" />
          </svg>
        </a>
      </div>
      <p className="px-2 py-1 text-sm text-white">
        © {date.getFullYear()} Alex Nguyen. All rights reserved.
      </p>
    </footer>
  );
}
