<script lang="ts">
	export let type: string;
	export let name: string;
	export let label: string;
	export let value: string;
</script>

<div class="custom-field">
	<label for={label}>{label}</label>
	<input {type} name={label} value placeholder="&nbsp;" />
</div>

<style>
	.custom-field {
		position: relative;
		font-size: 14px;
		border-top: 20px solid transparent;
		display: inline-block;
		--field-padding: 12px;
	}

	.custom-field input {
		border: none;
		-webkit-appearance: none;
		-ms-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: #36454f;
		padding: var(--field-padding);
		border-radius: 3px;
		width: 100%;
		outline: none;
		font-size: 14px;
	}

	/* ONE */
	.custom-field input {
		background: none;
		border: 2px solid #263138;
		transition: border-color 0.3s ease;
	}

	.custom-field input:focus {
		border-color: #36454f;
		transition-delay: 0.1s;
	}
</style>
