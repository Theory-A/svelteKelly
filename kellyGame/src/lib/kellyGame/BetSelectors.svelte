<script lang="ts">
	import gameStore from '$lib/gameStore';
	import Card from '$lib/kellyGame/Card.svelte';

	const bet = (percentage: number) => {
		gameStore.betPercentage(percentage);
	};

	const betChoices = [0.01, 0.05, 0.1, 0.2, 0.5, 0.75, 1];

	let selectedBet: number = 0;
</script>

<div>
	<h2>Choose how much to bet:</h2>
	<h2>
		You are betting {selectedBet * 100}% of your balance of {$gameStore.balance} which is {Math.round(
			selectedBet * $gameStore.balance
		)}
	</h2>
	<div class="row">
		{#each betChoices as choice}
			<Card
				on:click={() => bet(choice)}
				on:mouseenter={() => (selectedBet = choice)}
				on:mouseleave={(e) => (selectedBet = 0)}
			>
				{choice * 100}%
			</Card>
		{/each}
	</div>
</div>

<style>
	.row {
		display: flex;
		justify-content: space-between;
	}
</style>
