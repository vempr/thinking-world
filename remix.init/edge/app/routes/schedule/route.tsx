import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import Calendar from "./Calendar.tsx";
import DateSwitcher from "./DateSwitcher.tsx";
import { Calendar as CalendarIcon } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Insights from "./Insights.tsx";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Your Schedule | Thinking World" },
    {
      name: "description",
      content: "View your Thinking World work schedule and conveniently make changes to your calendar. Add work shifts and events.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login", { headers });
  }
  if (request.url.endsWith("/schedule") || request.url.endsWith("/schedule/")) {
    return redirect("/schedule/work");
  }

  const { data: workDays, error: daysError } = await supabaseClient
    .from("work_days")
    .select("id, date, work_shift_id");
  const { data: workShifts, error: workShiftsError } = await supabaseClient
    .from("work_shifts")
    .select("id, title, color, start_time, end_time, pay, is_hourly_pay");
  const { data: eventDays, error: eventDaysError } = await supabaseClient
    .from("event_days")
    .select("id, date, title, time, color");

  return json({
    data: {
      workDays,
      workShifts,
      eventDays,
    },
    errors: {
      daysError,
      workShiftsError,
      eventDaysError,
    }
  });
}

export default function Schedule() {
  const loaderData = useLoaderData<typeof loader>();
  const date = new Date();

  return (
    <DefaultLayout>
      <div className="mx-4 lg:mx-8">
        <div>
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl text-black dark:text-white flex flex-row items-center gap-x-2 md:gap-x-5 justify-normal ">
            <span className="font-title">Your Schedule</span>
            <CalendarIcon size="48" className="hidden sm:block size-6 md:size-12 text-sky-500" />
            <span className="tracking-tighter font-date text-sky-500">
              {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
            </span>
          </h1>
        </div>
        <div className="my-4 flex flex-col gap-y-8">
          <div>
            <DateSwitcher />
            <DndProvider backend={HTML5Backend}>
              <div className="flex flex-col-reverse gap-y-4 gap-x-6 lg:flex-row max-w-full justify-center">
                <Calendar
                  data={loaderData.data}
                  errors={loaderData.errors}
                />
                <Outlet />
              </div>
            </DndProvider>
          </div>
          <Insights data={{
            days: loaderData.data.workDays,
            workShifts: loaderData.data.workShifts,
          }} />
        </div>
      </div>
    </DefaultLayout>
  );
}
