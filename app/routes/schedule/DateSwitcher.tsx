import { useSearchParams } from "@remix-run/react";
import { getMonthByJSDateNumber } from "./utils/getMonth";

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
        className="w-8 h-8 text-sm bg-sky-500 hover:bg-sky-600 rounded-full transition-all duration-50 text-white"
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
        {"<"}
      </button>
      <h2 className="text-black dark:text-white text-lg w-52 text-center font-medium">
        {getMonthByJSDateNumber(month)} {year}
      </h2>
      <button
        className="w-8 h-8 text-sm bg-sky-600 hover:bg-sky-700 rounded-full transition-all duration-50 text-white"
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
        {">"}
      </button>
    </div>
  );
}
