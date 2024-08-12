import { Link } from "@remix-run/react";
import twImage from "../../public/tw.png";

const hamburgerMenuButton = (
  <div className="sm:hidden">
    <button
      type="button"
      className="hs-collapse-toggle relative flex size-7 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      id="hs-navbar-example-collapse"
      aria-expanded="false"
      aria-controls="hs-navbar-example"
      aria-label="Toggle navigation"
      data-hs-collapse="#hs-navbar-example"
    >
      <svg
        className="hs-collapse-open:hidden size-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line
          x1="3"
          x2="21"
          y1="6"
          y2="6"
        />
        <line
          x1="3"
          x2="21"
          y1="12"
          y2="12"
        />
        <line
          x1="3"
          x2="21"
          y1="18"
          y2="18"
        />
      </svg>
      <svg
        className="hs-collapse-open:block hidden size-4 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
      <span className="sr-only">Toggle navigation</span>
    </button>
  </div>
);

export default function Heading() {
  return (
    <div className="sticky top-0 z-50">
      <header className="relative flex w-full flex-wrap bg-white py-3 text-sm sm:flex-nowrap sm:justify-start dark:bg-neutral-800">
        <nav className="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link
              className="text-md flex items-center justify-center gap-x-2 font-semibold focus:opacity-80 focus:outline-none dark:text-white"
              to="/"
              aria-label="Brand"
            >
              <img
                src={twImage}
                className="h-10 w-10"
              />
              <p>Thinking World</p>
            </Link>
            {hamburgerMenuButton}
          </div>
          <div
            id="hs-navbar-example"
            className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
            aria-labelledby="hs-navbar-example-collapse"
          >
            <ul className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
              <li>
                <Link
                  to="/"
                  className="font-medium text-blue-500 focus:outline-none"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                >
                  Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 hover:border-blue-500 hover:text-blue-500 focus:border-blue-500 focus:text-blue-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400"
                >
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <hr className="h-px border-0 bg-gray-300 dark:bg-gray-700"></hr>
    </div>
  );
}
