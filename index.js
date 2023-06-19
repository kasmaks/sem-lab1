import fs from "fs";

import FileReader from "./fileReader.js";
import Country from "./country.js";
import Eurozone from "./eurozone.js";

const playGame = (countriesStringMatrix) => {
	const countries = [];
	for (const countryString of countriesStringMatrix) {
		const country = new Country(...countryString.split(" "));
		countries.push(country);
	}
	const eurozone = new Eurozone(countries);
	const resultMap = eurozone.startGame();
	let resultString = "";
	resultMap.forEach((value, key) => {
		resultString += `${key} ${value} \n`;
	});

	return resultString;
};

const countriesStringMatrix = FileReader.parseInputFile("input.txt");

let result = "";

countriesStringMatrix.forEach((countries, i) => {
	result += `Case Number ${i + 1}\n`;
	result += playGame(countries);
});

fs.writeFileSync("output.txt", result);