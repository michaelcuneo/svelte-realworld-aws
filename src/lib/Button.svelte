<script lang="ts">
	export let type: 'submit' | 'reset' | 'button';
</script>

<button {type}>
	<slot />
</button>

<style>
	button {
		align-items: center;
		background-color: var(--color-theme-1);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.25rem;
		box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
		box-sizing: border-box;
		color: #eee;
		cursor: pointer;
		display: inline-flex;
		font-size: 16px;
		font-weight: 600;
		justify-content: center;
		line-height: 1rem;
		margin: 0;
		min-height: 2rem;
		padding: calc(0.675rem - 1px) calc(1.2rem - 1px);
		position: relative;
		text-decoration: none;
		transition: all 250ms;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: baseline;
	}

	button:hover,
	button:focus {
		border-color: rgba(0, 0, 0, 0.15);
		box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
		color: #eee;
	}

	button:hover {
		transform: translateY(-1px);
	}

	button:active {
		background-color: #f0f0f1;
		border-color: rgba(0, 0, 0, 0.15);
		box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
		color: #eee;
		transform: translateY(0);
	}
</style>
