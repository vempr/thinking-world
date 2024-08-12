import Heading from "./components/Heading.tsx";
import Footer from "./components/Footer.tsx";
import PrelineScript from "~/services/preline.client.tsx";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Heading />
        <main className="flex-grow dark:bg-neutral-800">{children}</main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {/* Add preline script on every page */}
        {PrelineScript && <PrelineScript />}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
