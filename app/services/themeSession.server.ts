import { createCookieSessionStorage } from "@remix-run/deno";
import { createThemeSessionResolver } from "remix-themes";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.VITE_THEME_SESSION_SECRET as string],
    // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "your-production-domain.com", secure: true }
      : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
