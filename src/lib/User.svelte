<script lang="ts">
	export let username: string;
</script>

<div class="user">
	{#if username}
		<pre>Hello {username}, </pre>
		<a href="/logout" data-sveltekit-preload-data="off" data-sveltekit-reload>LOGOUT</a>
	{:else}
		<a href="/auth">LOGIN</a>
	{/if}
</div>

<style>
	.user {
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 0rem 1.5rem 0rem 0rem;
	}
	pre {
		font-family: 'Inconsolata', monospace;
		font-weight: 700;
	}
	a {
		color: white;
		text-decoration: none;
		font-family: 'Inconsolata', monospace;
		font-weight: 700;
		font-size: 1.2rem;
	}
</style>
