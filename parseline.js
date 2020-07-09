let counter = 0;

const tab = '\t'.charCodeAt(0);

function parseline3(line, start) {
	const f0 = line.indexOf(tab, start || 0);
	const f1 = line.indexOf(tab, f0 + 1);
	const data1 = line.slice(f0 + 1, f1).toString();
	if (data1 && data1.match(/^Paris$/g))
		counter++;
}

function parseline2(line) {
	const f0 = line.indexOf('\t');
	const f1 = line.indexOf('\t', f0 + 1);
	const data1 = line.slice(f0 + 1, f1);
	if (data1 && data1.match(/^Paris$/g))
		counter++;
}

function parseline1(line) {
	const data = line.split('\t');
	if (data[1] && data[1].match(/^Paris$/g))
		counter++;
}

module.exports = parseline3;