import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { DayType } from "../utils/getDay.ts";
import { Plus } from "lucide-react";
import { WorkshiftFull } from "~/types/work.types.ts";
import { useFetcher } from "@remix-run/react";
import invert from "invert-color";
import { useEffect, useState } from "react";
import { action } from "~/routes/schedule.day.post/route.tsx";
import { Spinner } from "~/components/Spinner.tsx";

export default function Day({ day, workShifts, placement }: {
  day: DayType | null;
  workShifts: WorkshiftFull[] | null;
  placement: number;
}) {
  const [editFormModalOpen, setEditFormModalOpen] = useState<boolean>(false);
  const [loadingShift, setLoadingShift] = useState<number | null>();
  const fetcher = useFetcher<typeof action>();
  const presentDate = new Date();
  const sameDay =
    day &&
    day.date.getDate() === presentDate.getDate() &&
    day.date.getMonth() === presentDate.getMonth() &&
    day.date.getFullYear() === presentDate.getFullYear();

  useEffect(() => {
    if (fetcher.state === "loading") {
      setEditFormModalOpen(false);
      setLoadingShift(null);
    }
  }, [fetcher.state]);

  const dayDoesNotExist = !Boolean(day);
  const shiftsInDay =
    day?.data?.map((dayData) =>
      workShifts?.find((shift) => shift.id === dayData.work_shift_id)
    ) || [];

  const roundedMap: { [key: number]: string } = {
    29: "rounded-bl-md",
    35: "rounded-br-md"
  };
  const rounded = roundedMap[placement] || "";

  return (
    <li>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={`flex flex-row-reverse w-full border border-opacity-40 dark:border-opacity-5 border-gray-300 ${rounded} h-16 lg:h-24 pr-1 ${sameDay ? "bg-red-500 bg-opacity-70 dark:bg-red-800 dark:bg-opacity-30" : "bg-white dark:bg-neutral-900"} ${sameDay ? "hover:bg-red-300" : "hover:bg-sky-100"} ${dayDoesNotExist && "hover:bg-white"}`}
            type="button"
            disabled={dayDoesNotExist}
          >
            {day && (
              <p className="text-opacity-50 text-black dark:text-white dark:text-opacity-70">
                <span
                  className={`${sameDay ? "bg-red-600 px-1 text-white rounded-md" : "pr-1"}`}
                >
                  {day.date.getDate()}
                </span>
              </p>
            )}
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
            <ul>
              {shiftsInDay.length > 0 ? (
                shiftsInDay.map((workShift, index) =>
                  workShift ? (
                    <li key={index}>{workShift.title}</li>
                  ) : null
                )
              ) : (
                <p>No work shifts for this day.</p>
              )}
            </ul>
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
                {workShifts ? workShifts?.map((workShift: WorkshiftFull) => {
                  const submitting = loadingShift === workShift.id && fetcher.state === "submitting";
                  return (
                    <li className="flex" key={workShift.id}>
                      <fetcher.Form
                        action="/schedule/day/post"
                        method="post"
                        className="flex-1 flex"
                        onSubmit={() => setLoadingShift(workShift.id)}
                      >
                        <input type="hidden" name="work_shift_id" value={workShift.id} />
                        <input type="date" name="date" value={day?.date.toISOString().split("T")[0]} readOnly className="hidden" />
                        <button
                          type="submit"
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
                      </fetcher.Form>
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
