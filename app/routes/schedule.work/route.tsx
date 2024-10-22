import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getValidatedFormData } from "remix-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { TriangleAlert } from "lucide-react";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import { WorkshiftFull, WorkshiftPost, workshiftPostResolver } from "../../types/work.types.ts";
import WorkShift from "./WorkShift.tsx";
import PostForm from "./PostForm.tsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { data, error } = await supabaseClient
    .from("work_shifts")
    .select("id, title, color, start_time, end_time");

  return json({ data, error });
}

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data: formData, errors: formErrors } =
    await getValidatedFormData<WorkshiftPost>(request, workshiftPostResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });
  const { error } = await supabaseClient
    .from("work_shifts")
    .insert({
      user_id: user?.id,
      title: formData.title,
      color: formData.color,
      start_time: formData.start_time,
      end_time: formData.end_time,
    })
  if (error)
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  return json({ error: null, success: true });
}

export default function CalendarSidebar() {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    if (fetcher.data?.success) setModalOpen(false);
  }, [fetcher.state]);

  if (loaderData.error)
    return (<div className="bg-black bg-opacity-60 dark:bg-opacity-30 rounded-lg p-4 lg:w-72 text-center">
      <h2 className="font-medium text-xl md:text-3xl text-white mb-4">
        Work Shifts
      </h2>
      <div className="bg-red-500 rounded-lg flex flex-row pr-3 items-center justify-center text-right text-white">
        <TriangleAlert size="110" className="mr-1 ml-5" />
        <p className="text-sm">Unexpected Error: "{loaderData.error.message}" Please try again later.</p>
      </div>
    </div>);

  return (
    <div className="bg-black bg-opacity-50 dark:bg-opacity-30 rounded-lg p-4 lg:w-72 text-center lg:text-left">
      <div className="flex flex-row gap-x-2 justify-center items-center mb-4">
        <h2 className="font-medium text-xl md:text-3xl text-white">
          Work Shifts
        </h2>
        <Dialog
          defaultOpen={false}
          open={modalOpen}
          onOpenChange={setModalOpen}
        >
          <DialogTrigger asChild>
            <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white text-black text-center font-bold hover:bg-gray-300">
              +
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new work shift template.</DialogTitle>
              <DialogDescription>
                Create a new template to reuse for multiple days.
              </DialogDescription>
            </DialogHeader>
            <PostForm fetcher={fetcher} />
            <DialogFooter>
              {fetcher.data?.error && (
                <p className="my-1 text-xs font-bold text-red-600">
                  {fetcher.data.error.toString()}
                </p>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {loaderData.data?.length ? (
        <ul className="flex flex-col gap-y-1">
          {loaderData.data.map(({ id, title, color, start_time, end_time }: WorkshiftFull) => (
            <WorkShift
              key={id}
              id={id}
              title={title}
              color={color}
              start_time={start_time}
              end_time={end_time}
            />
          ))}
        </ul>
      ) : (
        <p className="text-white text-opacity-55">
          You don't have any work shifts! Add a work shift to start tracking
          your income.
        </p>
      )}
    </div>
  );
}
