import { ActionFunctionArgs, json } from "@remix-run/deno";
import { getValidatedFormData } from "remix-hook-form";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { EventDelete, eventDeleteResolver } from "~/types/event.types.ts";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const { data: formData, errors: formErrors } =
    await getValidatedFormData<EventDelete>(request, eventDeleteResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });
  const { error } = await supabaseClient
    .from("event_days")
    .delete()
    .eq("id", formData.id)
  if (error) {
    (error)
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  }
  return json({ error: null, success: true });
}