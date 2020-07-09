const fs = require('fs');
const parseline = require('./parseline');

const rs = fs.createReadStream('allCountries.txt');
let t0 = 0, t1 = 0;

const nl = '\n'.charCodeAt(0);

(async () => {
	console.time(__filename);
	let remainder = '';
	for await (const buf of rs) {
		const t = Date.now();
		let start = 0;
		let end;
		t0 += Date.now() - t;
		while ((end = buf.indexOf(nl, start)) !== -1) {
			const t = Date.now();
			if (start == 0 && remainder.length > 0) {
				parseline(remainder + buf.slice(0, end));
				remainder = '';
			} else
				parseline(buf, start);
			start = end + 1;
			t1 += Date.now() - t;
		}
		remainder = buf.slice(start);
	}
	console.timeEnd(__filename);
	console.log(t0, t1);
})();