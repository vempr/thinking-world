import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server";

type RedirectProps = {
  request: Request;
  authenticatedRedirect?: string;
  unauthenticatedRedirect?: string;
  returnEmptyResponse?: boolean;
};

export async function protectRouteAndRedirect({
  request,
  authenticatedRedirect,
  unauthenticatedRedirect,
  returnEmptyResponse = false,
}: RedirectProps) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user) {
    if (authenticatedRedirect) {
      return redirect(authenticatedRedirect, { headers });
    }
    if (returnEmptyResponse) {
      return new Response(null, { headers });
    }
  }

  if (!user) {
    if (unauthenticatedRedirect) {
      return redirect(unauthenticatedRedirect, { headers });
    }
    if (returnEmptyResponse) {
      return new Response(null, { status: 401, headers });
    }
  }
}
