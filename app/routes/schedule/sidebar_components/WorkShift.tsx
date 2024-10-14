import invert from "invert-color";
import { Pencil, Trash2 } from "lucide-react";
import { Workshift } from "../CalendarSidebar.tsx";

export default function WorkShift({
  id,
  title,
  color,
  start_time,
  end_time,
}: Workshift) {
  const contrastedColor = invert(color, true);

  return (
    <div
      className="rounded-lg flex flex-row items-center h-16"
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
      <div className="flex flex-col h-16">
        <button className="flex-1 bg-slate-400 hover:bg-slate-500 rounded-tr-lg flex items-center h-10 px-1 text-white">
          <Pencil size="16" />
        </button>
        <button className="flex-1 bg-red-500 hover:bg-red-600 rounded-br-lg flex items-center h-10 px-1 text-white">
          <Trash2 size="16" />
        </button>
      </div>
    </div>
  );
}
