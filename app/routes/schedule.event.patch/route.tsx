import { ActionFunctionArgs, json } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { EventPatch, eventPatchResolver } from "../../types/event.types.ts";
import { getValidatedFormData } from "remix-hook-form";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const { data: formData, errors: formErrors } =
    await getValidatedFormData<EventPatch>(request, eventPatchResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });
  const { error } = await supabaseClient
    .from("event_days")
    .update({
      title: formData.title,
      color: formData.color,
      time: formData.time.length ? formData.time : null,
    })
    .eq("id", formData.id);
  if (error) {
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  }
  return json({ error: null, success: true });
}