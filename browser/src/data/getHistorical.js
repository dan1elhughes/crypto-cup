const url = ({
	symbol,
	limit,
}) => `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=GBP&limit=${limit}`;

export default user => fetch(url(user))
	.then(res => res.json())
	.then(({ Data }) => {
		user.raw = Data;
		return user;
	});
