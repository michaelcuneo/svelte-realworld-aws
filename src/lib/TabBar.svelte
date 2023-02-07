<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let tabItems: string[];
	export let activeItem: string;
</script>

<div class="tabs">
	<ul>
		{#each tabItems as item}
			<li on:click={() => dispatch('tabChange', item)} on:keydown>
				<div class:active={item === activeItem}>{item}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tabs {
		margin-bottom: 40px;
	}
	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		list-style-type: none;
	}
	li {
		margin: 0 16px;
		font-size: 18px;
		color: #555;
		cursor: pointer;
	}
	div {
		font-family: 'Inconsolata', monospace;
		font-weight: 700;
		font-size: 18px;
	}
	.active {
		color: var(--color-theme-1);
		border-bottom: 2px solid #d91b42;
		padding-bottom: 8px;
	}
</style>
