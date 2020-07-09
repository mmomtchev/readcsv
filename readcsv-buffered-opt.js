const fs = require('fs');
const parseline = require('./parseline');

const rs = fs.createReadStream('allCountries.txt');
let t0 = 0, t1 = 0;

const nl = '\n'.charCodeAt(0);

(async () => {
	console.time(__filename);
	let remainder = '';
	for await (const buf of rs) {
		let start = 0;
		let end;
		while ((end = buf.indexOf(nl, start)) !== -1) {
			if (start == 0 && remainder.length > 0) {
				parseline(remainder + buf.slice(0, end));
				remainder = '';
			} else
				parseline(buf, start);
			start = end + 1;
		}
		remainder = buf.slice(start);
	}
	console.timeEnd(__filename);
})();