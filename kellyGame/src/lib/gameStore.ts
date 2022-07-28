import { derived, writable } from 'svelte/store';

export const INITIAL_BALANCE = 100;
const WIN_PERCENT = 0.6;

function createGameState() {
	const balanceStore = writable(INITIAL_BALANCE);
	const { set: setBalance, update: updateBalance } = balanceStore;

	const winHistoryStore = writable<number[]>([]);
	const { set: setWinHistory, update: updateWinHistory } = winHistoryStore;

	const balanceHistoryStore = writable<number[]>([INITIAL_BALANCE]);
	const { set: setBalanceHistory, update: updateBalanceHistory } = balanceHistoryStore;

	/**
	 * Bet a percentage (0-1) of the current balance. Double the winnings if the bet is won.
	 * Else lose everything that was bet.
	 */
	const betPercentage = (percent: number) => {
		const rand = Math.random();
		const win = rand < WIN_PERCENT;
		if (win) {
			updateBalance((balance) => {
				const newBalance = balance * (1 - percent) + percent * balance * 2;
				updateBalanceHistory((balanceHistory) => [...balanceHistory, newBalance]);
				return newBalance;
			});
			updateWinHistory((winHistory) => [...winHistory, 1]); // 1 means win
		} else {
			updateBalance((balance) => {
				const newBalance = balance * (1 - percent);
				updateBalanceHistory((balanceHistory) => [...balanceHistory, newBalance]);
				return newBalance;
			});
			updateWinHistory((winHistory) => [...winHistory, 0]); // 0 means loss
		}
	};

	const reset = () => {
		setBalance(INITIAL_BALANCE);
		setWinHistory([]);
		setBalanceHistory([INITIAL_BALANCE]);
	};

	const state = derived(
		[balanceStore, winHistoryStore, balanceHistoryStore],
		([$balance, $winHistory, $balanceHistory]) => {
			return {
				balance: Math.round($balance * 100) / 100,
				winHistory: $winHistory,
				balanceHistory: $balanceHistory
			};
		}
	);

	return {
		subscribe: state.subscribe,
		betPercentage,
		reset
	};
}

export const count = createGameState();

export default count;
