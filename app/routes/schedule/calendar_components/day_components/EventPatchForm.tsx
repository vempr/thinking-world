import { FetcherWithComponents } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { Spinner } from "~/components/Spinner.tsx";
import { Input } from "~/components/ui/input.tsx";
import { EventPost, eventPostResolver } from "~/types/event.types.ts";
import { EventData } from "../../utils/getDay.ts";

export default function EventPatchForm({ fetcher, eventDay }: {
  fetcher: FetcherWithComponents<{
    error: string;
    success: boolean;
  } | {
    error: null;
    success: boolean;
  }>;
  eventDay: EventData;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<EventPost>({
    mode: "onSubmit",
    resolver: eventPostResolver,
    defaultValues: {
      title: eventDay.title,
      color: eventDay.color,
      time: eventDay.time ?? "",
    },
    fetcher,
    submitConfig: {
      action: "/schedule/event/patch",
    },
    submitData: {
      id: eventDay.id,
    }
  });

  return <fetcher.Form
    className="flex flex-col gap-y-3"
    onSubmit={handleSubmit}
    method="post"
    action="/schedule/event/post"
  >
    <div className="flex flex-row gap-x-1">
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
          placeholder="Football Game"
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
      className="mt-1 h-12 flex justify-center items-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-md font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      {fetcher.state === "submitting" ? <Spinner /> : <p>Save Event</p>}
    </button>
  </fetcher.Form>
}