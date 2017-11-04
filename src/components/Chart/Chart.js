import React from 'react';
import PropTypes from 'prop-types';

import './Chart.css';

import LineChart from 'react-linechart';
import 'react-linechart/dist/styles.css';

const xDisplay = xValue => {
	const d = new Date(xValue);

	const formattedTime = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
	return formattedTime;
};

const chartConfig = {
	showLegends: true,
	interpolate: false,
	hidePoints: true,
	xDisplay: xDisplay,
	xLabel: 'Date',
	yLabel: 'Value of initial stake (GBP)',
};

const Chart = ({ data }) => (
	<div className="Chart">
		<LineChart
			data={data}
			{...chartConfig}
		/>
		<p>Chart</p>
	</div>
);

Chart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		username: PropTypes.string.isRequired,
		picture: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
		points: PropTypes.arrayOf(PropTypes.shape({
			x: PropTypes.instanceOf(Date).isRequired,
			y: PropTypes.number.isRequired,
		})),
	})).isRequired,
};

export default Chart;
