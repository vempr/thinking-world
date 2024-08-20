import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { DefaultLayout } from "~/components/wrappers/DefaultLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return redirect("/", { headers });
  return new Response(null, { headers });
}

export default function Schedule() {
  return (
    <DefaultLayout>
      <p>welcome to protected route poggers</p>
      <form
        action="/sign-out"
        method="post"
      >
        <button type="submit">Sign Out</button>
      </form>
    </DefaultLayout>
  );
}
