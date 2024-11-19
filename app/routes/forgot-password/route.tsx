import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SmallSpinner from "~/components/SmallSpinner.tsx";
import { Input } from "~/components/ui/input.tsx";
import { LandingLayout } from "~/components/wrappers/LandingLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server";

const emailRegex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email"),
})
type EmailArgs = z.infer<typeof emailSchema>;
const resolver = zodResolver(emailSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user) {
    return redirect("/schedule/work", { headers });
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const { data: formData, errors } = await getValidatedFormData<EmailArgs>(
    request,
    resolver,
  );
  if (errors) return json({ error: "Invalid formdata", success: false, message: null });
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);
  const { error } = await supabaseClient.auth.resetPasswordForEmail(formData.email);
  if (error) return json({ error: error.message, success: false, message: null });
  return json({ error: null, message: "Instructions have been sent to your inbox!", success: true });
}

export default function ForgotPassword() {
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
      email: "",
    },
    fetcher,
  });

  useEffect(() => {
    if (fetcher.data) reset();
    if (fetcher.data?.success === true) toast.info(fetcher.data.message);
    if (fetcher.data?.success === false) toast.error(fetcher.data.error);
  }, [fetcher.data]);

  return (
    <LandingLayout>
      <h1 className="font-title text-black dark:text-white text-xl sm:text-3xl lg:text-5xl mb-4">
        Reset Password
      </h1>
      <fetcher.Form method="post" onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="w-64 sm:w-80">
          <label
            htmlFor="input-label"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Email
          </label>
          <Input
            type="email"
            id="input-label"
            className="block w-full rounded-lg border-gray-200 px-4 py-4 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-blue-600"
            placeholder="you@example.com"
            autoComplete="off"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <p className="w-80 opacity-80 italic text-sm my-2">In order to reset your password, please provide <span className="text-sky-500">your email address</span>. An email with instructions will be in your inbox.</p>
        <button
          disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
          type="submit"
          className="flex justify-center items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {(fetcher.state === "submitting" || fetcher.state === "loading") ? <SmallSpinner /> : "Send Instructions"}
        </button>
      </fetcher.Form>
      <div className="mt-4">
        <p className="text-xs text-black sm:text-sm dark:text-white">
          If you know your password,{" "}
          <Link
            className="text-blue-400 underline hover:text-blue-500"
            to="/login"
          >
            login here
          </Link>
          .
        </p>
      </div>
    </LandingLayout>
  )
}