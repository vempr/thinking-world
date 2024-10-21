import { useSearchParams } from "@remix-run/react";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect } from "react";
import { toast } from "sonner";
import Day from "./calendar_components/Day.tsx";
import WeekdayBar from "./calendar_components/WeekdayBar.tsx";
import { getDaysArray, type DayType } from "./utils/getDay.ts";
import { WorkshiftFull } from "../../types/work.types.ts";

type CalendarProps = {
  data: {
    days: {
      id: number;
      date: string;
      optional_description: string | null;
      user_id: string;
      work_shift_id: number;
    }[] | null;
    workShifts: WorkshiftFull[] | null;
  };
  errors: {
    daysError: PostgrestError | null;
    workShiftsError: PostgrestError | null;
  };
};

export default function Calendar({ data, errors }: CalendarProps) {
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

  const daysArray = getDaysArray(year, month, data.days);

  useEffect(() => {
    if (errors.daysError) toast.error(errors.daysError.message);
    if (errors.workShiftsError) toast.error(errors.workShiftsError.message);
  }, [errors]);

  return (
    <div
      className={
        "flex flex-col flex-1 max-w-[80rem] shadow-lg" +
        ` ${(errors.daysError || errors.workShiftsError) && "opacity-20 select-none pointer-events-none cursor-not-allowed"}`
      }
    >
      <WeekdayBar />
      <div className="rounded-lg">
        <ul className="grid grid-cols-7 ">
          {(errors.daysError || errors.workShiftsError)
            ? daysArray.map((_, index) => {
              return (
                <Day
                  day={null}
                  workShifts={null}
                  key={index}
                  placement={index + 1}
                />
              );
            })
            : daysArray.map((day: DayType | null, index) => {
              return (
                <Day
                  day={day}
                  workShifts={data.workShifts}
                  key={index}
                  placement={index + 1}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
