import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import Calendar from "./Calendar.tsx";
import DateSwitcher from "./DateSwitcher.tsx";
import { Calendar as CalendarIcon } from "lucide-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/login", { headers });
  }
  if (request.url.endsWith("/schedule") || request.url.endsWith("/schedule/")) {
    return redirect("/schedule/work");
  }

  const { data: days, error: daysError } = await supabaseClient
    .from("days")
    .select()
    .eq("user_id", user.id);
  const { data: workShifts, error: workShiftsError } = await supabaseClient
    .from("work_shifts")
    .select("id, title, color, start_time, end_time")
    .eq("user_id", user.id);

  return json({
    data: {
      days,
      workShifts,
    },
    errors: {
      daysError,
      workShiftsError
    }
  });
}

export default function Schedule() {
  const loaderData = useLoaderData<typeof loader>();
  const date = new Date();

  return (
    <DefaultLayout>
      <div className="mx-8">
        <div>
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl text-black dark:text-white flex flex-row items-center justify-between gap-x-2 md:gap-x-5 sm:justify-normal">
            <span className="font-title">Your Schedule</span>
            <CalendarIcon size="48" className="opacity-70 size-6 md:size-12" />
            <span className="tracking-wide opacity-70 font-light">
              {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
            </span>
          </h1>
        </div>
        <div className="my-4">
          <DateSwitcher />
          <div className="flex flex-col-reverse gap-y-4 gap-x-6 lg:flex-row max-w-full justify-center">
            <Calendar
              data={loaderData.data}
              errors={loaderData.errors}
            />
            <Outlet />
          </div>
        </div>
        <form
          action="/sign-out"
          method="post"
        >
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </DefaultLayout>
  );
}
