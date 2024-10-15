import { useFetcher } from "@remix-run/react";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { action } from "~/routes/schedule.work.delete/route";

export default function DeleteForm({ id }: { id: number }) {
  const fetcher = useFetcher<typeof action>();
  useEffect(() => {
    if (fetcher.data?.error && fetcher.state === "loading") {
      toast.error(`Error while deleting work shift: ${fetcher.data.error}`);
    }
  }, [fetcher.state]);

  return (
    <fetcher.Form method="delete" action="/schedule/work/delete" className={`${fetcher.data?.success && "hidden"} ${fetcher.state === "submitting" ? "opacity-0 relative pointer-events-none" : "opacity-100"} flex-1 ${fetcher.state === "submitting" && "cursor-not-allowed"}`}>
      <input type="hidden" name="id" value={id} />
      <button className="w-full h-full bg-red-500 hover:bg-red-600 rounded-br-lg flex items-center justify-center text-white" type="submit">
        <Trash2 size="16" />
      </button>
    </fetcher.Form>
  )
}