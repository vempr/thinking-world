import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ArrowDown, MousePointerClick, Redo } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Thinking World" },
    {
      name: "description",
      content: "A lightweight and minimalistic web calendar to help you calculate your salary. Simply create an account and use Thinking World across all of your devices!",
    },
  ];
};

export default function Index() {
  return <div className="bg-gray-100/30 dark:bg-neutral-900">
    <div className="text-center lg:text-left flex flex-col lg:flex-row justify-center items-center gap-x-8 gap-y-4 h-[35vh] lg:h-[60vh]">
      <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        <span className="block">A minimalistic and</span><span className="block">lightweight calendar app.</span>
        <p className="font-sans text-sm opacity-70 italic">Designed to help you calculate your salary.</p>
      </h1>
      <div className="h-40 w-40 bg-neutral-800 dark:bg-white rounded-lg shadow-xl shadow-sky-500/30 flex justify-center items-center">
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 w-10 bg-sky-500 rounded-md"></div>
          <div className="h-10 w-10 bg-sky-500 rounded-md"></div>
          <div className="h-10 w-10 bg-orange-500 rounded-md"></div>
          <div className="h-10 w-10 bg-red-500 rounded-md"></div>
          <div className="h-10 w-10 bg-sky-500 rounded-md"></div>
          <div className="h-10 w-10 bg-sky-500 rounded-md"></div>
          <div className="h-10 w-10 bg-sky-500 rounded-md"></div>
          <div className="h-10 w-10 bg-green-500 rounded-md"></div>
          <div className="h-10 w-10 bg-sky-500 rounded-md"></div>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center flex-col lg:flex-row gap-x-4 gap-y-4 lg:h-[60vh]">
      <div className="text-center lg:text-left flex flex-col justify-center items-center gap-y-6">
        <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <span className="block">Simply <span className="text-sky-500">drag and drop</span> your</span><span className="block">work shift templates...</span>
        </h1>
        <div className="h-40 w-96 bg-neutral-500 dark:bg-neutral-800 rounded-lg shadow-md shadow-sky-500/30 flex justify-center items-center relative">
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 w-40 bg-sky-500 rounded-md"></div>
            <div className="h-8 w-40 bg-purple-500 rounded-md border outline-white outline-dashed"></div>
            <MousePointerClick size={40} className="absolute right-8 bottom-17 text-white" />
            <div className="h-8 w-40 bg-orange-500 rounded-md"></div>
          </div>
        </div>
      </div>
      <Redo size={64} className="-translate-x-3 translate-y-10 hidden lg:block" />
      <ArrowDown size={64} className="block lg:hidden" />
      <div className="text-center lg:text-left flex flex-col justify-center items-center gap-y-6">
        <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <span className="block">And <span className="text-sky-500">Thinking World</span> will</span><span className="block">do all the heavy lifting...</span>
        </h1>
        <div className="h-40 w-96 bg-neutral-500 dark:bg-neutral-800 rounded-lg shadow-md shadow-sky-500/30 flex justify-center items-center">
          <div className="my-3 w-full overflow-y-auto text-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="m-0 p-0 even:bg-muted">
                  <th className="px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Work Shift{" "}
                  </th>
                  <th className="px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Hours Worked
                  </th>
                  <th className="px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Salary{"    "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="m-0 p-0">
                  <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Babysitting
                  </td>
                  <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    2.0
                  </td>
                  <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    30.00
                  </td>
                </tr>
                <tr className="m-0 p-0">
                  <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Cashier
                  </td>
                  <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    20.0
                  </td>
                  <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    280.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center lg:text-left flex flex-col justify-center items-center gap-y-4 h-[25vh] lg:h-[40vh]">
      <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        What are you waiting for?
        <p className="font-sans text-base opacity-80">Try Thinking World out!</p>
      </h1>
      <Link to="/schedule/work" className="w-80 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-lg py-4 font-title text-xl text-white text-center" prefetch="render">
        View my Work Schedule
      </Link>
    </div>
  </div>;
}
