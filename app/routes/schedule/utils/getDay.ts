export type DayData = {
  id: number;
  date: string;
  user_id: string;
  work_shift_id: number;
};

export type DayType = {
  date: Date;
  data: DayData[] | null;
};

const weekdayCalendar = new Map();
weekdayCalendar.set(0, 6);
weekdayCalendar.set(1, 0);
weekdayCalendar.set(2, 1);
weekdayCalendar.set(3, 2);
weekdayCalendar.set(4, 3);
weekdayCalendar.set(5, 4);
weekdayCalendar.set(6, 5);

const getFirstDayOfMonth = (year: number, month: number): number => {
  const date = new Date(year, month);
  date.setDate(1);
  return weekdayCalendar.get(date.getDay());
};

export const getDaysArray = (
  year: number,
  month: number,
  data:
    | {
        id: number;
        date: string;
        optional_description: string | null;
        user_id: string;
        work_shift_id: number;
      }[]
    | null,
): (DayType | null)[] => {
  const numberOfDays = new Date(year, month, 0).getDate();
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysArray: (DayType | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= numberOfDays; i++) {
    const currentDate = new Date(year, month, i);
    const formattedDate = currentDate.toISOString().split("T")[0];
    const dayData = data?.filter((day) => day.date === formattedDate);

    daysArray.push({
      date: currentDate,
      data: dayData || null,
    });
  }
  while (daysArray.length % 7 != 0) {
    daysArray.push(null);
  }

  return daysArray;
};
