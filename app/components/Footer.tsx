export default function Footer() {
  const date = new Date();

  return (
    <footer className="flex w-full flex-col items-center bg-gray-900 pb-0.5 pt-3 dark:bg-neutral-950">
      <p className="px-2 py-1 text-sm text-gray-400 dark:text-neutral-400">
        © {date.getFullYear()} Alex Nguyen. All rights reserved.
      </p>
      <hr className="my-1 h-0.5 w-60 bg-white opacity-10"></hr>
      <a
        className="inline-flex size-10 items-center justify-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        href="https://github.com/vempr/thinking-world/tree/main"
        target="_blank"
      >
        <svg
          className="size-5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.71 4.78 6.64.35.06.48-.15.48-.33 0-.17-.01-.72-.01-1.3-1.76.32-2.21-.43-2.35-.82-.08-.2-.42-.82-.72-.99-.24-.13-.59-.45-.01-.46.55-.01.94.51 1.07.72.63 1.06 1.63.76 2.04.58.06-.46.24-.76.44-.94-1.55-.18-3.18-.78-3.18-3.45 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .58-.18 1.92.72.56-.16 1.15-.24 1.74-.24.59 0 1.19.08 1.74.24 1.34-.9 1.92-.72 1.92-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.88 0 2.68-1.63 3.27-3.19 3.45.25.22.47.64.47 1.29 0 .93-.01 1.68-.01 1.92 0 .18.13.4.48.33A7 7 0 0 0 15 8c0-3.87-3.13-7-7-7z" />
        </svg>
      </a>
    </footer>
  );
}
