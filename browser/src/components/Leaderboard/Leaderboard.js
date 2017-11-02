import React from 'react';
import PropTypes from 'prop-types';

import './Leaderboard.css';

const Leaderboard = ({ data }) => (
	<div className="Leaderboard">
		<p>Leaderboard</p>
		<pre>{JSON.stringify(data, null, 4)}</pre>
	</div>
);

Leaderboard.propTypes = {
	data: PropTypes.array.isRequired,
};

export default Leaderboard;
