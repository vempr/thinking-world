import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { Database } from "~/types/database.types";

export const createSupabaseServerClient = (request: Request) => {
  const headers = new Headers();

  const supabaseClient = createServerClient<Database>(
    process.env.VITE_SUPABASE_URL as string,
    process.env.VITE_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );

  return { supabaseClient, headers };
};
