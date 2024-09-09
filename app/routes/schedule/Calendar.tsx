import Day from "./calendar_components/Day.tsx";

const getDaysArray = (): number[] => {
  const date = new Date();
  const numberOfDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
  const daysArray: number[] = [];
  for (let i = 0; i < numberOfDays; i++) {
    daysArray.push(i + 1);
  }
  return daysArray;
};

export default function Calendar() {
  const daysArray = getDaysArray();

  return (
    <ul className="flex-1 grid grid-cols-7">
      {daysArray.map((day: number) => {
        return (
          <Day
            key={day}
            day={day}
          />
        );
      })}
    </ul>
  );
}
