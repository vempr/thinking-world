import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/deno";
import { useFetcher, useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SmallSpinner from "~/components/SmallSpinner.tsx";
import { Input } from "~/components/ui/input.tsx";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Update Password | Thinking World" },
    {
      name: "description",
      content: "Update your Thinking World account password: A lightweight and minimalistic web calendar to help you calculate your salary.",
    },
  ];
};

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords do not match",
    path: ["newPasswordConfirm"],
  });
type PasswordArgs = z.infer<typeof passwordSchema>;
const resolver = zodResolver(passwordSchema);

export async function action({ request }: ActionFunctionArgs) {
  const { data: formData, errors } = await getValidatedFormData<PasswordArgs>(
    request,
    resolver,
  );
  if (errors) return json({ error: "Invalid formdata", success: false, message: null });
  const { supabaseClient } = createSupabaseServerClient(request, request.headers);
  const { error } = await supabaseClient.auth.updateUser({ password: formData.newPassword })
  if (error) {
    console.log(error);
    return json({ error: error.message, success: false, message: null });
  }
  return json({ error: null, message: "Your password has been updated!", success: true });
}

export default function ForgotPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useRemixForm<PasswordArgs>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    fetcher,
  });

  useEffect(() => {
    if (fetcher.data) reset();
    if (fetcher.data?.success === true) {
      toast.info(fetcher.data.message, {
        description: "You will be redirected to the account page",
      });
      setTimeout(() => {
        navigate("/account");
      }, 2000);
    }
    if (fetcher.data?.success === false) toast.error(fetcher.data.error);
  }, [fetcher.data]);

  return (
    <CenteredLayout>
      <h1 className="font-title text-black dark:text-white text-xl sm:text-3xl lg:text-5xl mb-4">
        Update Password
      </h1>
      <fetcher.Form method="post" onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="w-64 sm:w-80">
          <label className="mb-2 block text-sm dark:text-white">Password</label>
          <div className="relative">
            <Input
              type={searchParams.get("showPassword") ? "text" : "password"}
              className="block w-full rounded-lg border-gray-200 py-3 pe-10 ps-4 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-sky-600"
              placeholder="**********"
              autoComplete="off"
              {...register("newPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-blue-600 focus:outline-none dark:text-neutral-600 dark:focus:text-blue-500"
              onClick={() => {
                if (searchParams.get("showPassword")) {
                  searchParams.delete("showPassword");
                  setSearchParams(searchParams, {
                    preventScrollReset: true,
                  });
                } else {
                  const params = new URLSearchParams();
                  params.set("showPassword", "true");
                  setSearchParams(params, {
                    preventScrollReset: true,
                  });
                }
              }}
            >
              <svg
                className="size-3.5 shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="hs-password-active:hidden"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                ></path>
                <path
                  className="hs-password-active:hidden"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                ></path>
                <path
                  className="hs-password-active:hidden"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                ></path>
                <line
                  className="hs-password-active:hidden"
                  x1="2"
                  x2="22"
                  y1="2"
                  y2="22"
                ></line>
                <path
                  className="hs-password-active:block hidden"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                ></path>
                <circle
                  className="hs-password-active:block hidden"
                  cx="12"
                  cy="12"
                  r="3"
                ></circle>
              </svg>
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-2 text-xs text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="w-64 sm:w-80">
          <label
            htmlFor="input-label"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Repeat Password
          </label>
          <Input
            type="password"
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-sky-600"
            placeholder="**********"
            autoComplete="off"
            {...register("newPasswordConfirm")}
          />
          {errors.newPasswordConfirm && (
            <p className="mt-2 text-xs text-red-500">{errors.newPasswordConfirm.message}</p>
          )}
        </div>
        <div className="my-4 text-sm text-gray-600 opacity-70 dark:text-gray-200">
          <p>Your password must:</p>
          <ul className="list-inside list-disc">
            <li>Be at least 8 characters long</li>
            <li>Have at least 1 uppercase letter</li>
            <li>Have at least 1 lowercase letter</li>
            <li>Have at least 1 digit</li>
            <li>Have at least 1 special character</li>
          </ul>
        </div>
        <button
          disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
          type="submit"
          className="flex justify-center items-center rounded-lg border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:bg-sky-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {(fetcher.state === "submitting" || fetcher.state === "loading") ? <SmallSpinner /> : "Update Password"}
        </button>
      </fetcher.Form>
    </CenteredLayout>
  )
}