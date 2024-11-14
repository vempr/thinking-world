import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { DayDelete, dayDeleteResolver } from "~/types/day.types.ts";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const { data: formData, errors: formErrors } =
    await getValidatedFormData<DayDelete>(request, dayDeleteResolver);
  if (formErrors) return json({ error: "Invalid formdata", success: false });

  const response = await supabaseClient
    .from("work_days")
    .delete()
    .eq("id", formData.id);
  if (response.error) {
    return json({
      error: "There was an unexpected server error. Please try again later.",
      success: false,
    });
  }
  return json({ error: null, success: true });
}