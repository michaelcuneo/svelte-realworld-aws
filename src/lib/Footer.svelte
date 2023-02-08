<script lang="ts">
	export let mode: string = 'DARK';
</script>

<footer>
	<pre>SvelteKit 1.0 AWS Boilerplate  |  v1.0.0  |  Michael Cuneo  |  </pre>
	<a href="https://aws.amazon.com/what-is-cloud-computing"
		><img
			class="power"
			src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
			alt="Powered by AWS Cloud Computing"
		/></a
	>
	<pre>  &  </pre>
	<a href="https://svelte.dev/" class="sveltelink">
		<img src="svelte-icon.svg" alt="Svelte Icon" />
	</a>
	<pre>velte.</pre>
	<!-- Rounded switch -->
	<label class="switch">
		<mode>{mode}</mode>
		<input type="checkbox" />
		<span class="slider round" />
	</label>
</footer>

<style>
	footer {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		bottom: 0;
		height: 60px;
		font-size: 16px;
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
		background: #262626;
		color: white;
	}
	pre {
		font-size: 0.9rem;
	}
	img {
		height: 1.6rem;
		width: auto;
	}
	.power {
		height: 1.6rem;
		width: auto;
	}
	.sveltelink {
		display: inline-flex;
		text-decoration: none;
		color: white;
	}

	mode {
		margin: 0px 0px 0px -60px;
		color: white;
	}

	/* The switch - the box around the slider */
	.switch {
		position: absolute;
		display: flex;
		align-items: center;
		right: 1.6rem;
		width: 48px;
		height: 24px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		left: 2px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 24px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
