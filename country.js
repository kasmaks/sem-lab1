
export default class Country {

	x1;
	y1;
	x2;
	y2;
	name;
	cities = [];

	constructor(name, x1, y1, x2, y2) {
		this.name = name;
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	addCity(city) {
		this.cities.push(city);
	}

	isComplete() {
		return this.cities.every(city => city.isComplete());
	}
}