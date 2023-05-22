<script lang="ts">
	import User from '../lib/User.svelte';

	export let username: string;
</script>

<header>
	<div class="left">
		<a href="/">
			<div class="logotype">
				<img src="logo.svg" alt="logo.svg" />
				<div class="sveltekit">SKamplify</div>
			</div>
		</a>
	</div>
	<div class="right">
		<div class="icon">
			<a href="/about" class="sveltelink">ABOUT</a>
		</div>
		<div class="icon">
			<a href="/features" class="sveltelink">FEATURES</a>
		</div>
		<div class="icon">
			<a href="/documentation" class="sveltelink">DOCUMENTATION</a>
		</div>
		<User {username} />
		<div class="icon">
			<a href="https://github.com/michaelcuneo/sveltekit-realworld-aws" class="sveltelink">
				<img src="github-mark-white.svg" alt="Svelte Icon" />
			</a>
		</div>
		<div class="icon">
			<a
				href="https://join.slack.com/t/michaelcuneo/shared_invite/zt-1olb564gn-qJ6779idHvXPVHyQISwPcA"
				class="sveltelink"
			>
				<img src="slack.webp" alt="Svelte Icon" />
			</a>
		</div>
	</div>
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
		background: var(--color-paper);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		z-index: 2;
	}
	img {
		padding: 0rem 0rem 0rem 1rem;
	}
	.left {
		display: flex;
		align-items: center;
	}
	.right {
		display: flex;
		align-items: center;
	}
	.logotype {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	a {
		color: white;
		text-decoration: none;
		font-family: 'Inconsolata', monospace;
		font-weight: 700;
		font-size: 1.2rem;
	}
	.sveltekit {
		padding: 0rem 0rem 0rem 1.5rem;
		font-size: 1.2rem;
		font-family: 'Inconsolata', monospace;
		font-weight: 700;
	}
	img {
		height: 1.8rem;
		width: auto;
	}
	a {
		color: white;
		text-decoration: none;
	}
	.icon {
		padding: 0rem 1.5rem 0rem 0rem;
	}
</style>
