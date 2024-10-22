import { useFetcher } from "@remix-run/react";
import invert from "invert-color";
import { GripVertical } from "lucide-react";
import { useDrag } from "react-dnd";
import { WorkshiftFull } from "~/types/work.types.ts";
import { action } from "../schedule.day.post/route.tsx";
import SmallSpinner from "~/components/SmallSpinner.tsx";

type DropResult = { date: string };

export default function DraggableWorkShift({
  id,
  title,
  color,
  start_time,
  end_time,
}: WorkshiftFull) {
  const fetcher = useFetcher<typeof action>();
  const contrastedColor = invert(color, true);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "workshift",
    item: {
      id,
      title,
      color,
      start_time,
      end_time,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();

      if (item && dropResult) {
        console.log(dropResult)
        const formData = new FormData();
        formData.append("work_shift_id", `${item.id}`);
        formData.append("date", `${dropResult.date}`);
        fetcher.submit(formData, {
          method: "post",
          action: "/schedule/day/post"
        });
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
        <span className="font-medium w-24 h-6 overflow-hidden">{title}</span>
      </div>
      <div className="-translate-x-3">
        {fetcher.state === "submitting" && <SmallSpinner />}
      </div>
    </div>
  )
}