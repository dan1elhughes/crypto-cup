const url = 'https://gist.githubusercontent.com/dan1elhughes/41d31dc8604bb029c11552e75a902ac5/raw/';

const parse = csv => {
	const lines = csv.split(/\r?\n/);
	const header = lines.shift();

	const headers = header.split(',');

	const users = lines.filter(Boolean).map(line =>
		line.split(',').map((part, i) => ({
			property: headers[i],
			value: part,
		})).reduce((object, { property, value }) => {
			object[property] = value;
			return object;
		}, {})
	);

	return { users };
};


export default () => fetch(url).then(res => res.text()).then(parse);
