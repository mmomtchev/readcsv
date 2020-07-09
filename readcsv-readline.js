const fs = require('fs');
const readline = require('readline');
const parseline = require('./parseline');

const rs = fs.createReadStream('allCountries.txt');
const rl = readline.createInterface({ input: rs });

(async () => {
	console.time(__filename);
	for await (const line of rl) {
		parseline(line);
	}
	console.timeEnd(__filename);
})();