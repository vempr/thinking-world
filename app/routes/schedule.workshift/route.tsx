import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import { WorkshiftForm, workshiftFormResolver } from "../schedule/CalendarSidebar.tsx";
import { WorkshiftDelete, workshiftDeleteResolver } from "../schedule/sidebar_components/WorkShift.tsx";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  // method="delete"
  if (request.method.toLowerCase() === "delete") {
    const { data: formData, errors: formErrors } =
      await getValidatedFormData<WorkshiftDelete>(request, workshiftDeleteResolver);
    if (formErrors) return json({ error: "Invalid formdata", success: false });

    const response = await supabaseClient
      .from("work_shifts")
      .delete()
      .eq("id", formData.id)
      .eq("user_id", user?.id ?? "");
    if (response.error) return json({ error: response.error.message, success: false });
    return json({ error: null, success: true });
  }

  // method="post"
  const { data: formData, errors: formErrors } =
    await getValidatedFormData<WorkshiftForm>(request, workshiftFormResolver);
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
    .select();
  if (error)
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  return json({ error: null, success: true });
}
