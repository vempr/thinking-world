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
        className="w-8 h-8 text-sm hs-dark-mode-active:bg-white rounded-full hs-dark-mode-active:hover:bg-slate-200 transition-all duration-50 bg-black bg-opacity-60 text-white hs-dark-mode-active:text-black hover:bg-opacity-70"
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
      <h2 className="text-black hs-dark-mode-active:text-white text-lg w-52 text-center font-medium">
        {getMonthByJSDateNumber(month)} {year}
      </h2>
      <button
        className="w-8 h-8 text-sm hs-dark-mode-active:bg-white rounded-full hs-dark-mode-active:hover:bg-slate-200 transition-all duration-50 bg-black bg-opacity-60 text-white hs-dark-mode-active:text-black hover:bg-opacity-70"
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
