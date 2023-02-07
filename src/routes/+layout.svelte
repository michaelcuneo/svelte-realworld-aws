<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import 'normalize.css';
	import './styles.css';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<Header username={data?.username} />
<slot />
<Footer />
