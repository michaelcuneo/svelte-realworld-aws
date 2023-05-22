<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import 'normalize.css';
	import './styles.css';
	import type { LayoutServerData } from './$types';
	import { toggle } from '$lib/store';
	export let data: LayoutServerData;
</script>

<svelte:head>
	{#if !$toggle}
		<link rel="stylesheet" href="/smui-dark.css" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<main>
	<Header username={data?.username} />
	<slot />
	<Footer />
</main>

<style>
	main {
		display: flex;
		height: 100vh;
		background-color: var(--color-bg);
	}
</style>
