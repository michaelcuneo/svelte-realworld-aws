import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';
import { createSession } from '$lib/store';

const performLogin = (cookies: Cookies, username: string) => {
	const maxAge = 1000 * 60 * 60 * 24 * 30;
	const sid = createSession(username, maxAge);
	cookies.set('sid', sid, { maxAge, path: '/' });
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();

		if (username) {
			performLogin(cookies, username);
			return { success: true };
		}
	},
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const email = data.get('email')?.toString();
		const phone = data.get('phone')?.toString();

		if (username && password) {
			performLogin(cookies, username);
		} else {
			return fail(400, { errorMessage: 'Missing username of password' });
		}
	}
};
