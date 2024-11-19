import { Link } from "@remix-run/react";
import { CenteredLayout } from "~/components/wrappers/CenteredLayout";

export default function CatchAll() {
  return (
    <CenteredLayout>
      <div className="flex flex-col gap-y-2">
        <div>
          <div className="flex items-end justify-between">
            <h1 className="font-title text-4xl">Hi there!</h1>
            <p className="font-title text-9xl text-sky-400 opacity-30">404!!!</p>
          </div>
          <p className="opacity-80">It seems you tried to access a non-existing page on Thinking World..</p>
        </div>
        <p className="font-title text-xl">Don't worry, let's get you back on track!</p>
        <Link to="/" prefetch="intent" className="bg-sky-500 rounded-lg text-white font-bold text-center py-2 text-sm hover:bg-sky-600 active:bg-sky-700">Take me to Home Page</Link>
      </div>
    </CenteredLayout>
  )
}