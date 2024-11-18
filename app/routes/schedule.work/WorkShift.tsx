import invert from "invert-color";
import { Banknote, Clock, Pencil, Trash2 } from "lucide-react";
import { useFetcher } from "@remix-run/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRemixForm } from "remix-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { Input } from "~/components/ui/input.tsx";
import { Spinner } from "~/components/Spinner.tsx";
import { WorkshiftFull, WorkshiftPatch, workshiftPatchResolver } from "~/types/work.types.ts";
import { action as patchAction } from "../schedule.work.patch/route.tsx";
import { action as deleteAction } from "../schedule.work.delete/route.tsx";

export default function WorkShift({
  id,
  title,
  color,
  start_time,
  end_time,
  is_hourly_pay,
  pay,
}: WorkshiftFull) {
  const contrastedColor = invert(color, true);
  const fetcherDelete = useFetcher<typeof deleteAction>()
  const fetcherPatch = useFetcher<typeof patchAction>();
  const [patchFormModalOpen, setPatchFormModalOpen] = useState<boolean>(false);
  const [deleteFormModalOpen, setDeleteFormModalOpen] = useState<boolean>(false);
  useEffect(() => {
    if (fetcherPatch.data?.success) setPatchFormModalOpen(false);
    if (fetcherPatch.data?.error && fetcherPatch.state === "loading") {
      toast.error(`Error while deleting work shift: ${fetcherPatch.data.error}`);
    }
  }, [fetcherPatch.state]);
  useEffect(() => {
    if (fetcherDelete.data?.success) setPatchFormModalOpen(false);
    if (fetcherDelete.data?.error && fetcherDelete.state === "loading") {
      toast.error(`Error while deleting work shift: ${fetcherDelete.data.error}`);
    }
  }, [fetcherDelete.state]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useRemixForm<WorkshiftPatch>({
    mode: "onSubmit",
    resolver: workshiftPatchResolver,
    defaultValues: {
      id,
      title,
      color,
      start_time,
      end_time,
      is_hourly_pay,
      pay,
    },
    fetcher: fetcherPatch,
    submitConfig: {
      action: "/schedule/work/patch",
    },
  });
  const watchIsHourlyPay = watch("is_hourly_pay");

  return (
    <div
      className="rounded-lg flex flex-row items-center h-8 lg:h-16"
      style={{
        backgroundColor: color,
        color: contrastedColor,
      }}
    >
      <div className="flex-1 flex flex-row justify-between p-3">
        <p className="font-medium w-28 overflow-x-hidden text-left">{title}</p>
        <div className="flex flex-row gap-x-1.5 font-light text-sm text-right items-center">
          <div className="flex flex-row lg:flex-col text-sm md:text-base">
            <p>{start_time}</p>
            <p className="block mx-1 lg:hidden">-</p>
            <p>{end_time}</p>
          </div>
          <div
            className="hidden lg:block border-r-4 rounded-lg opacity-40 h-10"
            style={{ borderColor: contrastedColor }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row lg:flex-col h-8 lg:h-16 w-14 lg:w-7">
        <Dialog
          defaultOpen={false}
          open={patchFormModalOpen}
          onOpenChange={setPatchFormModalOpen}
        >
          <DialogTrigger asChild>
            <button className="flex-1 bg-slate-400 hover:bg-slate-500 lg:rounded-tr-lg flex items-center justify-center text-white">
              <Pencil size="16" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit your work shift template.</DialogTitle>
              <DialogDescription>
                Make changes to your work shift template.
              </DialogDescription>
            </DialogHeader>
            <fetcherPatch.Form
              className="flex flex-col gap-y-3"
              onSubmit={handleSubmit}
              method="post"
              action="/schedule/work/patch"
            >
              <div className="flex flex-row gap-x-1">
                <div className="flex-1">
                  <input type="hidden" name="id" value={id} />
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium dark:text-white"
                  >
                    Title
                  </label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Acme Co."
                    autoComplete="off"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="color"
                    className="mb-2 block text-sm invisible font-medium dark:text-white"
                  >
                    Color
                  </label>
                  <Input
                    type="color"
                    id="color"
                    defaultValue={color}
                    className="w-20 h-10 hover:cursor-pointer"
                    {...register("color")}
                  />
                  {errors.color && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-x-1">
                <div className="flex-1">
                  <label
                    htmlFor="timeFrom"
                    className="mb-2 block text-sm font-medium dark:text-white"
                  >
                    From
                  </label>
                  <Input
                    type="time"
                    id="timeFrom"
                    autoComplete="off"
                    {...register("start_time")}
                  />
                  {errors.start_time && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.start_time.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="timeTo"
                    className="mb-2 block text-sm font-medium dark:text-white"
                  >
                    To
                  </label>
                  <Input
                    type="time"
                    id="timeTo"
                    autoComplete="off"
                    {...register("end_time")}
                  />
                  {errors.end_time && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.end_time.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex gap-x-2 items-center justify-between mb-1">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium dark:text-white"
                  >
                    {watchIsHourlyPay ? "Hourly Pay" : "One-time Payment"}
                  </label>
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => setValue("is_hourly_pay", true)}
                      className={`${watchIsHourlyPay && "bg-black dark:bg-white"} bg-transparent border border-black dark:border-white rounded-tl-sm rounded-bl-sm py-1 px-4`}
                    >
                      <Clock size={16} className={`${watchIsHourlyPay ? "text-white dark:text-black" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("is_hourly_pay", false)}
                      className={`${!watchIsHourlyPay && "bg-black dark:bg-white"} bg-transparent border border-black dark:border-white rounded-tr-sm rounded-br-sm py-1 px-4`}
                    >
                      <Banknote size={16} className={`${!watchIsHourlyPay ? "text-white dark:text-black" : ""}`} />
                    </button>
                  </div>
                </div>
                <Input
                  type="number"
                  id="pay"
                  placeholder={watchIsHourlyPay ? "15" : "100"}
                  autoComplete="off"
                  {...register("pay")}
                />
                {errors.pay && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.pay.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={fetcherPatch.state === "submitting" || fetcherPatch.state === "loading"}
                className="mt-1 h-12 flex justify-center items-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-md font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                {(fetcherPatch.state === "submitting" || fetcherPatch.state === "loading") ? <Spinner /> : <p>Apply changes</p>}
              </button>
            </fetcherPatch.Form>
            <DialogFooter>
              {fetcherPatch.data?.error && (
                <p className="my-1 text-xs font-bold text-red-600">
                  {fetcherPatch.data.error.toString()}
                </p>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog
          defaultOpen={false}
          open={deleteFormModalOpen}
          onOpenChange={setDeleteFormModalOpen}
        >
          <DialogTrigger asChild>
            <button className="flex-1 bg-red-500 hover:bg-red-600 rounded-tr-lg lg:rounded-tr-none rounded-br-lg flex items-center justify-center text-white" type="submit">
              <Trash2 size="16" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Deleting this work shift will erase all calendar records including this shift.
              </DialogDescription>
            </DialogHeader>
            <fetcherDelete.Form method="delete" action="/schedule/work/delete" className="flex-1">
              <input type="hidden" name="id" value={id} />
              <button className="w-full h-full bg-red-500 p-2 hover:bg-red-600 rounded-lg flex items-center justify-center text-white" type="submit">
                {(fetcherDelete.state === "submitting" || fetcherDelete.state === "loading") ? <Spinner /> : <p>Delete Work Shift</p>}
              </button>
            </fetcherDelete.Form>
          </DialogContent>
        </Dialog>
      </div >
    </div >
  );
}
