import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  console.log(locals);
  const { username } = locals;

  return { username };
}) satisfies LayoutServerLoad;