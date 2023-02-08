<script lang="ts">
	import FloatingLabel from '@smui/floating-label';
	import NotchedOutline from '@smui/notched-outline';
	import Textfield, { Input } from '@smui/textfield';

	export let input: Input;
	export let outline: NotchedOutline;
	export let label: FloatingLabel;
	export let name: string;
</script>

<Textfield
	bind:input
	bind:notchedOutline={outline}
	bind:floatingLabel={label}
	input$autocomplete="username"
	variant="outlined"
	style="width: 100%;"
>
	<NotchedOutline bind:this={outline} slot="label">
		<FloatingLabel bind:this={label} for="usernameLabel">{name}</FloatingLabel>
	</NotchedOutline>
	<Input
		id="usernameLabel"
		bind:this={input}
		{name}
		aria-controls="helper-text-manual-b"
		aria-describedby="helper-text-manual-b"
	/>
</Textfield>

<style>
</style>
