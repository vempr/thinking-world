import PrelineScript from "~/services/preline.client.tsx";
import Footer from "./components/Footer.tsx";
import Heading from "./components/Heading.tsx";

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
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {PrelineScript && <PrelineScript />}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
