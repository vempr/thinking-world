import { useFetcher } from "@remix-run/react";
import invert from "invert-color";
import { GripVertical } from "lucide-react";
import { useDrag } from "react-dnd";
import { action } from "../schedule.day.post/route.tsx";
import SmallSpinner from "~/components/SmallSpinner.tsx";
import { toast } from "sonner";

type DropResult = { date: string };

export default function DraggableWorkShift({
  id,
  title,
  color,
}: {
  id: number;
  title: string;
  color: string;
}) {
  const fetcher = useFetcher<typeof action>();
  const contrastedColor = invert(color, true);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "workshift",
    item: {
      id,
      title,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();

      if (item && dropResult) {
        const formData = new FormData();
        formData.append("work_shift_id", `${item.id}`);
        formData.append("date", `${dropResult.date}`);
        fetcher.submit(formData, {
          method: "post",
          action: "/schedule/day/post"
        });
        if (fetcher.data?.error) toast.error(fetcher.data.error);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={drag} className="flex justify-between p-1 rounded-md hover:cursor-grab active:cursor-grabbing" style={{
      backgroundColor: color,
      color: contrastedColor,
      opacity: isDragging ? "0.5" : "1",
    }}>
      <div className="flex items-center">
        <GripVertical size={16} style={{
          color: contrastedColor,
        }} />
        <span className="font-medium w-24 h-6 overflow-hidden text-sm flex items-center">{title}</span>
      </div>
      <div className="-translate-x-3">
        {fetcher.state === "submitting" && <SmallSpinner />}
      </div>
    </div>
  )
}