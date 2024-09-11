const weekdayCalendar = new Map();
weekdayCalendar.set(0, 6);
weekdayCalendar.set(1, 1);
weekdayCalendar.set(2, 2);
weekdayCalendar.set(3, 3);
weekdayCalendar.set(4, 4);
weekdayCalendar.set(5, 5);
weekdayCalendar.set(6, 0);

const getFirstDayOfMonth = (): number => {
  const date = new Date();
  date.setDate(1);
  return weekdayCalendar.get(date.getDay());
};

export const getDaysArray = (): (number | null)[] => {
  const date = new Date();
  const numberOfDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = getFirstDayOfMonth();
  const daysArray: (number | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= numberOfDays; i++) {
    daysArray.push(i);
  }
  while (daysArray.length % 7 != 0) {
    daysArray.push(null);
  }

  return daysArray;
};
