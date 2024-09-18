import { useSearchParams } from "@remix-run/react";
import Day from "./calendar_components/Day.tsx";
import WeekdayBar from "./calendar_components/WeekdayBar.tsx";
import { getDaysArray, type DayObject } from "./utils/getDay.ts";

export default function Calendar() {
  const date = new Date();
  const [searchParams] = useSearchParams();
  const year =
    searchParams.get("year") !== null
      ? Number(searchParams.get("year"))
      : date.getFullYear();
  const month =
    searchParams.get("month") !== null
      ? Number(searchParams.get("month"))
      : date.getMonth();

  const daysArray = getDaysArray(year, month);

  return (
    <div className="flex flex-col flex-1 max-w-[80rem] border border-blue-200 dark:border-none">
      <WeekdayBar />
      <ul className="grid grid-cols-7">
        {daysArray.map((day: DayObject | null, index) => {
          return (
            <Day
              dayObject={day}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
}
