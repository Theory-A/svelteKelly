<script lang="ts">
	export let values: number[];
	import Chart from 'chart.js/auto/auto.esm';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let chartHandle: any;

	onMount(() => {
		if (canvas) {
			var ctx = canvas.getContext('2d');
			var gradient = ctx!.createLinearGradient(0, 0, 0, 400);
			gradient.addColorStop(0, 'rgba(250,156,156,0.7)');
			gradient.addColorStop(1, 'rgba(200,200,250,0.7)');
			chartHandle = new Chart(canvas, {
				type: 'line',
				data: {
					labels: [1, 2, 3],
					datasets: [
						{
							data: [1, 2, 3],
							label: 'Balance',
							backgroundColor: gradient,
							borderColor: 'steelblue',
							tension: 0.3,
							fill: true,
							pointRadius: 1
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: {
							display: true
						},
						y: {
							display: true,
							type: 'logarithmic'
						}
					}
				}
			});
		}
	});

	$: {
		if (chartHandle) {
			chartHandle.data.datasets[0].data = values;
			chartHandle.data.labels = values.map((each, i) => i);
			chartHandle.update();
		}
	}
</script>

<div class="container">
	<canvas id="myChart" bind:this={canvas} />
</div>

<style>
	.container {
		height: 500px;
	}
</style>
