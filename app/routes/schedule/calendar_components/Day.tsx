import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { ScrollArea } from "~/components/ui/scroll-area.tsx";
import { DayType } from "../utils/getDay.ts";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { WorkshiftFull } from "~/types/work.types.ts";
import { useFetcher, useSearchParams } from "@remix-run/react";
import invert from "invert-color";
import { useEffect, useState } from "react";
import { action as postShiftAction } from "~/routes/schedule.day.post/route.tsx";
import { action as deleteShiftAction } from "~/routes/schedule.day.delete/route.tsx";
import { Spinner } from "~/components/Spinner.tsx";
import { useDrop } from "react-dnd";
import { cn } from "~/lib/utils.ts";
import { action as postEventAction } from "~/routes/schedule.event.post/route.tsx";
import { action as patchEventAction } from "~/routes/schedule.event.patch/route.tsx";
import { action as deleteEventAction } from "~/routes/schedule.event.delete/route.tsx";
import EventPostForm from "./day_components/EventPostForm.tsx";
import EventPatchForm from "./day_components/EventPatchForm.tsx";

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

  const [editShiftFormModalOpen, setEditShiftFormModalOpen] = useState<boolean>(false);
  const [editEventPostFormModalOpen, setEditEventPostFormModalOpen] = useState<boolean>(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [loadingShift, setLoadingShift] = useState<number | null>();
  const [loadingEvent, setLoadingEvent] = useState<number | null>();

  const addShiftFetcher = useFetcher<typeof postShiftAction>();
  const deleteShiftFetcher = useFetcher<typeof deleteShiftAction>();
  const postEventFetcher = useFetcher<typeof postEventAction>();
  const patchEventFetcher = useFetcher<typeof patchEventAction>();
  const deleteEventFetcher = useFetcher<typeof deleteEventAction>();

  const presentDate = new Date();
  const sameDay =
    day &&
    day.date.getDate() === presentDate.getDate() &&
    day.date.getMonth() === presentDate.getMonth() &&
    day.date.getFullYear() === presentDate.getFullYear();

  useEffect(() => {
    if (addShiftFetcher.state === "loading") {
      setEditShiftFormModalOpen(false);
      setLoadingShift(null);
    }
  }, [addShiftFetcher.state]);

  useEffect(() => {
    if (postEventFetcher.state === "loading") {
      setEditEventPostFormModalOpen(false);
    }
  }, [postEventFetcher.state]);

  useEffect(() => {
    if (patchEventFetcher.state === "loading") {
      setEditingEventId(null);
    }
  }, [patchEventFetcher.state]);

  const dayDoesNotExist = !Boolean(day);
  const shifts =
    day?.data?.workData?.map((dayData) => {
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
                "bg-red-400 hover:bg-red-300 bg-opacity-40 dark:bg-opacity-30 dark:bg-red-800 dark:hover:bg-red-600 dark:hover:bg-opacity-30": !dayDoesNotExist && sameDay,
                "bg-sky-100 dark:bg-neutral-800": !dayDoesNotExist && isOver && !sameDay,
                "bg-red-100 dark:bg-red-600": !dayDoesNotExist && isOver && sameDay,
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
                {day?.data?.eventData?.length ? <li>
                  <div
                    className="py-[2px] px-1 rounded-sm mx-1 text-xs text-left border-2"
                    style={{
                      borderColor: day?.data?.eventData[0].color,
                    }}
                  >
                    <p className="md:hidden">{" "}</p>
                    <p className="hidden md:block xl:hidden w-28 overflow-x-hidden">{day?.data?.eventData[0].title.length > 12 ? day?.data?.eventData[0].title.slice(0, 12) + "..." : day?.data?.eventData[0].title}</p>
                    <p className="hidden xl:block w-28 overflow-x-hidden">{day?.data?.eventData[0].title.length > 18 ? day?.data?.eventData[0].title.slice(0, 18) + "..." : day?.data?.eventData[0].title}</p>
                  </div>
                </li> : <></>}
                {shifts[0]?.workShiftInfo && <li><div
                  className="p-1 rounded-sm mx-1 text-xs text-left"
                  style={{
                    backgroundColor: shifts[0].workShiftInfo.color,
                    color: invert(shifts[0].workShiftInfo.color, true),
                  }}>
                  <p className="md:hidden">{" "}</p>
                  <p className="hidden md:block">{shifts[0].workShiftInfo.start_time.slice(0, 5)} - {shifts[0].workShiftInfo.end_time.slice(0, 5)}</p>
                </div></li>}
                {shifts[1]?.workShiftInfo && !day?.data?.eventData?.length && <li><div
                  className="p-1 rounded-sm mx-1 text-xs text-left"
                  style={{
                    backgroundColor: shifts[1].workShiftInfo.color,
                    color: invert(shifts[1].workShiftInfo.color, true),
                  }}>
                  <p className="md:hidden">{" "}</p>
                  <p className="hidden md:block">{shifts[1].workShiftInfo.start_time.slice(0, 5)} - {shifts[1].workShiftInfo.end_time.slice(0, 5)}</p>
                </div></li>}
                {
                  shifts.length + Number(day?.data?.eventData?.length) > 2 && <p className="-translate-y-3 text-neutral-700 dark:text-white">...</p>
                }
              </ul>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[600px]">
          <DialogHeader className="border-b pb-4">
            <DialogTitle>
              {day &&
                `${day.date.getDate()}.${day.date.getMonth() + 1}.${day.date.getFullYear()}`}
            </DialogTitle>
            <DialogDescription>
              Make changes to your work shifts and events here.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-1">
            <div className="flex-1 flex flex-col gap-y-2 md:gap-y-1">
              <Dialog
                defaultOpen={false}
                open={editShiftFormModalOpen}
                onOpenChange={setEditShiftFormModalOpen}
              >
                <DialogTrigger asChild>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-1 items-center md:hidden">
                      <h2 className="font-title text-xl">Work Shifts</h2>
                      <button className="ml-1 text-center rounded-full p-1.5 bg-sky-500 hover:bg-sky-600 text-white">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="hidden md:block w-full text-center rounded-md p-1.5 border border-dashed border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-neutral-700/20 font-medium">
                      Add created work shift
                    </button>
                  </div>
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
                      const submitting = loadingShift === workShift.id && (addShiftFetcher.state === "submitting" || addShiftFetcher.state === "loading");
                      return (
                        <li className="flex" key={workShift.id}>
                          <addShiftFetcher.Form
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
                          </addShiftFetcher.Form>
                        </li>)
                    }) : <p>You haven't created any work shifts yet.</p>}
                  </ul>
                </DialogContent>
              </Dialog>
              <ScrollArea className="max-h-[35vh]">
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
                          <div className="flex flex-col">
                            <p className="font-medium">{shift.workShiftInfo.title.length > 20 ? shift.workShiftInfo.title.slice(0, 20) + "..." : shift.workShiftInfo.title}</p>
                            <p className="font-light text-sm">{shift.workShiftInfo.start_time} - {shift.workShiftInfo.end_time}</p>
                          </div>
                          <deleteShiftFetcher.Form
                            action="/schedule/day/delete"
                            method="post"
                            onSubmit={() => setLoadingShift(shift.dayInfo.id)}
                          >
                            <input type="hidden" name="id" value={shift.dayInfo.id} />
                            <button
                              type="submit"
                              disabled={(deleteShiftFetcher.state === "submitting" || deleteShiftFetcher.state === "loading") && loadingShift === shift.dayInfo.id}
                              className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm translate-x-2"
                            >
                              {(deleteShiftFetcher.state === "submitting" || deleteShiftFetcher.state === "loading") && loadingShift === shift.dayInfo.id ? <Spinner size={4} /> : <Trash2 size="16" />}
                            </button>
                          </deleteShiftFetcher.Form>
                        </li>
                      ) : null
                    )
                  ) : (
                    <p className="italic opacity-70 md:text-center">No work shifts on this day.</p>
                  )}
                </ul>
              </ScrollArea>
            </div>
            <div className="flex-1 flex flex-col gap-y-2 md:gap-y-1">
              <Dialog
                defaultOpen={false}
                open={editEventPostFormModalOpen}
                onOpenChange={setEditEventPostFormModalOpen}
              >
                <DialogTrigger asChild>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-1 items-center md:hidden">
                      <h2 className="font-title text-xl">Events</h2>
                      <button className="ml-1 text-center rounded-full p-1.5 bg-sky-500 hover:bg-sky-600 text-white">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="hidden md:block w-full text-center rounded-md p-1.5 border border-dashed border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-neutral-700/20 font-medium">
                      Add new event
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="border-b pb-4">
                    <DialogTitle>
                      Add a new event.
                    </DialogTitle>
                    <DialogDescription>
                      One event will appear first in the calendar day.
                    </DialogDescription>
                  </DialogHeader>
                  <EventPostForm fetcher={postEventFetcher} date={day?.date.toISOString().split("T")[0]} />
                </DialogContent>
              </Dialog>
              <ScrollArea className="max-h-[35vh]">
                <ul className="flex flex-col gap-y-1">
                  {day?.data?.eventData?.length && day?.data?.eventData?.length > 0 ? (
                    day.data.eventData.map((eventDay, index) =>
                      <li
                        key={index}
                        className="flex-1 flex flex-row items-center justify-between px-4 py-2 rounded-lg bg-slate-200 dark:bg-neutral-800"
                        style={{
                          color: eventDay.color,
                        }}>
                        <div className="flex flex-col">
                          <p className="font-medium">{eventDay.title.length > 20 ? eventDay.title.slice(0, 20) + "..." : eventDay.title}</p>
                          <p className="font-light text-sm">{eventDay.time ? eventDay.time : <span className="italic opacity-70">No time specified</span>}</p>
                        </div>
                        <div className="flex flex-row gap-x-1">
                          <Dialog
                            defaultOpen={false}
                            open={editingEventId === eventDay.id}
                            onOpenChange={(open) => setEditingEventId(open ? eventDay.id : null)}
                          >
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="flex justify-center items-center bg-slate-400 hover:bg-slate-500 text-white p-2 rounded-sm translate-x-2"
                              >
                                <Pencil size="16" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit event</DialogTitle>
                                <DialogDescription>
                                  Make changes to your event here.
                                </DialogDescription>
                              </DialogHeader>
                              <EventPatchForm fetcher={patchEventFetcher} eventDay={eventDay} />
                            </DialogContent>
                          </Dialog>
                          <deleteEventFetcher.Form
                            action="/schedule/event/delete"
                            method="post"
                            onSubmit={() => setLoadingEvent(eventDay.id)}
                          >
                            <input type="hidden" name="id" value={eventDay.id} />
                            <button
                              type="submit"
                              disabled={(deleteEventFetcher.state === "submitting" || deleteEventFetcher.state === "loading") && loadingEvent === eventDay.id}
                              className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm translate-x-2"
                            >
                              {(deleteEventFetcher.state === "submitting" || deleteEventFetcher.state === "loading") && loadingEvent === eventDay.id ? <Spinner size={4} /> : <Trash2 size="16" />}
                            </button>
                          </deleteEventFetcher.Form>
                        </div>
                      </li>
                    )
                  ) : (
                    <p className="italic opacity-70 md:text-center">No events on this day.</p>
                  )}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  );
}
