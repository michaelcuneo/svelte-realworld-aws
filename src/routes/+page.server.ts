import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ url, cookies }) => {
    const theme = url.searchParams.get("theme");
    const redirectTo = url.searchParams.get("redirectTo");

    if (theme) {
      cookies.set("colorTheme", theme, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      })
    }

    throw redirect(303, redirectTo ?? '/');
  },
};