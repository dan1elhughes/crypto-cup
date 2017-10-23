const prices = require('../prices');
const db = require('../db');
const coinmarket = require('../apis/coinmarket');
const users = require('../apis/users');

const updateCurrency = currency => coinmarket.get(currency).then(({ data }) => {
	const {
		price_gbp: price,
		last_updated: timestamp,
	} = data[0];

	console.log({ currency, price, timestamp });

	const item = { price, timestamp };
	return prices.append(currency, item);
});


users.get().then(({ users }) => {
	// console.log(users);
	const currencies = users.map(user => user.currency);
	console.log(currencies);
	Promise.all(currencies.map(updateCurrency)).then(db.quit);
});
