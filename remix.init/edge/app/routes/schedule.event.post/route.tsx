import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { EventFull, eventFullResolver } from "~/types/event.types.ts";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data: formData, errors: formErrors } =
    await getValidatedFormData<EventFull>(request, eventFullResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });
  const { error } = await supabaseClient
    .from("event_days")
    .insert({
      user_id: user!.id,
      date: formData.date,
      title: formData.title,
      time: formData.time.length ? formData.time : null,
      color: formData.color,
    })
  if (error) {
    (error)
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  }
  return json({ error: null, success: true });
}