<div class="card" on:click on:mouseenter on:mouseleave>
	<slot />
</div>

<style>
	.card {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
		padding: 0.5em 0.75em;
		cursor: pointer;
		font-size: 1rem;
		font-weight: bold;
		color: var(--heading-color);
		--tw-border-opacity: 1;
		--tw-gradient-stops: var(--tw-gradient-from), #fff, var(--tw-gradient-to, hsla(0, 0%, 100%, 0));
		--tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		--tw-gradient-from: #edeeff;
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(249, 250, 251, 0));
		--tw-gradient-to: #fff;
		background-image: linear-gradient(to right, var(--tw-gradient-stops));
		border-color: rgba(243, 244, 246, var(--tw-border-opacity));
		border-radius: 0.5rem;
		border-width: 1px;
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
		line-height: 1.5rem;
		user-select: none;
	}
	.card:hover {
		--tw-gradient-stops: var(--tw-gradient-from), #edeeff,
			var(--tw-gradient-to, rgba(249, 250, 251, 0));
		--tw-gradient-to: #f3f4f6;
	}
</style>
