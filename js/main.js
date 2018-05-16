window.onload = () => {

	// id-oldprice-newprice

	const generateObjectVariant = ['js', 'php'];

	const patterJs = {
		open: () => `[\n`,
		id0: (id) => `\t{'${id}': `,
		id1: (oldPrice) => `{oldPrice: ${oldPrice}, `,
		id2: (newPrice) => `newPrice: ${newPrice}}},\n`,
		close: () => `]\n`
	};

	const patterPhp = {
		open: () => `[\n`,
		id0: (id) => `\t'${id}' => `,
		id1: (oldPrice) => `[${oldPrice}, `,
		id2: (newPrice) => `${newPrice}],\n`,
		close: () => `]\n`
	};

	const input = document.getElementById('main-input');

	let arr = [];

	input.oninput = () => {
		//console.log(input.value);
		arr = input.value.split('\n');
		console.log(arr);
	}

	arr = input.value.split('\n');

	let start = true;
	let size = arr.length;
	let ids = Object.keys(patterJs).length - 2;
	let count = 0;
	let resultJs = ``;

	arr.map(line => {
		count++;
		let lineArr = line.split('\t');
		if (start) {
			resultJs += patterJs.open();
			start = false;
		}
		resultJs += patterJs.id0(lineArr[0]);
		resultJs += patterJs.id1(lineArr[1]);
		resultJs += patterJs.id2(lineArr[2]);
		if (count >= size) {
			resultJs += patterJs.close();
			start = true;
			count = 0;
		}
	});

	console.log(resultJs);

	////////////////////////////////////////

	ids = Object.keys(patterPhp).length - 2;
	let resultPhp = ``;

	arr.map(line => {
		count++;
		let lineArr = line.split('\t');
		if (start) {
			resultPhp += patterPhp.open();
			start = false;
		}
		resultPhp += patterPhp.id0(lineArr[0]);
		resultPhp += patterPhp.id1(lineArr[1]);
		resultPhp += patterPhp.id2(lineArr[2]);
		if (count >= size) {
			resultPhp += patterPhp.close();
		}
	});

	console.log(resultPhp);

}
