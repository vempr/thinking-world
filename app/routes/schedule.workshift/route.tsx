import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import { Workshift, workshiftResolver } from "../schedule/CalendarSidebar.tsx";

export async function action({ request }: ActionFunctionArgs) {
  const { data: formData, errors: formErrors } =
    await getValidatedFormData<Workshift>(request, workshiftResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });

  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  const { error } = await supabaseClient
    .from("work_shifts")
    .insert({
      user_id: user?.id,
      title: formData.title,
      color: formData.color,
      start_time: formData.start_time,
      end_time: formData.end_time,
    })
    .select();
  if (error)
    return json({
      error: "Server error encountered, please try again later.",
      success: false,
    });

  return json({ error: null, success: true });
}
