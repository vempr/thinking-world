import { useSearchParams } from "@remix-run/react";
import { getMonthByJSDateNumber } from "./utils/getMonth.ts";
import { ChartColumn } from "lucide-react";
import { getDaysArray } from "./utils/getDay.ts";
import { WorkshiftFull } from "~/types/work.types.ts";

type InsightData = {
  days: {
    id: number;
    date: string;
    work_shift_id: number;
  }[] | null;
  workShifts: WorkshiftFull[] | null;
}

export default function Insights({ data }: { data: InsightData }) {
  const [searchParams] = useSearchParams();

  const date = new Date();
  const year =
    searchParams.get("year") !== null
      ? Number(searchParams.get("year"))
      : date.getFullYear();
  const month =
    searchParams.get("month") !== null
      ? Number(searchParams.get("month"))
      : date.getMonth();

  const daysArray = getDaysArray(year, month, data.days).filter((day) => day?.data?.length);
  const pays = data.workShifts
    ? Object.fromEntries(data.workShifts.map((workShift: WorkshiftFull) => [workShift.id, 0]))
    : null;
  const hoursWorked = data.workShifts
    ? Object.fromEntries(data.workShifts.map((workShift: WorkshiftFull) => [workShift.id, 0]))
    : null;

  const calculateHours = (start_time: string, end_time: string): number => {
    const [startHours, startMinutes] = start_time.split(':').map(Number);
    const [endHours, endMinutes] = end_time.split(':').map(Number);

    const startDate = new Date();
    const endDate = new Date();

    startDate.setHours(startHours, startMinutes, 0);
    endDate.setHours(endHours, endMinutes, 0);

    let differenceInMs = endDate.getTime() - startDate.getTime();
    if (differenceInMs < 0) {
      differenceInMs += 24 * 60 * 60 * 1000;
    }

    return differenceInMs / (1000 * 60 * 60);
  };

  if (pays && hoursWorked) {
    daysArray.forEach((day) => {
      if (day?.data) {
        day.data.forEach((shift) => {
          const workShift = data.workShifts?.find(ws => ws.id === shift.work_shift_id);

          if (workShift && shift?.work_shift_id in pays) {
            const hours = calculateHours(workShift.start_time, workShift.end_time);
            hoursWorked[shift.work_shift_id] += hours;

            if (workShift.is_hourly_pay) {
              pays[shift.work_shift_id] += workShift.pay * hours;
            } else {
              pays[shift.work_shift_id] += workShift.pay;
            }
          }
        });
      }
    });
  }

  const sum = (pays: { [k: string]: number; }) => Object.values(pays).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-black dark:text-white flex flex-row items-center justify-between gap-x-2 md:gap-x-5 sm:justify-normal font-title">
        <span>Insights for {
          searchParams.get("month") ? getMonthByJSDateNumber(Number(searchParams.get("month"))) : getMonthByJSDateNumber(date.getMonth())
        }</span>
        <ChartColumn size={48} className="hidden sm:block size-6 md:size-10 lg:size-12" />
      </h2>
      <div className="text-lg">
        <p>Your total earnings as of this month: <span className="text-lg sm:text-2xl font-title text-sky-500">{pays ? sum(pays).toFixed(2) : "0.00"}</span>,</p>
        <p>In <span className="font-title text-sky-500">{hoursWorked ? sum(hoursWorked) : "0"}</span> hours worked.</p>
      </div>
      <div className="my-3 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Work Shift{" "}
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Hours Worked
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Salary{"    "}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.workShifts &&
              data.workShifts.map((workShift) => (
                <tr key={workShift.id} className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {workShift.title}
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {hoursWorked && hoursWorked[workShift.id] || "0"}
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    {pays && pays[workShift.id]?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}