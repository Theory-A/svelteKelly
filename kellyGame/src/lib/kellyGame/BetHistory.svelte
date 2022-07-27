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
		{numWins} wins over {winHistory.length} total flips
	</h2>
	<h2>
		Realized Win Percentage: {realizedWinPercentage}
	</h2>
</div>

<style>
	.results {
		display: flex;
		flex-wrap: wrap;
	}
	.box {
		display: inline-block;
		width: 1em;
		height: 1em;
		border: 1px solid white;
	}
	.win {
		background-color: #34d399ee;
	}
	.loss {
		background-color: #991b1bee;
	}
</style>
