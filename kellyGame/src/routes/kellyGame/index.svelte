<script lang="ts">
	import gameStore, { INITIAL_BALANCE } from '$lib/gameStore';
	import BetHistory from '$lib/kellyGame/BetHistory.svelte';
	import BetSelectors from '$lib/kellyGame/BetSelectors.svelte';
	import Card from '$lib/kellyGame/Card.svelte';
	import { round } from 'lodash';

	$: balanceHistory = $gameStore.balanceHistory;
	$: previousBalance =
		balanceHistory.length > 1 ? round(balanceHistory[balanceHistory.length - 2], 2) : null;
	$: lastFlipResult = previousBalance && round($gameStore.balance - previousBalance, 2);
	$: totalGains = `${round(($gameStore.balance / INITIAL_BALANCE) * 100 - 100)}%`;
</script>

<div class="container">
	<h1>Kelly Criterion Game</h1>
	<div class="content">
		<div class="controls">
			<table>
				<tr>
					<td>Previous Balance:</td>
					<td><Card>{previousBalance}</Card></td>
				</tr>
				<tr>
					<td>Result from Last Flip:</td>
					<td><Card>${lastFlipResult}</Card></td>
				</tr>
				<tr>
					<td>Current Balance: </td>
					<td><Card>${$gameStore.balance.toLocaleString()}</Card></td>
				</tr>
				<tr>
					<td>After {$gameStore.winHistory.length} flips you are:</td>
					<td><Card>{totalGains}</Card></td>
				</tr>
			</table>
			{#if $gameStore.winHistory.length > 0}
				<BetHistory winHistory={$gameStore.winHistory} />
			{:else}
				<p>
					Each round you have a 60% chance to win and double what you bet and a corresponding 40%
					chance of losing all of what you bet. How would you bet in order to maximize the amount of
					money in the shortest amount of time?
				</p>
			{/if}
			<BetSelectors />
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

	td {
		padding-bottom: 0.5em;
	}

	.content {
		display: flex;
	}

	.content > div {
		flex-basis: 50%;
	}
</style>
