<script lang="ts">
	import type { ActionData } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	//	import Select, { Option } from '@smui/select';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Button from '@smui/button';
	import Textfield from '$lib/TextField.svelte';
	import Card, { Content } from '@smui/card';
	import { transitionUser, mfa, signupConfirm, errs } from '$lib/store';
	import { goto, invalidateAll } from '$app/navigation';
	import { CountryCodes } from './CountryCodes';

	CountryCodes.sort((a, b) => parseFloat(a.dial_code) - parseFloat(b.dial_code));

	mfa.useLocalStorage();
	errs.useLocalStorage();

	let active: string = 'Sign in';
	let username: string = '';
	let password: string = '';
	let email: string = '';
	// let pre: string = '+61';
	let phone: string = '';
	let authCode: string = '';
	let smsCode: string = '';
	let disabled: boolean;
	$: disabled = false;

	const signIn = async (
		form: HTMLFormElement,
		data: FormData,
		action: string,
		cancel: Function
	) => {
		return async (result: ActionResult, update: SubmitFunction) => {
			console.log(result.result.data.result);
			if (result.result.type == 'failure') errs.set(JSON.parse(result.result.data.result));
			switch (result.type) {
				case 'success':
					form.reset();
					errs.set('nada');
					await applyAction(result);
					await invalidateAll();
					goto('/');
					break;
				case 'failure':
					form.reset();
					await applyAction(result);
					await invalidateAll();
					break;
			}
		};
	};

	const signUp = async (
		form: HTMLFormElement,
		data: FormData,
		action: string,
		cancel: Function
	) => {
		return async (result: ActionResult, update: SubmitFunction) => {
			switch (result.type) {
				case 'success':
					form.reset();
					await applyAction(result);
					await invalidateAll();
					break;
			}
		};
	};

	const confirmmfa = async (
		form: HTMLFormElement,
		data: FormData,
		action: string,
		cancel: Function
	) => {};

	const confirmSignUp = async (
		form: HTMLFormElement,
		data: FormData,
		action: string,
		cancel: Function
	) => {};

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
				<Card variant="outlined">
					<Content>
						<form action="?/login" method="POST" use:enhance={signIn}>
							<p>Sign in using your username and password.</p>
							<p>
								<Textfield
									width="100%"
									bind:disabled
									variant="outlined"
									value={username}
									name="username"
									label="Username"
									type="text"
									autoComplete="username"
								/>
							</p>
							<p>
								<Textfield
									width="100%"
									bind:disabled
									variant="outlined"
									value={password}
									name="password"
									label="Password"
									type="password"
									autoComplete="new-password"
								/>
							</p>
							<p />
							{#if form?.errorMessage}
								<p>
									{form.errorMessage}
								</p>
							{/if}
							<button-wrap>
								<Button color="secondary" type="submit">Forgot Password?</Button>
								<Button type="submit">Submit</Button>
							</button-wrap>
						</form>
					</Content>
				</Card>
			{:else}
				<Card variant="outlined">
					<Content>
						<form action="?/mfa" method="POST" use:enhance={confirmmfa}>
							<p>Please enter the authentication code sent via SMS to your mobile device.</p>
							<p>
								<Textfield
									width="100%"
									bind:disabled
									variant="outlined"
									value={authCode}
									name="Authentication Code"
									label="Authentication Code"
									type="number"
									autoComplete="one-time-code"
								/>
							</p>
							{#if form?.errorMessage}
								<p>
									{form.errorMessage}
								</p>
							{/if}
							<button-wrap>
								<Button type="submit">Submit</Button>
							</button-wrap>
						</form>
					</Content>
				</Card>
			{/if}
		{:else if !$signupConfirm}
			<Card variant="outlined">
				<Content>
					<form action="?/register" method="POST" use:enhance={signUp}>
						<p>Sign up for an account to Cognito Auth</p>
						<p>
							<Textfield
								width="100%"
								bind:disabled
								variant="outlined"
								value={username}
								name="username"
								label="Username"
								type="text"
								autoComplete="username"
							/>
						</p>
						<p>
							<Textfield
								width="100%"
								bind:disabled
								variant="outlined"
								value={password}
								name="password"
								label="Password"
								type="password"
								autoComplete="new-password"
							/>
						</p>
						<p>
							<Textfield
								width="100%"
								bind:disabled
								variant="outlined"
								value={email}
								name="email"
								label="Email Address"
								type="email"
								autoComplete="email"
							/>
						</p>
						<p class="phone">
							<!--
							<Select
								variant="outlined"
								style="display: block; width: 34%"
								bind:value={pre}
								label="+"
							>
								{#each CountryCodes as code}
									<Option value={code}>{code.dial_code}</Option>
								{/each}
							</Select>
							-->
							<Textfield
								width="100%"
								bind:disabled
								variant="outlined"
								value={phone}
								name="phone"
								label="Phone Number"
								type="tel"
								autoComplete="phone-number"
							/>
						</p>
						{#if form?.errorMessage}
							<p>
								{form.errorMessage}
							</p>
						{/if}
						<button-wrap>
							<Button type="submit">Submit</Button>
						</button-wrap>
					</form>
				</Content>
			</Card>
		{:else}
			<Card variant="outlined">
				<Content>
					<form action="?/confirm" method="POST" use:enhance={confirmSignUp}>
						<p>
							Please enter the confirmation code that we have sent to the email address you signed
							up with.
						</p>
						<p>
							<Textfield
								width="100%"
								bind:disabled
								variant="outlined"
								value={smsCode}
								name="Authentication Code"
								label="Authentication Code"
								type="code"
								autoComplete="one-time-code"
							/>
						</p>
						{#if form?.errorMessage}
							<p>
								{form.errorMessage}
							</p>
						{/if}
						<button-wrap>
							<Button type="submit">Submit</Button>
						</button-wrap>
					</form>
				</Content>
			</Card>
		{/if}
	</form-wrapper>
</div>

<style>
	div {
		display: flex;
		height: calc(100vh);
		width: 100%;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	form-wrapper {
		width: 320px;
	}
	p {
		padding: 0rem 1rem;
	}
	.phone {
		padding: 0rem 1rem;
	}
	button-wrap {
		display: flex;
		padding: 0.5em 1em;
		justify-content: space-between;
	}
</style>
