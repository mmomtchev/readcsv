/*
* This illustrates the September 2020 update to the medium story
* On some platforms and some node versions (Node 14 on Linux is one example),
* this will be a little bit faster.
* It uses String.prototype.indexOf instead of Buffer.prototype.indexOf
* Buffer.prototype.indexOf has a JS layer on top of the C++ layer which
* adds two function calls
* Because of this, it can be a little bit slower - especially when called
* very often with very few data
*/

const fs = require('fs');

const rs = fs.createReadStream('allCountries.txt');
rs.setEncoding('utf-8'); /* return String and not Buffer */

let counter = 0;
function parseline(line, start) {
	const f0 = line.indexOf('\t', start || 0);
	const f1 = line.indexOf('\t', f0 + 1);
	const data1 = line.substring(f0 + 1, f1);
	if (data1 && data1.match(/^Paris$/g))
		counter++;
}

(async () => {
	console.time(__filename);
	let remainder = '';
	for await (const buf of rs) {
		let start = 0;
		let end;
		while ((end = buf.indexOf('\n', start)) !== -1) {
			if (start == 0 && remainder.length > 0) {
				parseline(remainder + buf);
				remainder = '';
			} else
				parseline(buf, start);
			start = end + 1;
		}
		remainder = buf.substring(start);
	}
	console.timeEnd(__filename);
})();