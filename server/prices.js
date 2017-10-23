const db = require('./db');

module.exports = {
	append: (currency, data) => {
		return db.read(`currency-${currency}`)
			.then(history => {
				history = history || [];
				history.push(data);
				return db.write(`currency-${currency}`, history);
			});
	},

	get: currency => db.read(`currency-${currency}`),
};
