import { derived, writable } from 'svelte/store';

const INITIAL_BALANCE = 100;
const WIN_PERCENT = 0.6;

function createGameState() {
	// const { subscribe: balance, set: setBalance, update: updateBalance } = writable(INITIAL_BALANCE);

	// const { subscribe: history, set: setHistory, update: updateHistory } = writable<number[]>([]);

	const balanceStore = writable(INITIAL_BALANCE);
	const { subscribe: balance, set: setBalance, update: updateBalance } = balanceStore;

	const historyStore = writable<number[]>([]);
	const { subscribe: history, set: setHistory, update: updateHistory } = historyStore;

	/**
	 * Bet a percentage (0-1) of the current balance. Double the winnings if the bet is won.
	 * Else lose everything that was bet.
	 */
	const betPercentage = (percent: number) => {
		const rand = Math.random();
		const win = rand < WIN_PERCENT;
		if (win) {
			updateBalance((balance) => {
				return balance * (1 - percent) + percent * balance * 2;
			});
			updateHistory((history) => {
				return [...history, 1]; // 1 means win
			});
		} else {
			updateBalance((balance) => {
				return balance * (1 - percent);
			});
			updateHistory((history) => {
				return [...history, 0]; // 0 means loss
			});
		}
	};

	const reset = () => {
		setBalance(INITIAL_BALANCE);
		setHistory([]);
	};

	const state = derived([balanceStore, historyStore], ([$balance, $history]) => {
		return {
			balance: Math.round($balance * 100) / 100,
			history: $history
		};
	});

	return {
		subscribe: state.subscribe,
		betPercentage,
		reset
	};
}

export const count = createGameState();

export default count;
