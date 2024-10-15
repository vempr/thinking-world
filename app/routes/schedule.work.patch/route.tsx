import { ActionFunctionArgs, json } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { WorkshiftPatch, workshiftPatchResolver } from "../schedule.work/types";
import { getValidatedFormData } from "remix-hook-form";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data: formData, errors: formErrors } =
    await getValidatedFormData<WorkshiftPatch>(request, workshiftPatchResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });
  const { error } = await supabaseClient
    .from("work_shifts")
    .update({
      title: formData.title,
      color: formData.color,
      start_time: formData.start_time,
      end_time: formData.end_time,
    })
    .eq("id", formData.id)
    .eq("user_id", user?.id ?? "");
  if (error)
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  return json({ error: null, success: true });
}