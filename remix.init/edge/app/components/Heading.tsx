import { Theme, useTheme } from "remix-themes";
import { Link, NavLink } from "@remix-run/react";
import twImage from "../../tw.png";
import { useState } from "react";

export default function Heading() {
  const [, setTheme] = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 block w-full z-20 top-0 start-0 border-b border-gray-200/70 dark:border-neutral-600/30">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <div className="flex justify-center items-center gap-x-3">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse" prefetch="intent">
            <img src={twImage} className="h-10" alt="Thinking World Logo" />
            <span className="self-center text-sm font-semibold whitespace-nowrap dark:text-white">
              Thinking<br />World
            </span>
          </Link>
          <button
            type="button"
            className="hs-dark-mode dark:hidden items-center gap-x-2 p-3 bg-gray-300 rounded-full text-sm text-black hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            onClick={() => setTheme(Theme.DARK)}
          >
            <svg
              className="shrink-0 size-4"
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
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>
          <button
            type="button"
            className="hs-dark-mode dark:inline-flex hidden items-center gap-x-2 p-3 bg-slate-800 rounded-full text-sm text-white hover:bg-slate-700 focus:outline-none focus:bg-slate-700"
            onClick={() => setTheme(Theme.LIGHT)}
          >
            <svg
              className="shrink-0 size-4"
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
              <circle
                cx="12"
                cy="12"
                r="4"
              ></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </button>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            to="/schedule/work"
            prefetch="render"
            className="text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-xs sm:text-sm px-4 py-2 text-center flex items-center"
          >
            <p className="sm:hidden">Schedule</p>
            <p className="hidden sm:block">Your Schedule</p>
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-neutral-900 dark:border-neutral-700">
            <li>
              <NavLink
                to="/"
                prefetch="intent"
                className={({ isActive }) =>
                  `block py-2 px-3 ${isActive
                    ? 'text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 md:dark:text-sky-500'
                    : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-600 md:p-0 md:dark:hover:text-sky-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/guide"
                prefetch="intent"
                className={({ isActive }) =>
                  `block py-2 px-3 ${isActive
                    ? 'text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 md:dark:text-sky-500'
                    : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-600 md:p-0 md:dark:hover:text-sky-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                  }`
                }
              >
                Guide
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                prefetch="intent"
                className={({ isActive }) =>
                  `block py-2 px-3 ${isActive
                    ? 'text-white bg-sky-500 rounded md:bg-transparent md:text-sky-500 md:p-0 md:dark:text-sky-500'
                    : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-600 md:p-0 md:dark:hover:text-sky-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                  }`
                }
              >
                Account Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
