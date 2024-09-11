export default function Day({ day }: { day: number | null }) {
  const date = new Date();
  const today = date.getDate();
  const sameDay = today === day;

  return (
    <li className={`border h-24 pr-1 ${sameDay ? "bg-red-200" : "bg-white"}`}>
      {typeof day === "number" && (
        <p className="text-opacity-50 text-right text-black">
          <span
            className={`${sameDay ? "bg-red-600 px-2 text-white rounded-md" : ""}`}
          >
            {day}
          </span>
        </p>
      )}
    </li>
  );
}
