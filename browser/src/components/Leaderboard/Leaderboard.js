import React from 'react';
import PropTypes from 'prop-types';

import './Leaderboard.css';

const sortByFinalGain = currencies => currencies.map(currency => {
	currency.last = currency.points.slice(-1)[0];
	return currency;
}).sort((a, b) => b.last.y - a.last.y);

const Leaderboard = ({ data: users }) => (
	<div className="Leaderboard">
		<table>
			<thead>
				<tr>
					<th>Entrant</th>
					<th>Currency</th>
					<th>Value of stake</th>
				</tr>
			</thead>
			<tbody>
				{ sortByFinalGain(users).map(user => (
					<tr key={user.username || 'Loading'}>
						<td><img src={user.picture} alt=""/><br/>{user.username}</td>
						<td>{user.name}</td>
						<td>£{user.last ? user.last.y.toFixed(4) : ''}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

Leaderboard.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		points: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.instanceOf(Date).isRequired,
			y: PropTypes.number.isRequired,
		})).isRequired,
	})).isRequired,
};

export default Leaderboard;
