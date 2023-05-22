<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { toggle } from '$lib/store';

	let form: HTMLFormElement;
	let theme: string = 'light';
	let value: boolean = true;
	let input: HTMLInputElement;

	toggle.useLocalStorage();

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};

	const change = (e: Event) => {
		if ((<HTMLInputElement>e.target).checked === true) {
			toggle.set(false);
			input.checked = true;
			theme = 'light';
		} else {
			toggle.set(true);
			input.checked = false;
			theme = 'dark';
		}
		form.requestSubmit();
	};

	onMount(() => {
		// initially set the switch to it's last known value
		$toggle === true ? (input.checked = false) : (input.checked = true);
	});
</script>

<form
	action="/?setTheme&theme={theme}&redirectTo={$page.url.pathname}"
	method="POST"
	use:enhance={submitUpdateTheme}
	bind:this={form}
>
	<input type="checkbox" on:change={change} id="darkmode-toggle" bind:value bind:this={input} />
	<label for="darkmode-toggle">
		<svg class="moon" height="800px" width="800px" viewBox="0 0 512 512">
			<g>
				<g>
					<path
						d="m275.4,500.7c-135,0-244.7-109.8-244.7-244.7 1.06581e-14-134.9 109.8-244.7 244.7-244.7 8.2,0 16.4,0.4 24.6,1.2 7.2,0.7 13.5,5.2 16.5,11.7s2.4,14.2-1.6,20.2c-23,33.8-35.2,73.3-35.2,114.2 0,105 78.7,192.2 183.2,202.6 7.2,0.7 13.5,5.2 16.5,11.7 3.1,6.5 2.4,14.2-1.6,20.2-45.8,67.4-121.4,107.6-202.4,107.6zm-12.5-448c-106.5,6.5-191.2,95.2-191.2,203.3 1.42109e-14,112.3 91.4,203.7 203.7,203.7 56.4,0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6 0.1-37.1 8.4-73.2 24.3-106.1z"
					/>
				</g>
			</g>
		</svg>
		<svg class="sun" width="800px" height="800px" viewBox="0 0 36 36">
			<path
				d="M18,6.31a1,1,0,0,0,1-1V1.91a1,1,0,0,0-2,0v3.4A1,1,0,0,0,18,6.31Z"
				class="clr-i-outline clr-i-outline-path-1"
			/><path
				d="M18,29.69a1,1,0,0,0-1,1v3.4a1,1,0,0,0,2,0v-3.4A1,1,0,0,0,18,29.69Z"
				class="clr-i-outline clr-i-outline-path-2"
			/><path
				d="M8.32,9.74A1,1,0,0,0,9,10a1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42L7.33,5.92A1,1,0,0,0,5.92,7.33Z"
				class="clr-i-outline clr-i-outline-path-3"
			/><path
				d="M27.68,26.26a1,1,0,1,0-1.42,1.42l2.41,2.4a1,1,0,0,0,.71.3,1,1,0,0,0,.7-.3,1,1,0,0,0,0-1.41Z"
				class="clr-i-outline clr-i-outline-path-4"
			/><path
				d="M6.31,18a1,1,0,0,0-1-1H1.91a1,1,0,0,0,0,2h3.4A1,1,0,0,0,6.31,18Z"
				class="clr-i-outline clr-i-outline-path-5"
			/><path
				d="M34.09,17h-3.4a1,1,0,1,0,0,2h3.4a1,1,0,0,0,0-2Z"
				class="clr-i-outline clr-i-outline-path-6"
			/><path
				d="M8.32,26.26l-2.4,2.41a1,1,0,0,0,.7,1.71,1,1,0,0,0,.71-.3l2.41-2.4a1,1,0,1,0-1.42-1.42Z"
				class="clr-i-outline clr-i-outline-path-7"
			/><path
				d="M27,10a1,1,0,0,0,.71-.29l2.4-2.41a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0l-2.41,2.4a1,1,0,0,0,0,1.42A1,1,0,0,0,27,10Z"
				class="clr-i-outline clr-i-outline-path-8"
			/><path
				d="M18.13,7.75a10.13,10.13,0,1,0,10,10.13A10.08,10.08,0,0,0,18.13,7.75Zm0,18.25a8.13,8.13,0,1,1,8-8.12A8.08,8.08,0,0,1,18.13,26Z"
				class="clr-i-outline clr-i-outline-path-9"
			/>
			<rect x="0" y="0" width="36" height="36" fill-opacity="0" />
		</svg>
	</label>
</form>

<style>
	form {
		display: flex;
		position: relative;
		padding-left: 2rem;
	}
	label {
		position: relative;
		display: flex;
		width: 100px;
		height: 40px;
		background: #ebebeb;
		border-radius: 56px;
		box-shadow: inset 0px 2.5px 7.5px rgba(0, 0, 0, 0.4),
			inset 0px -2.5px 7.5px rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: 0.3s;
	}
	label::after {
		content: '';
		width: 36px;
		height: 36px;
		position: absolute;
		top: 2px;
		left: 2px;
		background: linear-gradient(180deg, #ffcc89, #d8860b);
		border-radius: 36px;
		box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.2);
		transition: 0.3s;
	}
	input {
		width: 0;
		height: 0;
		visibility: hidden;
	}
	input:checked + label {
		background: #242424;
	}
	input:checked + label:after {
		left: 96px;
		transform: translateX(-100%);
		background: linear-gradient(180deg, #777, #3a3a3a);
	}
	label:active::after {
		width: 52px;
	}
	label svg {
		position: absolute;
		height: 20px;
		width: 20px;
		top: 10px;
		z-index: 100;
	}
	label svg.sun {
		left: 9.6px;
		fill: #fff;
		transition: 0.3s;
	}
	label svg.moon {
		left: 68.8px;
		fill: #7e7e7e;
		transition: 0.3s;
	}
	input:checked + label svg.sun {
		fill: #fff;
	}
	input:checked + label svg.moon {
		fill: #fff;
	}
</style>
