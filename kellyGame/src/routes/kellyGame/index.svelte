<script lang="ts">
	import gameStore from '$lib/gameStore';

	const bet = () => {
		gameStore.betPercentage(0.2);
	};
</script>

<div class="container">
	<h1>Kelly Criterion Game</h1>
	<div class="content">
		<div class="controls">
			<h2>
				Current Balance: {$gameStore.balance}
			</h2>
			<p>
				Each round you have a 60% chance to win and double what you bet and a corresponding 40%
				chance of losing all of what you bet. How would you bet in order to maximize the amount of
				money in the shortest amount of time?
			</p>
			<div>
				{#each $gameStore.history as val}
					<div>{val}</div>
				{/each}
			</div>
			<div>
				<div>You are betting ....</div>
				<div on:click={bet}>bet</div>
				<div>CARDs</div>
			</div>
		</div>
		<div>Chart</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: 2560px;
		margin: var(--column-margin-top) auto 0 auto;
	}

	.content {
		display: flex;
	}

	.content > div {
		flex-basis: 50%;
	}
</style>
