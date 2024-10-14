import { ThemeProvider, useTheme } from "remix-themes";
import Footer from "./components/Footer.tsx";
import Heading from "./components/Heading.tsx";

import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";

import { Toaster } from "sonner";
import { cn } from "./lib/utils.ts";
import { themeSessionResolver } from "./services/themeSession.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider
      specifiedTheme={data.theme}
      themeAction="/action/set-theme"
    >
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  data;
  const [theme] = useTheme();

  return (
    <html
      lang="en"
      className={cn("h-full dark-theme", theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Heading />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <Toaster richColors />
      </body>
    </html>
  );
}
