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

export default function Day({ day }: { day: DayType | null }) {
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
          <DialogHeader>
            <DialogTitle>
              {day &&
                `${day.date.getDate()}.${day.date.getMonth() + 1}.${day.date.getFullYear()}`}
            </DialogTitle>
            <DialogDescription>
              Make changes to your work shifts here.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}
