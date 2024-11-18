import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { DayPost, dayPostResolver } from "~/types/day.types.ts";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data: formData, errors: formErrors } =
    await getValidatedFormData<DayPost>(request, dayPostResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });
  const { error } = await supabaseClient
    .from("work_days")
    .insert({
      user_id: user!.id,
      work_shift_id: formData.work_shift_id,
      date: formData.date,
    })
  if (error) {
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  }
  return json({ error: null, success: true });
}