<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';

	let focused = false;
	let dirty = false;
	let invalid = false;

	export let value: string | undefined = undefined;
	export let variant: 'standard' | 'filled' | 'outlined' | undefined = 'standard';
	export let name: string | undefined = undefined;
	export let helperText: string | undefined = undefined;
	export let autoComplete: string;
	export let width: string;
	export let disabled: boolean = focused || !value || !dirty || invalid;
	export let label: string;
	export let type: string;
	export let leadingIcon: string | undefined = '';
	export let trailingIcon: string | undefined = '';
</script>

<Textfield
	style="width: {width}"
	bind:dirty
	bind:invalid
	updateInvalid
	{type}
	{label}
	{variant}
	input$name={name}
	{disabled}
	{value}
	autocomplete={autoComplete}
	on:focus={() => (focused = true)}
	on:blur={() => (focused = false)}
>
	{#if leadingIcon}
		<Icon class="material-icons" slot="trailingIcon">{leadingIcon}</Icon>
	{/if}
	{#if helperText}
		<HelperText slot="helper">{helperText}</HelperText>
	{/if}
	{#if trailingIcon}
		<Icon class="material-icons" slot="trailingIcon">{trailingIcon}</Icon>
	{/if}
</Textfield>
