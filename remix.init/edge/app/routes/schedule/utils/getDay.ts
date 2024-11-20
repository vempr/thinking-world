export type WorkData = {
  id: number;
  date: string;
  work_shift_id: number;
};

export type EventData = {
  id: number;
  date: string;
  title: string;
  time: string | null;
  color: string;
};

export type DayType = {
  date: Date;
  data: {
    workData: WorkData[] | null;
    eventData: EventData[] | null;
  };
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
  data: {
    workDays: WorkData[] | null;
    eventDays?: EventData[] | null;
  },
): (DayType | null)[] => {
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysArray: (DayType | null)[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= numberOfDays; i++) {
    const currentDate = new Date(year, month, i);
    const formattedDate = currentDate.toISOString().split("T")[0];
    const workData = data?.workDays?.filter(
      (day) => day.date === formattedDate,
    );
    const eventData = data?.eventDays?.filter(
      (day) => day.date === formattedDate,
    );

    daysArray.push({
      date: currentDate,
      data: {
        workData: workData || null,
        eventData: eventData || null,
      },
    });
  }
  while (daysArray.length % 42 != 0) {
    daysArray.push(null);
  }

  return daysArray;
};
