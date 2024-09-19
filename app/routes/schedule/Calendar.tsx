import { useSearchParams } from "@remix-run/react";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect } from "react";
import { toast } from "sonner";
import Day from "./calendar_components/Day.tsx";
import WeekdayBar from "./calendar_components/WeekdayBar.tsx";
import { getDaysArray, type DayObject } from "./utils/getDay.ts";

type CalendarProps = {
  data:
    | {
        date: string;
        id: number;
        optional_description: string | null;
        user_id: string;
        work_shift_id: number;
      }[]
    | null;
  error: PostgrestError | null;
};

export default function Calendar({ data, error }: CalendarProps) {
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

  useEffect(() => {
    if (error) toast.error(error.message);
  });

  return (
    <div
      className={
        "flex flex-col flex-1 max-w-[80rem] border border-blue-200 dark:border-none" +
        ` ${error && "opacity-20 select-none pointer-events-none cursor-not-allowed"}`
      }
    >
      <WeekdayBar />
      <ul className="grid grid-cols-7">
        {error
          ? daysArray.map((_, index) => {
              return (
                <Day
                  dayObject={null}
                  key={index}
                />
              );
            })
          : daysArray.map((day: DayObject | null, index) => {
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
