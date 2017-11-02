import React from 'react';

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

import toHex from './util/toHex';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [
				{ name: '', points: [] },
			],
		};
	}

	componentDidMount() {
		fetch('/api')
			.then(res => res.json())
			.then(response => {
				this.setState({ data: this.parseData(response) });
			});
	}

	parseData(data) {
		return data.map(({ id, points }) => ({
			name: id,
			points: points.map(point => {
				const [ x, y ] = point.split(',').map(_ => parseInt(_, 10));
				return { x, y };
			}),
			color: toHex(id),
		}));
	}

	xDisplay(x) {
		const date = new Date(x * 1000);
		const hours = date.getHours();
		const minutes = '0' + date.getMinutes();
		const seconds = '0' + date.getSeconds();

		const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		return formattedTime;
	}

	render() {
		return (
			<div className="App">
				<pre>{JSON.stringify(this.state, null, 4)}</pre>
				<LineChart
					width={600}
					height={400}
					data={this.state.data}
					showLegends={true}
					// isDate={true}
					interpolate={false}
					xDisplay={this.xDisplay}
				/>
			</div>
		);
	}

}
