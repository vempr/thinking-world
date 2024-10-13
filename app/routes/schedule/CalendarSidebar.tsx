import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "@remix-run/react";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRemixForm } from "remix-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { action } from "../schedule.workshift/route.tsx";

type CalendarSidebarProps = {
  data:
    | {
        color: string;
        end_time: string;
        start_time: string;
        title: string;
      }[]
    | null;
  error: PostgrestError | null;
};

export function getCoolColor() {
  const coolColors: string[] = [
    "#4287f5",
    "#eb4034",
    "#32a852",
    "#fcba03",
    "#9f2eb9",
    "#f16bc0",
    "#26e4bb",
    "#60acca",
    "#ba9f9d",
    "#907c43",
    "#a20f20",
    "#5f8482",
  ];
  return coolColors[Math.floor(Math.random() * coolColors.length)];
}

const timeRegex = new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$");
const workshiftSchema = z.object({
  title: z.string().min(1, { message: "Title can't be empty" }),
  color: z.string(),
  start_time: z.string().regex(timeRegex, { message: "Invalid starting time" }),
  end_time: z.string().regex(timeRegex, { message: "Invalid ending time" }),
});
export type Workshift = z.infer<typeof workshiftSchema>;
export const workshiftResolver = zodResolver(workshiftSchema);

export default function CalendarSidebar({ data, error }: CalendarSidebarProps) {
  const fetcher = useFetcher<typeof action>();
  const color = getCoolColor();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<Workshift>({
    mode: "onSubmit",
    resolver: workshiftResolver,
    defaultValues: {
      color,
    },
    fetcher,
    submitConfig: {
      action: "/schedule/workshift",
    },
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    if (fetcher.data?.success) setModalOpen(false);
  }, [fetcher.state]);

  console.log(fetcher.data);

  return (
    <div className="bg-black bg-opacity-60 dark:bg-opacity-30 rounded-lg p-4 lg:max-w-72 text-center lg:text-left">
      <div className="flex flex-row gap-x-2 justify-center items-center mb-4">
        <h2 className="font-medium text-xl md:text-3xl text-white">
          Work Shifts
        </h2>
        <Dialog
          defaultOpen={false}
          open={modalOpen}
          onOpenChange={setModalOpen}
        >
          <DialogTrigger asChild>
            <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-black text-center font-bold hover:bg-gray-300">
              +
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new work shift template.</DialogTitle>
              <DialogDescription>
                Create a new template to reuse for multiple days.
              </DialogDescription>
            </DialogHeader>
            <fetcher.Form
              className="flex flex-col gap-y-3"
              onSubmit={handleSubmit}
              method="post"
              action="/schedule/workshift"
            >
              <div className="flex flex-row gap-x-1">
                <div className="flex-1">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm outline outline-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-neutral-600"
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
                  <input
                    type="color"
                    id="color"
                    defaultValue={color}
                    className="block rounded-lg border-gray-200 p-1 w-11 h-11 text-sm outline outline-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-neutral-600"
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
                  <input
                    type="time"
                    id="timeFrom"
                    className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm outline outline-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-neutral-600"
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
                  <input
                    type="time"
                    id="timeTo"
                    className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm outline outline-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-neutral-600"
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

              <button
                type="submit"
                className="mt-1 h-12 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Create new template
              </button>
            </fetcher.Form>
            <DialogFooter>
              {fetcher.data?.error && (
                <p className="my-1 text-xs font-bold text-red-600">
                  {fetcher.data.error.toString()}
                </p>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {data?.length ? (
          <ul>{JSON.stringify(data)}</ul>
        ) : (
          <p className="text-white text-opacity-55">
            You don't have any work shifts! Add a work shift to start tracking
            your income.
          </p>
        )}
      </div>
    </div>
  );
}
