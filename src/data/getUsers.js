import { users } from '../config.json';

const url = users;

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
