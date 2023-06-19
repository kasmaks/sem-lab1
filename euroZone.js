import City from "./city.js";

const MAX_X = 10;
const MAX_Y = 10;

export default class Eurozone {

	countires;
	cities = new Map();

	constructor(countires) {
		this.countires = countires;

		this.initCities();
		this.initCitiesNeighbors();
	}

	initCities = () => {
		const countriesNumber = this.countires.length;
		this.countires.forEach((country, index) => {
			for (let x = country.x1; x <= country.x2; x++) {
				for (let y = country.y1; y <= country.y2; y++) {
					const city = new City(country.name, index, countriesNumber);
					this.cities.set(this.getCityKey(x, y), city);
					country.addCity(city);
				}
			}
		});
	}

	initCitiesNeighbors() {
		for (let x = 0; x <= MAX_X; x++) {
			for (let y = 0; y <= MAX_Y; y++) {
				const city = this.cities.get(this.getCityKey(x, y));
				if (!city) {
					continue;
				}

				if (x > 1) {
					const leftNeighbor = this.cities.get(this.getCityKey(x - 1, y));
					if (leftNeighbor) {
						city.neighbors.push(leftNeighbor);
					}
				}

				if (x < MAX_X - 1) {
					const rightNeighbor = this.cities.get(this.getCityKey(x + 1, y));
					if (rightNeighbor) {
						city.neighbors.push(rightNeighbor);
					}
				}

				if (y > 1) {
					const bottomNeighbor = this.cities.get(this.getCityKey(x, y - 1));
					if (bottomNeighbor) {
						city.neighbors.push(bottomNeighbor);
					}
				}

				if (y < MAX_Y - 1) {
					const topNeighbor = this.cities.get(this.getCityKey(x, y + 1));
					if (topNeighbor) {
						city.neighbors.push(topNeighbor);
					}
				}
			}
		}
	}

	startGame = () => {
		const result = new Map();

		let iterations = 0;
		do {
			for (const country of this.countires) {
				for (const city of country.cities) {
					city.moveCoinsToNeighbors();
				}

				if (country.isComplete()) {
					if (!result.has(country.name)) {
						result.set(country.name, iterations);
					}
				}
			}

			for (const country of this.countires) {
				for (const city of country.cities) {
					city.updateCoins();
				}
			}

			iterations++;
		} while (!this.areAllCitiesCompleted());

		for (const country of this.countires) {
			if (country.isComplete()) {
				if (!result.has(country.name)) {
					result.set(country.name, iterations);
				}
			}
		}

		return result;
	}

	areAllCitiesCompleted = () => {
		return this.countires.every(country => country.isComplete());
	}

	getCityKey = (x, y) => {
		return `${x}-${y}`;
	}
}