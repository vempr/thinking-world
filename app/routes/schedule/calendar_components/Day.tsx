import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { ScrollArea } from "~/components/ui/scroll-area.tsx";
import { DayType } from "../utils/getDay.ts";
import { Plus, Trash2 } from "lucide-react";
import { WorkshiftFull } from "~/types/work.types.ts";
import { useFetcher, useSearchParams } from "@remix-run/react";
import invert from "invert-color";
import { useEffect, useState } from "react";
import { action as postAction } from "~/routes/schedule.day.post/route.tsx";
import { action as deleteAction } from "~/routes/schedule.day.delete/route.tsx";
import { Spinner } from "~/components/Spinner.tsx";
import { useDrop } from "react-dnd";
import { cn } from "~/lib/utils.ts";

export default function Day({ day, workShifts, placement }: {
  day: DayType | null;
  workShifts: WorkshiftFull[] | null;
  placement: number;
}) {
  const [searchParams] = useSearchParams();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "workshift",
    drop: () => ({ date: day?.date.toISOString().split("T")[0] }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [searchParams]);
  const [editFormModalOpen, setEditFormModalOpen] = useState<boolean>(false);
  const [loadingShift, setLoadingShift] = useState<number | null>();
  const addFetcher = useFetcher<typeof postAction>();
  const deleteFetcher = useFetcher<typeof deleteAction>();
  const presentDate = new Date();
  const sameDay =
    day &&
    day.date.getDate() === presentDate.getDate() &&
    day.date.getMonth() === presentDate.getMonth() &&
    day.date.getFullYear() === presentDate.getFullYear();

  useEffect(() => {
    if (addFetcher.state === "loading") {
      setEditFormModalOpen(false);
      setLoadingShift(null);
    }
  }, [addFetcher.state]);

  const dayDoesNotExist = !Boolean(day);
  const shifts =
    day?.data?.map((dayData) => {
      const workShift = workShifts?.find((shift) => shift.id === dayData.work_shift_id)
      if (!workShift) return null;
      return {
        workShiftInfo: workShift,
        dayInfo: dayData,
      }
    }).filter((shift) => shift?.dayInfo) || [];

  const roundedMap: { [key: number]: string } = {
    29: "rounded-bl-md",
    35: "rounded-br-md"
  };
  const rounded = roundedMap[placement] || "";

  return (
    <li ref={drop}>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={cn(
              "flex flex-col w-full border border-opacity-40 dark:border-opacity-5 border-gray-300",
              rounded,
              "h-16 lg:h-24",
              "transition-colors duration-100",
              {
                "bg-white hover:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900": dayDoesNotExist,
                "bg-white hover:bg-sky-100 dark:bg-neutral-900 dark:hover:bg-neutral-800": !dayDoesNotExist && !sameDay && !isOver,
                "bg-red-400 hover:bg-red-300 bg-opacity-70 dark:bg-opacity-30 dark:bg-red-800 dark:hover:bg-red-600 dark:hover:bg-opacity-30": !dayDoesNotExist && sameDay,
                "bg-sky-100 dark:bg-neutral-800": !dayDoesNotExist && isOver && !sameDay,
                "bg-red-300 dark:bg-red-600": !dayDoesNotExist && isOver && sameDay,
              }
            )}
            type="button"
            disabled={dayDoesNotExist}
          >
            <div className="flex flex-col w-full">
              {day && (
                <p className="self-end text-opacity-50 text-black dark:text-white dark:text-opacity-30 mb-1 text-xs md:text-base">
                  <span
                    className={`${sameDay ? "bg-red-600 px-1 text-white rounded-md" : "pr-1"}`}
                  >
                    {day.date.getDate()}
                  </span>
                </p>
              )}
              <ul className="flex flex-col gap-y-1">
                {shifts[0]?.workShiftInfo && <li><div
                  className="p-1 rounded-sm mx-1 text-xs text-left"
                  style={{
                    backgroundColor: shifts[0].workShiftInfo.color,
                    color: invert(shifts[0].workShiftInfo.color, true),
                  }}>
                  <p className="md:hidden">{" "}</p>
                  <p className="hidden md:block">{shifts[0].workShiftInfo.start_time.slice(0, 5)} - {shifts[0].workShiftInfo.end_time.slice(0, 5)}</p>
                </div></li>}
                {shifts[1]?.workShiftInfo && <li><div
                  className="p-1 rounded-sm mx-1 text-xs text-left"
                  style={{
                    backgroundColor: shifts[1].workShiftInfo.color,
                    color: invert(shifts[1].workShiftInfo.color, true),
                  }}>
                  <p className="md:hidden">{" "}</p>
                  <p className="hidden md:block">{shifts[1].workShiftInfo.start_time.slice(0, 5)} - {shifts[1].workShiftInfo.end_time.slice(0, 5)}</p>
                </div></li>}
                {
                  shifts.length > 2 && <p className="-translate-y-3 text-neutral-700 dark:text-white">...</p>
                }
              </ul>
            </div>

          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="border-b pb-4">
            <DialogTitle>
              {day &&
                `${day.date.getDate()}.${day.date.getMonth() + 1}.${day.date.getFullYear()}`}
            </DialogTitle>
            <DialogDescription>
              Make changes to your work shifts here.
            </DialogDescription>
          </DialogHeader>
          <Dialog
            defaultOpen={false}
            open={editFormModalOpen}
            onOpenChange={setEditFormModalOpen}
          >
            <ScrollArea className="max-h-[50vh]">
              <ul className="flex flex-col gap-y-1">
                {shifts.length > 0 ? (
                  shifts.map((shift, index) =>
                    shift?.workShiftInfo ? (
                      <li
                        key={index}
                        className="flex-1 flex flex-row items-center justify-between px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: shift.workShiftInfo.color,
                          color: invert(shift.workShiftInfo.color, true),
                        }}>
                        <p className="font-medium w-28 sm:w-40 overflow-hidden">{shift.workShiftInfo.title}</p>
                        <p className="font-normal text-sm">{shift.workShiftInfo.start_time} - {shift.workShiftInfo.end_time}</p>
                        <deleteFetcher.Form
                          action="/schedule/day/delete"
                          method="post"
                          onSubmit={() => setLoadingShift(shift.dayInfo.id)}
                        >
                          <input type="hidden" name="id" value={shift.dayInfo.id} />
                          <button
                            type="submit"
                            disabled={deleteFetcher.state === "submitting" && loadingShift === shift.dayInfo.id}
                            className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm translate-x-2"
                          >
                            {deleteFetcher.state === "submitting" && loadingShift === shift.dayInfo.id ? <Spinner size={4} /> : <Trash2 size="16" />}
                          </button>
                        </deleteFetcher.Form>
                      </li>
                    ) : null
                  )
                ) : (
                  <p>No work shifts for this day.</p>
                )}
              </ul>
            </ScrollArea>
            <DialogTrigger asChild>
              <button
                className={`flex flex-row gap-x-2 items-center border border-gray-300 rounded-lg p-3 font-semibold text-lg hover:bg-neutral-200 dark:hover:bg-neutral-900`}
                type="button"
              >
                <Plus size={24} /><p>Add work shift</p>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="border-b pb-4">
                <DialogTitle>
                  Available work shifts
                </DialogTitle>
                <DialogDescription>
                  Add a work shift you created.
                </DialogDescription>
              </DialogHeader>
              <ul className="flex flex-col gap-y-1">
                {workShifts?.length ? workShifts?.map((workShift: WorkshiftFull) => {
                  const submitting = loadingShift === workShift.id && addFetcher.state === "submitting";
                  return (
                    <li className="flex" key={workShift.id}>
                      <addFetcher.Form
                        action="/schedule/day/post"
                        method="post"
                        className="flex-1 flex"
                        onSubmit={() => setLoadingShift(workShift.id)}
                      >
                        <input type="hidden" name="work_shift_id" value={workShift.id} />
                        <input type="date" name="date" value={day?.date.toISOString().split("T")[0]} readOnly className="hidden" />
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`flex flex-1 ${submitting ? "justify-center" : "justify-between"} p-3 rounded-lg hover:opacity-80`}
                          style={{ backgroundColor: workShift.color, color: invert(workShift.color, true) }}
                        >
                          {submitting ? (
                            <Spinner />
                          ) : (
                            <>
                              <p className="font-semibold">{workShift.title}</p>
                              <p className="font-medium">
                                {workShift.start_time} - {workShift.end_time}
                              </p>
                            </>
                          )}
                        </button>
                      </addFetcher.Form>
                    </li>)
                }) : <p>You haven't created any work shifts yet.</p>}
              </ul>
            </DialogContent>
          </Dialog>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}
