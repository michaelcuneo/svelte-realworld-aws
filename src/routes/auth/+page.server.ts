import { fail, type Actions, type Cookies } from '@sveltejs/kit';
import { createSession, transitionUser, mfa, signupConfirm } from '$lib/store';
import { Auth } from '@aws-amplify/auth';
import awsmobile from '../../aws-exports';

Auth.configure(awsmobile);

const performLogin = (cookies: Cookies, username: string) => {
	const maxAge = 1000 * 60 * 60 * 24 * 30;
	const sid = createSession(username, maxAge);
	cookies.set('sid', sid, { maxAge, path: '/' });
};

const login = async (username: string, password: string) => {
	await Auth.signIn(username, password)
		.then((result) => {
			if (result.challengeName === 'SMS_MFA') {
				transitionUser.set(result);
				mfa.set(true);
			}
		})
		.catch((err) => err);
}

const signup = async (username: string, password: string, email: string, phone: string) => {
	await Auth.signUp(username, password, email, phone)
		.then((result) => {
			transitionUser.set(result);
			signupConfirm.set(true);
		})
		.catch((err) => err);
}

const confirm = async (username: string, code: string) => {
	await Auth.confirmSignUp(username, code)
		.then((result) => {
			signupConfirm.set(false);
			// active = 'Sign in';
		})
		.catch((err) => err);
}

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (username && password) {
			return await Auth.signIn(username, password)
				.then((result) => {
					let response = { success: true, result: JSON.stringify(result) };
					performLogin(cookies, username);
					return response;
				})
				.catch((err) => {
					return fail(400, { result: JSON.stringify(err) });
				});
		}
	},
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();
		const email = data.get('email')?.toString();
		const phone = data.get('phone')?.toString();

		if (username && password && email && phone) {
			const result = await signup(username, password, email, phone);
			performLogin(cookies, username);
		} else {
			return fail(400, { errorMessage: 'Something went wrong.' });
		}
	},
	confirm: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const code = data.get('password')?.toString();


		if (username && code) {
			const result = await confirm(username, code);
		} else {
			return fail(400, { errorMessage: 'Something went wrong.' });
		}
	},
};
