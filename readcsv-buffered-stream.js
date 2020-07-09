const fs = require('fs');
const rs = fs.createReadStream('allCountries.txt');
const parseline = require('./parseline');

console.time(__filename);
let remainder = '';
rs.on('data', (buf) => {
	const lines = (remainder + buf).split(/\r?\n/g);
	remainder = lines.pop();
	for (const line of lines) {
		parseline(line);
	}
});
rs.on('close', () => console.timeEnd(__filename));