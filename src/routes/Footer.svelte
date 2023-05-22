<script lang="ts">
	import Select, { Option } from '@smui/select';
	import DarkLight from './DarkLight.svelte';

	let lang = 'en';
	let languages = [
		{
			label: 'en'
		},
		{
			label: 'es'
		}
	];
</script>

<footer>
	<div class="author">
		<pre>SKamplify  |  v1.0.0  |  Michael Cuneo | GPL 3.0</pre>
	</div>
	<div class="lang">
		<Select variant="filled" style="width: 90px;" bind:value={lang} label="intl">
			{#each languages as language}
				<Option value={language.label}>{language.label}</Option>
			{/each}
		</Select>
	</div>
	<div class="theme">
		<DarkLight />
	</div>
	<div class="power">
		<a href="https://aws.amazon.com/what-is-cloud-computing"
			><img
				src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
				alt="Powered by AWS Cloud Computing"
			/></a
		>
		<a href="https://svelte.dev/" class="sveltelink">
			<img src="svelte-icon.svg" alt="Svelte Icon" />
		</a>
	</div>
</footer>

<style>
	footer {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		bottom: 0;
		height: 60px;
		padding: 1rem;
		font-size: 16px;
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
		background: var(--color-paper);
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--color-text);
		z-index: 2;
	}
	pre {
		font-size: 0.9rem;
	}
	img {
		height: 1.6rem;
		width: auto;
	}
	.author {
		display: flex;
		user-select: none;
	}
	.power {
		display: flex;
		height: 1.6rem;
		width: auto;
	}
	.sveltelink {
		display: inline-flex;
		text-decoration: none;
		color: white;
	}
	.lang {
		display: flex;
		position: relative;
	}
	a {
		padding: 0rem 1rem 0rem 1rem;
		user-select: none;
	}
	@media screen and (max-width: 900px) {
		.theme {
		}
	}
</style>
