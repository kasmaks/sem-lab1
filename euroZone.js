import City from "./city.js";

export default class Eurozone {

	static MAX_X = 10;
	static MAX_Y = 10;

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
		for (let x = 0; x <= this.MAX_X; x++) {
			for (let y = 0; y <= this.MAX_Y; y++) {
				const city = this.cities.get(this.getCityKey(x, y));
				if (!city) {
					continue;
				}

				this.addLeftNeighbor(x, y, city);
				this.addRightNeighbor(x, y, city);
				this.addBottomNeighbor(x, y, city);
				this.addTopNeighbor(x, y, city);
			}
		}
	}

	addLeftNeighbor = (x, y, city) => {
		if (x > 1) {
			const leftNeighbor = this.cities.get(this.getCityKey(x - 1, y));
			if (leftNeighbor) {
				city.neighbors.push(leftNeighbor);
			}
		}
	}
	
	addRightNeighbor = (x, y, city) => {
		if (x < this.MAX_X - 1) {
			const rightNeighbor = this.cities.get(this.getCityKey(x + 1, y));
			if (rightNeighbor) {
				city.neighbors.push(rightNeighbor);
			}
		}
	}

	addBottomNeighbor = (x, y, city) => {
		if (y > 1) {
			const bottomNeighbor = this.cities.get(this.getCityKey(x, y - 1));
			if (bottomNeighbor) {
				city.neighbors.push(bottomNeighbor);
			}
		}
	}

	addTopNeighbor = (x, y, city) => {
		if (y < this.MAX_Y - 1) {
			const topNeighbor = this.cities.get(this.getCityKey(x, y + 1));
			if (topNeighbor) {
				city.neighbors.push(topNeighbor);
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