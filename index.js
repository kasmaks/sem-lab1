import FileReader from "./fileReader.js";
import Country from "./country.js";
import Eurozone from "./eurozone.js";

const playGame = (countriesStringMatrix) => {
	const countries = [];
	for (const countryString of countriesStringMatrix) {
		const country = new Country(...countryString.split(" "));
		countries.push(country);
	}
	console.log(countries);
	const eurozone = new Eurozone(countries);
	console.log(JSON.stringify(eurozone.startGame()));
};

const countriesStringMatrix = FileReader.parseInputFile("input.txt");
console.log(countriesStringMatrix);

countriesStringMatrix.forEach((countries, i) => {
	console.log(i);
	playGame(countries);
});