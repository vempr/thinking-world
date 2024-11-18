import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/";
  const headers = new Headers();

  if (token_hash && type) {
    const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);;
    const { error } = await supabaseClient.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect(next, { headers });
    }
  }

  return redirect("/login", { headers });
}
