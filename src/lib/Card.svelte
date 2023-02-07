<card>
	<container>
		<slot />
	</container>
</card>

<style>
	container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	card {
		display: flex;
		position: relative;
		flex-direction: column;
		border-radius: 3px;
		background: var(--color-paper-lightmode);
		-webkit-box-shadow: 0px 2px 4px -1px #36454f, 0px 4px 5px 0px #36454f, 0px 1px 10px 0px #36454f;
		box-shadow: 0px 2px 4px -1px #36454f, 0px 4px 5px 0px #36454f, 0px 1px 10px 0px #36454f;
	}
	@media (prefers-color-scheme: dark) {
		card {
			--text-color: #eee;
			background: var(--color-paper-darkmode);
			-webkit-box-shadow: 0px 2px 4px -1px #36454f, 0px 4px 5px 0px #36454f,
				0px 1px 10px 0px #36454f;
			box-shadow: 0px 2px 4px -1px #36454f, 0px 4px 5px 0px #36454f, 0px 1px 10px 0px #36454f;
		}
	}
</style>
