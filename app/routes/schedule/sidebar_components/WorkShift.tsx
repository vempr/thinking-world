import invert from "invert-color";
import { Pencil, Trash2 } from "lucide-react";

type WorkshiftProps = {
  title: string;
  color: string;
  start_time: string;
  end_time: string;
};

export default function WorkShift({
  title,
  color,
  start_time,
  end_time,
}: WorkshiftProps) {
  const contrastedColor = invert(color, true);

  return (
    <div
      className="rounded-lg pt-2 flex flex-col gap-y-1"
      style={{
        backgroundColor: color,
        color: contrastedColor,
      }}
    >
      <div className="flex-1 flex flex-row justify-between px-2 pb-2">
        <p className="font-medium">{title}</p>
        <div className="flex flex-row gap-x-2 font-light text-sm text-right">
          <div>
            <p>{start_time}</p>
            <p>{end_time}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <button className="flex-1 bg-slate-400 hover:bg-slate-500 transition-colors rounded-bl-lg flex justify-center py-1">
          <Pencil size="18" />
        </button>
        <button className="flex-1 bg-red-500 hover:bg-red-600 transition-colors rounded-br-lg flex justify-center py-1">
          <Trash2 size="18" />
        </button>
      </div>
    </div>
  );
}
