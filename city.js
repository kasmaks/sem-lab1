const ALL_COINS = 1000000;
const PART_TO_GIVE = 0.001;

export default class City {

	countryName;
	neighbors = [];
	coins = [];
	cache = [];

	constructor(countryName, countryIndex, countriesNumber) {
		this.countryName = countryName;
		this.countriesNumber = countriesNumber;
		
		this.coins = new Array(countriesNumber).fill(0);
		this.cache = new Array(countriesNumber).fill(0);

		this.coins[countryIndex] = ALL_COINS;
	}

	isComplete() {
		return this.coins.every(coin => coin > 0);
	}

	moveCoinsToNeighbors() {
		this.coins.forEach((coin, index) => {
			const coinsToGive = Math.floor(PART_TO_GIVE * coin);
			for (const neighbor of this.neighbors) {
				neighbor.cache[index] += coinsToGive;
				this.coins[index] -= coinsToGive;
			}
		});
	}

	updateCoins() {
		this.coins.forEach((coin, index) => {
			this.coins[index] += this.cache[index];
			this.cache[index] = 0;
		});
	}
}