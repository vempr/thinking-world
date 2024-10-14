import { useSearchParams } from "@remix-run/react";
import { getMonthByJSDateNumber } from "./utils/getMonth";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateSwitcher() {
  const date = new Date();
  const [searchParams, setSearchParams] = useSearchParams();
  const year =
    searchParams.get("year") !== null
      ? Number(searchParams.get("year"))
      : date.getFullYear();
  const month =
    searchParams.get("month") !== null
      ? Number(searchParams.get("month"))
      : date.getMonth();

  return (
    <div className="flex flex-row mb-3 items-center justify-center md:justify-normal">
      <button
        className="flex justify-center items-center w-8 h-8 text-sm bg-transparent outline outline-1 outline-neutral-800 dark:outline-white rounded-full hover:opacity-80 active:opacity-50 text-black dark:text-white"
        onClick={() => {
          const params = new URLSearchParams();
          if (month === 0) {
            params.set("year", `${year - 1}`);
            params.set("month", "11");
          } else {
            params.set("year", `${year}`);
            params.set("month", `${month - 1}`);
          }
          setSearchParams(params);
        }}
      >
        <ChevronLeft size={18} />
      </button>
      <h2 className="text-black dark:text-white text-lg w-52 text-center font-light">
        {getMonthByJSDateNumber(month)} {year}
      </h2>
      <button
        className="flex justify-center items-center w-8 h-8 text-sm bg-transparent outline outline-1 outline-neutral-800 dark:outline-white rounded-full hover:opacity-80 active:opacity-50 text-black dark:text-white"
        onClick={() => {
          const params = new URLSearchParams();
          if (month === 11) {
            params.set("year", `${year + 1}`);
            params.set("month", "0");
          } else {
            params.set("year", `${year}`);
            params.set("month", `${month + 1}`);
          }
          setSearchParams(params);
        }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
