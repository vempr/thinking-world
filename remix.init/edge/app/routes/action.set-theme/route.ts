import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/services/themeSession.server.ts";

export const action = createThemeAction(themeSessionResolver);
