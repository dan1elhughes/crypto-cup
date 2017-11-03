const getMidMarket = ({ open, close }) => ( open + close ) / 2;

export default ({ initial, point }) => {
	const initialValue = getMidMarket(initial);
	const currentValue = getMidMarket(point);

	const currencyPurchased = 10 / initialValue;

	const currentWorth = currencyPurchased * currentValue;
	return currentWorth;
};
