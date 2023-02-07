<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Button from '$lib/Button.svelte';
	import TabBar from '$lib/TabBar.svelte';
	import Card from '$lib/Card.svelte';
	import Textfield from '$lib/Textfield.svelte';
	import { transitionUser, mfa, signupConfirm } from '$lib/store';
	import { Auth } from '@aws-amplify/auth';
	import awsmobile from '../../aws-exports';

	mfa.useLocalStorage();

	Auth.configure(awsmobile);

	let error: any;

	let tabItems: string[] = ['Sign in', 'Sign up'];
	let activeItem: string = 'Sign in';

	const signIn = async ({ form, data, action, cancel }) => {
		await Auth.signIn(data.get('username'), data.get('password'))
			.then((result) => {
				if (result.challengeName === 'SMS_MFA') {
					transitionUser.set(result);
					mfa.set(true);
				}
			})
			.catch((err) => err);
		return async ({ result, update }) => {
			await update();
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
			await update();
		};
	};

	const confirmSignUp = async ({ form, data, action, cancel }) => {
		await Auth.confirmSignUp(data.get('username'), data.get('confirm'))
			.then((result) => {
				signupConfirm.set(false);
				activeItem = 'Sign in';
			})
			.catch((err) => err);
	};

	const triggerTabChange = (event: any) => {
		activeItem = event.detail;
	};

	export let form: ActionData;
</script>

<div>
	<form-wrapper>
		<TabBar {tabItems} {activeItem} on:tabChange={triggerTabChange} />
		{#if activeItem == 'Sign in'}
			{#if $mfa == false}
				<form action="?/login" method="POST" use:enhance={signIn}>
					<Card>
						<p>
							<Textfield type="text" name="username" required />
						</p>
						<p>
							<Textfield type="password" name="password" required />
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
