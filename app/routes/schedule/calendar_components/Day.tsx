export default function Day({ day }: { day: number }) {
  const date = new Date();
  const today = date.getDate();

  return (
    <li
      className={`bg-white border border-black h-24 w-full text-black rounded-md pr-1 text-opacity-50 text-right ${today === day && "bg-sky-300"}`}
    >
      {day}
    </li>
  );
}
