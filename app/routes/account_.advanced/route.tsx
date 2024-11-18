import { redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { ChevronLeft, LogOut, UserX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog.tsx";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);;
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return redirect("/login", { headers });
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);;
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const formData = await request.formData();
  switch (formData.get("action")) {
    case "logout": {
      await supabaseClient.auth.signOut();
    }
    case "delete": {
      await supabaseClient.auth.admin.deleteUser(user!.id);
    }
  }

  return redirect("/", { headers });
}

export default function Advanced() {
  return <CenteredLayout>
    <div className="flex flex-row gap-x-4">
      <Link to="/account" className="bg-slate-200 dark:bg-neutral-800 rounded-lg flex justify-center items-center px-2 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70" prefetch="intent"><ChevronLeft /></Link>
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="font-title text-4xl">Configure your Account</h1>
          <p className="opacity-80 text-red-600"><span className="font-bold">Log out</span> or <span className="font-bold">delete</span> your Thinking World account</p>
        </div>
        <ul className="flex flex-col gap-y-1">
          <li>
            <Form method="post">
              <input type="hidden" name="action" value="logout" />
              <button type="submit" className="w-full text-left flex flex-row items-center justify-between bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70">
                <div>
                  <h2>Log out your account</h2>
                  <p className="text-sm italic opacity-70">End the login session.</p>
                </div>
                <LogOut />
              </button>
            </Form>
          </li>
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full text-left flex flex-row items-center justify-between border border-red-600 bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70">
                  <div>
                    <h2>Delete your account</h2>
                    <p className="text-sm italic opacity-70">Terminate your account from Thinking World.</p>
                  </div>
                  <UserX />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                  <DialogDescription>
                    Deleting your account is permanent and cannot be undone. Your settings and your calendar entries will be erased.
                  </DialogDescription>
                </DialogHeader>
                <Form method="post">
                  <input type="hidden" name="action" value="delete" />
                  <button type="submit" className="w-full bg-red-600 rounded-lg text-white text-center py-2 text-sm hover:bg-red-700 active:bg-red-800">Delete my account</button>
                </Form>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </div>
    </div>
  </CenteredLayout>
}