<script lang="ts">
	export let show: boolean = false;
	export let onClose: () => void;
	import Button from '$lib/Button.svelte';
</script>

{#if show}
	<div class="overlay" on:click={onClose}>
		<div class="container" on:click|stopPropagation>
			<div>
				There is no "correct" way of betting since it depends on how fast you want your money to
				grow, the number of opportunities available, and your personal risk tolerance. However for a
				game with 60% odds, the mathematically correct percent of bankroll to bet is 20% per the
				<a href="https://en.wikipedia.org/wiki/Kelly_criterion" target="_blank">Kelly Criterion</a>.
			</div>

			<div>
				Betting a small amount like 1% every round is a very safe way of growing your balance.
				However most real world opportunities dry up the more you take advantage of them. Your
				"edge" or "alpha" evaporates into the world as exercising them leaks information.
			</div>

			<div>
				Betting too high an amount however leads to <a
					href="https://en.wikipedia.org/wiki/Gambler%27s_ruin"
					target="_blank">eventual ruin</a
				>. In the most simple case, if you were to bet 100% each round, then you'd end up with $0
				pretty quickly even though the expected rate of return for this game is positive!
			</div>

			<div>
				The same is true when always betting 50% or 70%. Though you may make a lot of money in the
				short run, betting too high of an amount asymptomatically leads to 100% chance of ruin. For
				more information, check out our in-depth article here.
			</div>
			<div class="btn">
				<Button on:click={onClose}>OK</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		background-color: #d3d3d333;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		background-color: white;
		width: 30%;
		padding: 1.5em;
	}
	.container div {
		margin-bottom: 1em;
	}
	.btn {
		text-align: center;
	}
</style>
