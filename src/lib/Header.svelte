<script lang="ts">
	export let username: string;
	console.log(username);
</script>

<header>
	<a href="/">
		<logotype>
			<sveltekit>SvelteKit 1.0</sveltekit>
			<pre> | </pre>
			<small>REALWORLD + AWS</small>
		</logotype>
	</a>
	<username>
		{#if username}
			Hello {username},
			<a href="/logout" data-sveltekit-preload-data="off" data-sveltekit-reload>LOGOUT</a>
		{:else}
			<a href="/auth">Login</a>
		{/if}
	</username>
</header>

<style>
	header {
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: space-between;
		top: 0;
		left: 0;
		right: 0;
		height: 80px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		z-index: 2;
	}
	logotype {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	pre {
		padding: 0;
		margin: 0;
	}
	sveltekit {
		padding: 0rem 0rem 0rem 1.5rem;
		font-size: 1.2rem;
		font-family: 'Inconsolata', monospace;
		font-weight: 700;
	}
	small {
		font-size: 0.8rem;
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
	}
	username {
		padding: 0rem 1.5rem 0rem 0rem;
	}
	a {
		color: white;
		text-decoration: none;
	}
</style>
