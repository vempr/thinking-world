import invert from "invert-color";
import { Pencil, Trash2 } from "lucide-react";
import { Workshift } from "../CalendarSidebar.tsx";
import { useFetcher } from "@remix-run/react";
import { action } from "~/routes/schedule.workshift/route.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";

const workshiftDeleteSchema = z.object({
  id: z.number()
});
export const workshiftDeleteResolver = zodResolver(workshiftDeleteSchema);
export type WorkshiftDelete = z.infer<typeof workshiftDeleteSchema>;

export default function WorkShift({
  id,
  title,
  color,
  start_time,
  end_time,
}: Workshift) {
  const contrastedColor = invert(color, true);
  const fetcher = useFetcher<typeof action>();
  useEffect(() => {
    if (fetcher.data?.error && fetcher.state === "loading") {
      toast.error(`Error while deleting work shift: ${fetcher.data.error}`);
    }
  }, [fetcher.state]);

  return (
    <div
      className={`${fetcher.data?.success && "hidden"} ${fetcher.state === "submitting" ? "opacity-0 relative" : "opacity-100"}
      transition-opacity duration-100 ease-in-out rounded-lg flex flex-row items-center h-16`}
      style={{
        backgroundColor: color,
        color: contrastedColor,
      }}
    >
      <div className="flex-1 flex flex-row justify-between p-3">
        <p className="font-medium">{title}</p>
        <div className="flex flex-row gap-x-1.5 font-light text-sm text-right items-center">
          <div>
            <p>{start_time}</p>
            <p>{end_time}</p>
          </div>
          <div
            className="border-r-4 rounded-lg opacity-40 h-10"
            style={{ borderColor: contrastedColor }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col h-16 w-7">
        <button className="flex-1 bg-slate-400 hover:bg-slate-500 rounded-tr-lg flex items-center justify-center text-white">
          <Pencil size="16" />
        </button>
        <fetcher.Form method="delete" action="/schedule/workshift" className="flex-1">
          <input type="hidden" name="id" value={id} />
          <button className="w-full h-full bg-red-500 hover:bg-red-600 rounded-br-lg flex items-center justify-center text-white" type="submit">
            <Trash2 size="16" />
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
