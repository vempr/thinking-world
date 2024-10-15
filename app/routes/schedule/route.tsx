import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import Calendar from "./Calendar.tsx";
import DateSwitcher from "./DateSwitcher.tsx";

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

  return json({ days, workShifts, daysError, workShiftsError });
}

export default function Schedule() {
  const data = useLoaderData<typeof loader>();
  const date = new Date();

  return (
    <DefaultLayout>
      <div className="mx-8">
        <div>
          <h1 className="text-2xl md:text-5xl text-black dark:text-white flex flex-row items-center">
            <span className="font-bold">Your Calendar</span>
            <div className="w-0.5 h-8 md:h-12 bg-black dark:bg-white mx-4 md:mx-6 rounded-md"></div>
            <span className="tracking-wide dark:opacity-70 font-light">
              {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
            </span>
          </h1>
        </div>
        <div className="my-4">
          <DateSwitcher />
          <div className="flex flex-col-reverse gap-y-4 gap-x-6 lg:flex-row max-w-full justify-center">
            <Calendar
              data={data.days}
              error={data.daysError}
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
