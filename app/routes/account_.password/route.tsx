import { json, type LoaderFunctionArgs, redirect, type ActionFunctionArgs, MetaFunction } from "@remix-run/deno";
import { Link, useFetcher } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import SmallSpinner from "~/components/SmallSpinner";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";

export const meta: MetaFunction = () => {
  return [
    { title: "Configure Password | Thinking World" },
    {
      name: "description",
      content: "Configure your Thinking World account: Change your Thinking World account's password. Confirm the password reset with instructions sent to your inbox.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return redirect("/login?next=account", { headers });
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { error } = await supabaseClient.auth.resetPasswordForEmail(user!.email!);
  if (error) return json({ error: error.message, success: false, message: null });
  return json({ error: null, message: "Instructions have been sent to your inbox!", success: true });
}

export default function Password() {
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.data?.success === true) toast.info(fetcher.data.message);
    if (fetcher.data?.success === false) toast.error(fetcher.data.error);
  }, [fetcher.data]);

  return <CenteredLayout>
    <div className="flex flex-row gap-x-4 mx-4">
      <Link to="/account" className="bg-slate-200 dark:bg-neutral-800 rounded-lg flex justify-center items-center px-2 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70" prefetch="intent"><ChevronLeft /></Link>
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="font-title text-2xl sm:text-4xl">Configure your Password</h1>
          <p className="opacity-80 text-sm sm:text-base">Change the password set up with your account</p>
        </div>
        <div className="bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4">
          <h2>Your password</h2>
          <p className="text-sm font-bold">************</p>
        </div>
        <fetcher.Form method="post">
          <button
            disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
            type="submit"
            className="flex justify-center items-center w-full rounded-lg border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:bg-sky-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            {(fetcher.state === "submitting" || fetcher.state === "loading") ? <SmallSpinner /> : "Update Password"}
          </button>
        </fetcher.Form>
        <p className="text-sm italic opacity-70">Passwords are never shown due to security concerns.</p>
      </div>
    </div>
  </CenteredLayout>
}