const fs = require('fs');
const readline = require('readline');
const parseline = require('./parseline');

const rs = fs.createReadStream('allCountries.txt');
const rl = readline.createInterface({ input: rs });

console.time(__filename);
rl.on('line', (line) => {
	parseline(line);
});
rl.on('close', () => console.timeEnd(__filename));