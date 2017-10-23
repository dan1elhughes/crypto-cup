const axios = require('axios');

const endpoint = currency => `https://api.coinmarketcap.com/v1/ticker/${currency}/?convert=GBP`;

module.exports = {
	get: currency => axios.get(endpoint(currency)),
};
