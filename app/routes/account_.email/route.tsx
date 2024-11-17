import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return redirect("/", { headers });
  return json({ user });
}

export default function Email() {
  const { user } = useLoaderData<typeof loader>();

  return <CenteredLayout>
    <div className="flex flex-row gap-x-4">
      <Link to="/account" className="bg-slate-200 dark:bg-neutral-800 rounded-lg flex justify-center items-center px-2 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70" prefetch="intent"><ChevronLeft /></Link>
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="font-title text-4xl">Configure your Email</h1>
          <p className="opacity-80">Change the email address set up with your account</p>
        </div>
        <div className="bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4">
          <h2>Email connected to this account</h2>
          <p className="text-sm font-bold">{user.email}</p>
        </div>
        <button className="bg-sky-600 rounded-lg text-center py-2 text-sm text-white hover:bg-sky-700 active:bg-sky-800">Change email address</button>
      </div>
    </div>
  </CenteredLayout>
}