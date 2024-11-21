import { json, redirect, type LoaderFunctionArgs } from "@remix-run/deno";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import { MetaFunction } from "@remix-run/deno";

export const meta: MetaFunction = () => {
  return [
    { title: "Your Account | Thinking World" },
    {
      name: "description",
      content: "Configure your Thinking World account: Change your email address, as well as your password. Your account is secured by email confirmations.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return redirect("/login?next=account", { headers });
  return json({ user });
}

export default function Account() {
  const { user } = useLoaderData<typeof loader>();

  return <CenteredLayout>
    <div className="flex flex-col gap-y-4">
      <div>
        <h1 className="font-title text-4xl">Thinking Sanctuary</h1>
        <p className="opacity-80">The place for your account configuration.</p>
      </div>
      <ul className="flex flex-col gap-y-1">
        <li>
          <Link to="/account/email" prefetch="intent" className="flex flex-row items-center justify-between bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70">
            <div>
              <h2>Email connected to this account</h2>
              <p className="text-sm font-bold">{user.email}</p>
            </div>
            <ChevronRight />
          </Link>
        </li>
        <li>
          <Link to="/account/password" prefetch="intent" className="flex flex-row items-center justify-between bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70">
            <div>
              <h2>Your password</h2>
              <p className="text-sm font-bold">**********</p>
            </div>
            <ChevronRight />
          </Link>
        </li>
      </ul>
      <Link to="/account/advanced" prefetch="intent" className="bg-red-600 rounded-lg text-white text-center py-2 text-sm hover:bg-red-700 active:bg-red-800">Account Configuration</Link>
    </div>
  </CenteredLayout>
}