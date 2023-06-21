import fs from "fs";

export default class FileReader {

	static parseInputFile = (filename) => {
		if (!filename) {
			throw new Error("The name of the file cannot be blank");
		}
		
		const input = fs.readFileSync(filename).
							toString().
							split("\n").
							map(line => line.replace("\r",""));

		const countriesMatrix = [];
		let index = 0;
		let line = input[index];
		while (line !== "0") {
			let countriesNumber = parseInt(line);
			if (!Number.isNaN(countriesNumber)) {
				const countries = [];
				for (let i = 0; i < countriesNumber; i++) {
					countries.push(input[++index].trim());
				}
				countriesMatrix.push(countries);
			}
			line = input[++index];
		}
		
		return countriesMatrix;
	};
};