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
import { WorkshiftFull } from "~/routes/schedule.work/types.ts";
import { useFetcher } from "@remix-run/react";

export default function Day({ day, workShifts }: {
  day: DayType | null; workShifts?: WorkshiftFull[] | null
}) {
  const fetcher = useFetcher();
  const presentDate = new Date();
  const sameDay =
    day &&
    day.date.getDate() === presentDate.getDate() &&
    day.date.getMonth() === presentDate.getMonth() &&
    day.date.getFullYear() === presentDate.getFullYear();

  const dayDoesNotExist = !Boolean(day);

  return (
    <li>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={`flex flex-row-reverse w-full border border-gray-300 h-16 lg:h-24 pr-1 ${sameDay ? "bg-red-200" : "bg-white"} ${sameDay ? "hover:bg-red-300" : "hover:bg-sky-100"} ${dayDoesNotExist && "hover:bg-white"}`}
            type="button"
            disabled={dayDoesNotExist}
          >
            {day && (
              <p className="text-opacity-50 text-black">
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
          <Dialog>
            <DialogTrigger asChild>
              <button
                className={`flex flex-row gap-x-2 items-center border rounded-lg p-3 font-semibold text-lg hover:bg-neutral-900`}
                type="button"
              >
                {/* render added work shifts */}
                <Plus size={24} /> <p>Add work shift</p>
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
              <ul>
                {workShifts ? workShifts?.map((workShift: WorkshiftFull) => <fetcher.Form>
                  {/* render all work shifts */}
                </fetcher.Form>) : <p>You haven't created any work shifts yet.</p>}
              </ul>
            </DialogContent>
          </Dialog>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}
