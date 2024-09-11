const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Bar({ weekday }: { weekday: string }) {
  return (
    <li className="h-8 bg-blue-500 flex items-center justify-center">
      <p className="text-center text-white">{weekday}</p>
    </li>
  );
}

export default function WeekdayBar() {
  return (
    <ul className="flex-1 grid grid-cols-7">
      {weekdays.map((day: string) => {
        return (
          <Bar
            weekday={day}
            key={day}
          />
        );
      })}
    </ul>
  );
}
