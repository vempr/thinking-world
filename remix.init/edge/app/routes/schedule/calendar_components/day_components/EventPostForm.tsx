import { FetcherWithComponents } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import SmallSpinner from "~/components/SmallSpinner.tsx";
import { Input } from "~/components/ui/input.tsx";
import { EventPost, eventPostResolver } from "~/types/event.types";

export default function EventPostForm({ fetcher, date }: {
  fetcher: FetcherWithComponents<{
    error: string;
    success: boolean;
  } | {
    error: null;
    success: boolean;
  }>;
  date: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<EventPost>({
    mode: "onSubmit",
    resolver: eventPostResolver,
    defaultValues: {
      color: "#0ea5e9",
    },
    fetcher,
    submitConfig: {
      action: "/schedule/event/post",
    },
    submitData: {
      date: date,
    },
  });

  return <fetcher.Form
    className="flex flex-col gap-y-3"
    onSubmit={handleSubmit}
    method="post"
    action="/schedule/event/post"
  >
    <div className="flex flex-row gap-x-2">
      <div className="flex-1">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium dark:text-white"
        >
          Title*
        </label>
        <Input
          type="text"
          id="title"
          placeholder="Doctor's Appointment"
          autoComplete="off"
          className="block w-full rounded-lg border-gray-200 px-4 py-4 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-blue-600"
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
          className="w-20 h-10 hover:cursor-pointer rounded-lg border-gray-200 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-blue-600"
          {...register("color")}
        />
        {errors.color && (
          <p className="mt-2 text-xs text-red-500">
            {errors.color.message}
          </p>
        )}
      </div>
    </div>

    <div>
      <label
        htmlFor="time"
        className="mb-2 block text-sm font-medium dark:text-white"
      >
        Time
      </label>
      <Input
        type="time"
        id="time"
        autoComplete="off"
        className="block w-full rounded-lg border-gray-200 px-4 py-4 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-blue-600"
        {...register("time", { required: false })}
      />
      {errors.time && (
        <p className="mt-2 text-xs text-red-500">
          {errors.time.message}
        </p>
      )}
    </div>
    <button
      type="submit"
      disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
      className="flex justify-center items-center w-full rounded-lg border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:bg-sky-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      {(fetcher.state === "submitting" || fetcher.state === "loading") ? <SmallSpinner /> : <p>Add Event</p>}
    </button>
  </fetcher.Form>
}