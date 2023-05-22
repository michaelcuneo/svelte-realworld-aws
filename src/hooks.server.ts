import { getSession } from '$lib/store';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get("theme");
	const cookieTheme = event.cookies.get("colorTheme");

	if (newTheme) {
		theme = newTheme
	} else if (cookieTheme) {
		theme = cookieTheme
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}

	if (sid) {
		const session = getSession(sid);
		if (session) {
			event.locals.username = session.username;
			event.locals.roles = session.roles;
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
