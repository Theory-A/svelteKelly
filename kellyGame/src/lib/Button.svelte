<div class="btn" on:click>
	<slot />
</div>

<style>
	.btn {
		display: inline-block;
		--tw-border-opacity: 1;
		--tw-gradient-from: #fff;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, hsla(0, 0%, 100%, 0));
		--tw-gradient-to: #f3f4f6;
		--tw-text-opacity: 1;
		color: rgba(31, 41, 55, var(--tw-text-opacity));
		background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
		padding: 0.3em;
		font-size: 0.4em;
		border-radius: 0.2em;
		border: 1px solid lightgrey;
		cursor: pointer;
		margin: 0.3em 0.4em;
	}
</style>
