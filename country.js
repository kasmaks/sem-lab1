import Eurozone from "./euroZone";

export default class Country {

	constructor(name, x1, y1, x2, y2) {
		if (x1 > x2 || y1 > y2) {
			throw new Error("Valid coordinates should be provided");
		}

		if (x1 < 0 || y1 < 0 || x2 > Eurozone.MAX_X || y2 > Eurozone.MAX_Y) {
			throw new Error("Provided coordinates should be within [0; MAX_X/MAX_Y] range");
		}

		this.name = name;
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.cities = [];
	}

	addCity(city) {
		this.cities.push(city);
	}

	isComplete() {
		return this.cities.every(city => city.isComplete());
	}
}