import { ActionFunctionArgs, json, type LoaderFunctionArgs, redirect } from "@remix-run/deno";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from "~/components/ui/dialog.tsx";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import { z } from "zod";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input.tsx";
import SmallSpinner from "~/components/SmallSpinner.tsx";
import { useEffect } from "react";
import { toast } from "sonner";
import { MetaFunction } from "@remix-run/deno";

const emailRegex =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
const emailSchema = z.object({
  newEmail: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email"),
});
const resolver = zodResolver(emailSchema);
type EmailArgs = z.infer<typeof emailSchema>;

export const meta: MetaFunction = () => {
  return [
    { title: "Configure Email | Thinking World" },
    {
      name: "description",
      content: "Configure your Thinking World account: View the email address linked to your Thinking World account and change it. Confirm the email address change with instructions sent to your inbox.",
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

export async function action({ request }: ActionFunctionArgs) {
  const { data: formData, errors } = await getValidatedFormData<EmailArgs>(
    request,
    resolver,
  );
  if (errors) return json({ error: "Invalid formdata", success: false, message: null });

  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const { error } = await supabaseClient.auth.updateUser({ email: formData.newEmail });
  if (error) return json({ error: error.message, success: false, message: null });
  return json({ error: null, message: "Instructions have been sent to your inbox!", success: true });
}

export default function Email() {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useRemixForm<EmailArgs>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      newEmail: "",
    },
    fetcher,
  });

  useEffect(() => {
    if (fetcher.data?.success === true) {
      reset();
      toast.info(fetcher.data.message);
    }
    if (fetcher.data?.success === false) toast.error(fetcher.data.error);
  }, [fetcher.data]);

  return <CenteredLayout>
    <div className="flex flex-row gap-x-4 mx-4">
      <Link to="/account" className="bg-slate-200 dark:bg-neutral-800 rounded-lg flex justify-center items-center px-2 hover:bg-slate-300 active:bg-slate-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800/70" prefetch="intent"><ChevronLeft /></Link>
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="font-title text-2xl sm:text-4xl">Configure your Email</h1>
          <p className="opacity-80 text-sm sm:text-base">Change the email address set up with your account</p>
        </div>
        <div className="bg-slate-200 dark:bg-neutral-800 rounded-lg py-3 px-4">
          <h2>Email connected to this account</h2>
          <p className="text-sm font-bold">{user.email}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-sky-600 rounded-lg text-center py-2 text-sm text-white hover:bg-sky-700 active:bg-sky-800">Change email address</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change your email address</DialogTitle>
              <DialogDescription>
                Enter your new email address here.
              </DialogDescription>
            </DialogHeader>
            <fetcher.Form method="post" onSubmit={handleSubmit} className="flex flex-col gap-y-2">
              <div>
                <label
                  htmlFor="input-label"
                  className="mb-2 block text-sm font-medium dark:text-white"
                >
                  New Email Address
                </label>
                <Input
                  type="email"
                  id="input-label"
                  className="block w-full rounded-lg border-gray-200 px-4 py-4 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-blue-600"
                  placeholder="you@example.com"
                  autoComplete="off"
                  {...register("newEmail")}
                />
                {errors.newEmail && (
                  <p className="mt-2 text-xs text-red-500">{errors.newEmail.message}</p>
                )}
              </div>
              <p className="text-sm italic opacity-70">You will have to follow the instructions sent to both emails' inboxes.</p>
              <button
                disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
                type="submit"
                className="flex justify-center items-center w-full rounded-lg border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:bg-sky-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                {(fetcher.state === "submitting" || fetcher.state === "loading") ? <SmallSpinner /> : "Send Instructions"}
              </button>
            </fetcher.Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </CenteredLayout>
}