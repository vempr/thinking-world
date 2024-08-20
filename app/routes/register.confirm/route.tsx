import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (user) return redirect("/schedule", { headers });

  if (token_hash && type) {
    const { error } = await supabaseClient.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect("/schedule", { headers });
    }
  }

  return redirect("/login", { headers });
}
