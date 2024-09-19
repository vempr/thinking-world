import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import Calendar from "./Calendar.tsx";
import CalendarSidebar from "./CalendarSidebar.tsx";
import DateSwitcher from "./DateSwitcher.tsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    return redirect("/", { headers });
  }
}

export default function Schedule() {
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
            <Calendar />
            <CalendarSidebar />
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
