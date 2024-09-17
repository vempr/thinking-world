import { DayObject } from "../utils/getDaysArray";

export default function Day({ dayObject }: { dayObject: DayObject | null }) {
  const date = new Date();
  const sameDay =
    dayObject &&
    dayObject.day === date.getDate() &&
    dayObject.month === date.getMonth() &&
    dayObject.year === date.getFullYear();

  return (
    <li>
      <button
        className={`flex flex-row-reverse w-full border h-16 lg:h-24 pr-1 ${sameDay && "hover:bg-red-300"} ${dayObject && "hover:bg-white"} hover:bg-sky-100 ${sameDay ? "bg-red-200" : "bg-white"}`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-stacked-overlays"
        data-hs-overlay="#hs-stacked-overlays"
        disabled={Boolean(dayObject)}
      >
        {dayObject && (
          <p className="text-opacity-50 text-black">
            <span
              className={`${sameDay ? "bg-red-600 px-1 text-white rounded-md" : "pr-1"}`}
            >
              {dayObject.day}
            </span>
          </p>
        )}
      </button>

      <div
        id="hs-stacked-overlays"
        className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/50 hidden size-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-stacked-overlays-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto hs-dark-mode-active:bg-neutral-800 hs-dark-mode-active:border-neutral-700 hs-dark-mode-active:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b hs-dark-mode-active:border-neutral-700">
              <h3
                id="hs-stacked-overlays-label"
                className="font-bold text-gray-800 hs-dark-mode-active:text-white"
              >
                Modal title (level 1)
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none hs-dark-mode-active:bg-neutral-700 hs-dark-mode-active:hover:bg-neutral-600 hs-dark-mode-active:text-neutral-400 hs-dark-mode-active:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-stacked-overlays"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 mb-2 text-gray-800 hs-dark-mode-active:text-neutral-400">
                Stacked Overlays modals are a user interface design concept
                where multiple overlay windows, or modals, are displayed on top
                of each other, typically in a web or app interface. These modals
                are often used to present additional information, confirm
                actions, or to guide users through multi-step processes. The key
                characteristic of Stacked Overlays is their layered appearance,
                where each new modal partially covers the previous one, creating
                a stack effect. This stacking can provide a visual cue to users
                about the depth of their interaction or the sequence of tasks.
                To maintain usability, these modals are designed with careful
                attention to transparency, size, and the ability to easily
                return to previous layers. They often incorporate animations for
                smooth transitions between layers and may include features like
                dimming the background to focus user attention on the active
                modal.
              </p>
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-stacked-overlays-2"
                data-hs-overlay="#hs-stacked-overlays-2"
                data-hs-overlay-options='{
    "isClosePrev": false
  }'
              >
                Open modal
              </button>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t hs-dark-mode-active:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none hs-dark-mode-active:bg-neutral-800 hs-dark-mode-active:border-neutral-700 hs-dark-mode-active:text-white hs-dark-mode-active:hover:bg-neutral-700 hs-dark-mode-active:focus:bg-neutral-700"
                data-hs-overlay="#hs-stacked-overlays"
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="hs-stacked-overlays-2"
        className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/70 hidden size-full fixed top-0 start-0 z-[70] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-stacked-overlays-2-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto hs-dark-mode-active:bg-neutral-800 hs-dark-mode-active:border-neutral-700 hs-dark-mode-active:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b hs-dark-mode-active:border-neutral-700">
              <h3
                id="hs-stacked-overlays-2-label"
                className="font-bold text-gray-800 hs-dark-mode-active:text-white"
              >
                Modal title (level 2)
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none hs-dark-mode-active:bg-neutral-700 hs-dark-mode-active:hover:bg-neutral-600 hs-dark-mode-active:text-neutral-400 hs-dark-mode-active:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-stacked-overlays-2"
                data-hs-overlay-options='{
    "isClosePrev": false
  }'
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 mb-2 text-gray-800 hs-dark-mode-active:text-neutral-400">
                Stacked Overlays modals represent a design approach in user
                interfaces, where several overlay windows, known as modals, are
                layered on top of one another. This is commonly seen in web or
                mobile application interfaces.
              </p>
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-stacked-overlays-3"
                data-hs-overlay="#hs-stacked-overlays-3"
                data-hs-overlay-options='{
    "isClosePrev": false
  }'
              >
                Open modal
              </button>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t hs-dark-mode-active:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none hs-dark-mode-active:bg-neutral-800 hs-dark-mode-active:border-neutral-700 hs-dark-mode-active:text-white hs-dark-mode-active:hover:bg-neutral-700 hs-dark-mode-active:focus:bg-neutral-700"
                data-hs-overlay="#hs-stacked-overlays-2"
                data-hs-overlay-options='{
    "isClosePrev": false
  }'
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="hs-stacked-overlays-3"
        className="hs-overlay hs-overlay-backdrop-open:bg-gray-900/80 hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-stacked-overlays-3-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto hs-dark-mode-active:bg-neutral-800 hs-dark-mode-active:border-neutral-700 hs-dark-mode-active:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b hs-dark-mode-active:border-neutral-700">
              <h3
                id="hs-stacked-overlays-3-label"
                className="font-bold text-gray-800 hs-dark-mode-active:text-white"
              >
                Modal title (level 3)
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none hs-dark-mode-active:bg-neutral-700 hs-dark-mode-active:hover:bg-neutral-600 hs-dark-mode-active:text-neutral-400 hs-dark-mode-active:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-stacked-overlays-3"
                data-hs-overlay-options='{
    "isClosePrev": false
  }'
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="mt-1 text-gray-800 hs-dark-mode-active:text-neutral-400">
                Stacked Overlays: UI design with layered modals, often in
                web/apps, where each window overlays the previous one.
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t hs-dark-mode-active:border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none hs-dark-mode-active:bg-neutral-800 hs-dark-mode-active:border-neutral-700 hs-dark-mode-active:text-white hs-dark-mode-active:hover:bg-neutral-700 hs-dark-mode-active:focus:bg-neutral-700"
                data-hs-overlay="#hs-stacked-overlays-3"
                data-hs-overlay-options='{
    "isClosePrev": false
  }'
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
