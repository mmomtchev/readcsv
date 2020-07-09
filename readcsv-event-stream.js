const fs = require('fs');
const es = require('event-stream');
const parseline = require('./parseline');


const rs = fs.createReadStream('allCountries.txt');
console.time(__filename);
rs.pipe(es.split()).pipe(es.through((line) => {
	parseline(line);
}));
rs.on('close', () => console.timeEnd(__filename));