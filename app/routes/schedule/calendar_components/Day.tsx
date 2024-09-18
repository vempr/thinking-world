import { DayObject } from "../utils/getDay";

export default function Day({ dayObject }: { dayObject: DayObject | null }) {
  const date = new Date();
  const sameDay =
    dayObject &&
    dayObject.day === date.getDate() &&
    dayObject.month === date.getMonth() &&
    dayObject.year === date.getFullYear();

  const dayDoesNotExist = !Boolean(dayObject);

  return (
    <li>
      <button
        className={`flex flex-row-reverse w-full border h-16 lg:h-24 pr-1 ${sameDay ? "bg-red-200" : "bg-white"} ${sameDay ? "hover:bg-red-300" : "hover:bg-sky-100"} ${dayDoesNotExist && "hover:bg-white"}`}
        type="button"
        disabled={dayDoesNotExist}
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
    </li>
  );
}
