const { Router } = require('express');

const users = require('./apis/users');
const prices = require('./prices');

module.exports = Router()
	.get('/users', (req, res) => {
		users.get().then(users => res.send(users));
	})
	.get('/history/:currency', (req, res) => {
		const { currency } = req.params;

		prices.get(currency).then(history => {
			res.send({ history });
		});
	});
