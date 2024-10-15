import { ActionFunctionArgs, json } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server";
import { WorkshiftDelete, workshiftDeleteResolver } from "../schedule.work/types";
import { getValidatedFormData } from "remix-hook-form";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

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