import { zodResolver } from "@hookform/resolvers/zod";
import {
  json,
  MetaFunction,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Link, redirect, useFetcher, useSearchParams } from "@remix-run/react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { Spinner } from "~/components/Spinner.tsx";
import { LandingLayout } from "~/components/wrappers/LandingLayout.tsx";
import { createSupabaseServerClient } from "~/services/supabase.server.ts";
import { registerSchema, type RegisterArgs } from "./registerFormSchema.ts";
import { Input } from "~/components/ui/input.tsx";

const resolver = zodResolver(registerSchema);

export const meta: MetaFunction = () => {
  return [
    { title: "Register | Thinking World" },
    {
      name: "description",
      content: "Sign up for a Thinking World account: A lightweight and minimalistic web calendar to help you calculate your salary.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabaseClient, headers } = createSupabaseServerClient(request, request.headers)
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user) {
    return redirect("/account", { headers });
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const { data: formData, errors } = await getValidatedFormData<RegisterArgs>(
    request,
    resolver,
  );
  if (errors) return json({ error: "Invalid formdata", success: false });
  // ^ no need to provide meaningful error since form is already checked client-side
  const { supabaseClient } = createSupabaseServerClient(request, request.headers)
  const { data, error } = await supabaseClient.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  if (error) return json({ error: error.message, success: false });

  // check if email is in db because supabase doesn't return an error if that is true
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return json({
      error: "User already exists",
      success: false,
    });
  }

  return json({ error: null, success: true });
}

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetcher = useFetcher<typeof action>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<RegisterArgs>({
    mode: "onSubmit",
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
    fetcher,
  });

  return (
    <LandingLayout>
      <h1 className="font-title text-black dark:text-white text-xl sm:text-3xl lg:text-5xl mb-6">
        Create your Account
      </h1>
      <fetcher.Form
        className="flex flex-col gap-y-2"
        onSubmit={handleSubmit}
        method="post"
        action="/register"
      >
        <div className="w-64 sm:w-80">
          <label
            htmlFor="input-label"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Email
          </label>
          <Input
            type="email"
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-sky-600"
            placeholder="you@example.com"
            autoComplete="off"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="w-64 sm:w-80">
          <label className="mb-2 block text-sm dark:text-white">Password</label>
          <div className="relative">
            <Input
              type={searchParams.get("showPassword") ? "text" : "password"}
              className="block w-full rounded-lg border-gray-200 py-3 pe-10 ps-4 text-sm outline outline-1 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:outline-none dark:focus:ring-sky-600"
              placeholder="**********"
              autoComplete="off"
              {...register("password")}
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
          {errors.password && (
            <p className="mt-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
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
        </div>
        {fetcher.data?.success && (
          <>
            <p className="my-1 text-sm font-bold text-green-600 sm:hidden">
              Signup successful.
              <br />
              Please check your inbox!
            </p>
            <p className="my-1 hidden text-xs font-bold text-green-600 sm:block">
              Signup successful. Please check your inbox!
            </p>
          </>
        )}
        {fetcher.data?.error && (
          <p className="my-1 text-xs font-bold text-red-600">
            {fetcher.data.error}
          </p>
        )}
        <button
          disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
          type="submit"
          className="flex justify-center items-center h-12 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {(fetcher.state === "submitting" || fetcher.state === "loading") ? <Spinner /> : "Register"}
        </button>
      </fetcher.Form>
      <div className="mt-4">
        <p className="text-xs text-black sm:text-sm dark:text-white">
          If you already have an account,{" "}
          <Link
            className="text-blue-400 underline hover:text-blue-500"
            to="/login"
            prefetch="intent"
          >
            login here
          </Link>
          .
        </p>
      </div>
    </LandingLayout>
  );
}
