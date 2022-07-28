<script lang="ts">
	// Test passing props
	export let winHistory: number[];

	$: numWins = winHistory.filter((each) => each === 1).length;
	$: realizedWinPercentage = `${Math.round((numWins / winHistory.length) * 100 * 100) / 100}%`;
</script>

<div class="container">
	<div class="results">
		{#each winHistory as result}
			{#if result === 1}
				<span class="box win" />
			{:else}
				<span class="box loss" />
			{/if}
		{/each}
	</div>
	<h2>
		<b>{numWins}</b> wins over <b>{winHistory.length}</b> total flips
	</h2>
	<h2>
		Realized Win Percentage: <b>{realizedWinPercentage}</b>
	</h2>
</div>

<style>
	.results {
		display: flex;
		flex-wrap: wrap;
	}
	.box {
		display: inline-block;
		width: 0.5em;
		height: 0.5em;
		border: 1px solid white;
	}
	.win {
		background-color: #34d399ee;
	}
	.loss {
		background-color: #f47372ee;
	}
</style>
