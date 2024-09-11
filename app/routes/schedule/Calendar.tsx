import Day from "./calendar_components/Day.tsx";
import WeekdayBar from "./calendar_components/WeekdayBar.tsx";
import { getDaysArray } from "./utils/getDaysArray.ts";

export default function Calendar() {
  const daysArray = getDaysArray();

  return (
    <div className="flex flex-col flex-1 max-w-[80rem]">
      <WeekdayBar />
      <ul className="grid grid-cols-7">
        {daysArray.map((day: number | null, index) => {
          return (
            <Day
              day={day}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
}
