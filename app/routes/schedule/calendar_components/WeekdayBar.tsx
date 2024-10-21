export default function WeekdayBar() {
  return (
    <ul className="flex-1 grid grid-cols-7 text-white dark:text-neutral-700 dark:font-bold">
      <li className="h-8 bg-blue-500 flex items-center justify-center rounded-tl-lg dark:bg-transparent dark:border dark:border-r-0">
        <p className="text-center">Mon</p>
      </li>
      <li className="h-8 bg-blue-500 flex items-center justify-center dark:bg-transparent dark:border dark:border-l-0 dark:border-r-0">
        <p className="text-center">Tue</p>
      </li>
      <li className="h-8 bg-blue-500 flex items-center justify-center dark:bg-transparent dark:border dark:border-l-0 dark:border-r-0">
        <p className="text-center">Wed</p>
      </li>
      <li className="h-8 bg-blue-500 flex items-center justify-center dark:bg-transparent dark:border dark:border-l-0 dark:border-r-0">
        <p className="text-center">Thu</p>
      </li>
      <li className="h-8 bg-blue-500 flex items-center justify-center dark:bg-transparent dark:border dark:border-l-0 dark:border-r-0">
        <p className="text-center">Fri</p>
      </li>
      <li className="h-8 bg-blue-500 flex items-center justify-center dark:bg-transparent dark:border dark:border-l-0 dark:border-r-0">
        <p className="text-center">Sat</p>
      </li>
      <li className="h-8 bg-blue-500 flex items-center justify-center rounded-tr-lg dark:bg-transparent dark:border dark:border-l-0 dark:border-r-0">
        <p className="text-center">Sun</p>
      </li>
    </ul>
  );
}
