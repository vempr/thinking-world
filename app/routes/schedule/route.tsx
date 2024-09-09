import { type LoaderFunctionArgs } from "@remix-run/node";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout.tsx";
import { protectRouteAndRedirect } from "~/helpers/protectRouteAndRedirect";
import Calendar from "./Calendar.tsx";
import CalendarSidebar from "./CalendarSidebar.tsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const result = await protectRouteAndRedirect({
    request,
    unauthenticatedRedirect: "/login",
    returnEmptyResponse: true,
  });

  return result;
}

export default function Schedule() {
  return (
    <DefaultLayout>
      <div className="mx-8">
        <div className="mb-6">
          <h1 className="text-5xl text-white font-bold">Your Calendar</h1>
        </div>
        <div className="flex justify-between gap-x-8">
          <Calendar />
          <CalendarSidebar />
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
