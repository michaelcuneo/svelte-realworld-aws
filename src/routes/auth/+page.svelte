<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import Button from '@smui/button';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Card from '@smui/card';
	import type { Input } from '@smui/textfield';
	import Textfield from '$lib/Textfield.svelte';
	import FloatingLabel from '@smui/floating-label';
	import NotchedOutline from '@smui/notched-outline';
	import { transitionUser, mfa, signupConfirm } from '$lib/store';
	import { Auth } from '@aws-amplify/auth';
	import awsmobile from '../../aws-exports';
	import { goto, invalidateAll } from '$app/navigation';

	mfa.useLocalStorage();

	Auth.configure(awsmobile);

	let active = 'Sign in';

	let usernameInput: Input;
	let usernameLabel: FloatingLabel;
	let usernameOutline: NotchedOutline;
	let passwordInput: Input;
	let passwordLabel: FloatingLabel;
	let passwordOutline: NotchedOutline;

	const handleError = (error: object) => {
		console.log(error);
	};

	const signIn = async ({ form, data, action, cancel }) => {
		await Auth.signIn(data.get('username'), data.get('password'))
			.then((result) => {
				if (result.challengeName === 'SMS_MFA') {
					transitionUser.set(result);
					mfa.set(true);
				}
			})
			.catch((err) => {
				handleError(err);
				cancel();
			});
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					form.reset();
					await applyAction(result);
					await invalidateAll();
					goto('/');
					break;
			}
		};
	};

	const signUp = async ({ form, data, action, cancel }) => {
		await Auth.signUp(
			data.get('username'),
			data.get('password'),
			data.get('email'),
			data.get('phone')
		)
			.then((result) => {
				transitionUser.set(result);
				signupConfirm.set(true);
			})
			.catch((err) => err);
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					form.reset();
					await applyAction(result);
					await invalidateAll();
					break;
			}
		};
	};

	const confirmSignUp = async ({ form, data, action, cancel }) => {
		await Auth.confirmSignUp(data.get('username'), data.get('confirm'))
			.then((result) => {
				signupConfirm.set(false);
				active = 'Sign in';
			})
			.catch((err) => err);
	};

	export let form: ActionData;
</script>

<div>
	<form-wrapper>
		<TabBar tabs={['Sign in', 'Sign up']} let:tab bind:active>
			<!-- Note: the `tab` property is required! -->
			<Tab {tab}>
				<Label>{tab}</Label>
			</Tab>
		</TabBar>
		{#if active == 'Sign in'}
			{#if $mfa == false}
				<form action="?/login" method="POST" use:enhance={signIn}>
					<Card>
						<p>Sign in using your username and password.</p>
						<p>
							<Textfield
								name="username"
								input={usernameInput}
								outline={usernameOutline}
								label={usernameLabel}
							/>
						</p>
						<p>
							<Textfield
								name="password"
								input={passwordInput}
								outline={passwordOutline}
								label={passwordLabel}
							/>
						</p>
						<p />
						{#if form?.errorMessage}
							<p>
								{form.errorMessage}
							</p>
						{/if}
						<button-wrap>
							<Button type="submit">Submit</Button>
						</button-wrap>
					</Card>
				</form>
			{:else}
				<form>
					<Card>
						<p>Please enter the authentication code sent via SMS to your mobile device.</p>
						<p>
							<input type="text" name="mfa" />
						</p>
						{#if form?.errorMessage}
							<p>
								{form.errorMessage}
							</p>
						{/if}
						<button-wrap>
							<Button type="submit">Submit</Button>
						</button-wrap>
					</Card>
				</form>
			{/if}
		{:else if !$signupConfirm}
			<form on:submit|preventDefault={signUp}>
				<Card>
					<p>
						<input type="text" name="username" />
					</p>
					<p>
						<input type="password" name="password" />
					</p>
					<p>
						<input type="text" name="phone" />
					</p>
					<p>
						<input type="text" name="email" />
					</p>
					{#if form?.errorMessage}
						<p>
							{form.errorMessage}
						</p>
					{/if}
					<button-wrap>
						<Button type="submit">Submit</Button>
					</button-wrap>
				</Card>
			</form>
		{:else}
			<form on:submit|preventDefault={confirmSignUp}>
				<Card>
					<p>
						Please enter the confirmation code that we have sent to the email address you signed up
						with.
					</p>
					<p>
						<input type="numbers" name="confirmation" />
					</p>
					{#if form?.errorMessage}
						<p>
							{form.errorMessage}
						</p>
					{/if}
					<button-wrap>
						<Button type="submit">Submit</Button>
					</button-wrap>
				</Card>
			</form>
		{/if}
	</form-wrapper>
</div>

<style>
	div {
		display: flex;
		height: calc(100vh - 80px);
		width: 100%;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	form-wrapper {
		width: 300px;
	}
	p {
		padding: 0rem 1rem;
	}
	button-wrap {
		display: flex;
		padding: 1em 1em;
		justify-content: flex-end;
	}
	form {
		width: 300px;
	}
</style>
