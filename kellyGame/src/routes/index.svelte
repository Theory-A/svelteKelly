<script lang="ts">
	import Button from '$lib/Button.svelte';
	import gameStore, { INITIAL_BALANCE } from '$lib/gameStore';
	import BetHistory from '$lib/kellyGame/BetHistory.svelte';
	import BetSelectors from '$lib/kellyGame/BetSelectors.svelte';
	import Card from '$lib/kellyGame/Card.svelte';
	import Chart from '$lib/kellyGame/Chart.svelte';
	import Solution from '$lib/kellyGame/Solution.svelte';
	import _ from 'lodash';

	$: balanceHistory = $gameStore.balanceHistory;
	$: previousBalance =
		balanceHistory.length > 1 ? _.round(balanceHistory[balanceHistory.length - 2], 2) : null;
	$: lastFlipResult = previousBalance && _.round($gameStore.balance - previousBalance, 2);
	$: totalGains = _.round(($gameStore.balance / INITIAL_BALANCE) * 100 - 100);
	$: gameIsActive = balanceHistory.length > 1;

	let showSolution = false;
</script>

<div class="container">
	<div class="header">
		<h1>Kelly Criterion Game</h1>
		<Button on:click={gameStore.reset}>Reset</Button>
		<Button on:click={() => (showSolution = true)}>Solution</Button>
	</div>
	<div class="content">
		<div class="controls">
			<div class="top-section">
				<table>
					{#if gameIsActive}
						<tr>
							<td>Previous Balance:</td>
							<td><Card>{previousBalance?.toLocaleString()}</Card></td>
						</tr>
					{/if}
					{#if gameIsActive}
						<tr>
							<td>Result from Last Flip:</td>
							<td>
								<Card color={lastFlipResult && lastFlipResult < 0 ? '#f47372' : '#04b885'}>
									${lastFlipResult?.toLocaleString()}
								</Card>
							</td>
						</tr>
					{/if}
					<tr>
						<td>Current Balance: </td>
						<td><Card>${$gameStore.balance.toLocaleString()}</Card></td>
					</tr>
					{#if gameIsActive}
						<tr>
							<td>After {$gameStore.winHistory.length} flips you are:</td>
							<td>
								<Card color={totalGains && totalGains < 0 ? '#f47372' : '#04b885'}>
									{#if totalGains > 0}+{/if}{totalGains}%
								</Card>
							</td>
						</tr>
					{/if}
				</table>
				{#if $gameStore.winHistory.length > 0}
					<BetHistory winHistory={$gameStore.winHistory} />
				{:else}
					<p>
						Each round you have a <b>60%</b> chance to win and double what you bet and a
						corresponding <b>40%</b>
						chance of losing all of what you bet. How would you bet in order to maximize the amount of
						money in the shortest amount of time?
					</p>
				{/if}
			</div>
			<BetSelectors />
		</div>
		<div>
			<div class="chart-header">
				<Card>${$gameStore.balance.toLocaleString()}</Card>
			</div>
			<Chart values={$gameStore.balanceHistory} />
		</div>
	</div>
	<Solution show={showSolution} onClose={() => (showSolution = false)} />
</div>

<style>
	.container {
		width: 100%;
		max-width: 2560px;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(120deg, rgba(26, 34, 237, 1) 0%, rgba(255, 0, 138, 1) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	td {
		padding-bottom: 0.5em;
	}

	.content {
		display: flex;
	}

	.content > div {
		flex-basis: 50%;
	}

	.controls {
		height: 60vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.chart-header {
		text-align: center;
	}

	@media (max-width: 800px) {
		.content {
			flex-direction: column;
		}
		.controls {
			margin-bottom: 4em;
		}
	}
</style>
