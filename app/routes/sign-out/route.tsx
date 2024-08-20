import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return redirect("/", { headers });
  await supabaseClient.auth.signOut();
  return redirect("/", { headers });
}
