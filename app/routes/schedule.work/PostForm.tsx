import { FetcherWithComponents } from "@remix-run/react";
import { Banknote, Clock } from "lucide-react";
import { useRemixForm } from "remix-hook-form";
import { Spinner } from "~/components/Spinner.tsx";
import { Input } from "~/components/ui/input.tsx";
import { WorkshiftPost, workshiftPostResolver } from "~/types/work.types";

function getCoolColor() {
  const coolColors: string[] = [
    "#66FF00",
    "#1974D2",
    "#08E8DE",
    "#FFF000",
    "#FF007F",
    "#f16bc0",
    "#26e4bb",
    "#a20f20",
  ];
  return coolColors[Math.floor(Math.random() * coolColors.length)];
}

export default function PostForm({ fetcher }: {
  fetcher: FetcherWithComponents<{
    error: string;
    success: boolean;
  } | {
    error: null;
    success: boolean;
  }>
}) {
  const color = getCoolColor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useRemixForm<WorkshiftPost>({
    mode: "onSubmit",
    resolver: workshiftPostResolver,
    defaultValues: {
      color,
      is_hourly_pay: true,
    },
    fetcher,
    submitConfig: {
      action: "/schedule/work",
    },
  });
  const watchIsHourlyPay = watch("is_hourly_pay");

  return <fetcher.Form
    className="flex flex-col gap-y-3"
    onSubmit={handleSubmit}
    method="post"
    action="/schedule/work"
  >
    <div className="flex flex-row gap-x-1">
      <div className="flex-1">
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
      disabled={fetcher.state === "submitting"}
      className="mt-1 h-12 flex justify-center items-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-md font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      {fetcher.state === "submitting" ? <Spinner /> : <p>Create new template</p>}
    </button>
  </fetcher.Form>
}