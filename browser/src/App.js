import React from 'react';

import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

import toHex from './util/toHex';

import Leaderboard from './components/Leaderboard/Leaderboard';
import Header from './components/Header/Header';

import getHistorical from './data/getHistorical';
import getUsers from './data/getUsers';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [
				{ name: '', points: [] },
			],
		};

		this.startDate = new Date(2017, 10, 1);
	}

	hoursSince(start) {
		const now = new Date();

		let diff = (now.getTime() - start.getTime()) / 1000;
		diff /= (60 * 60);
		return Math.abs(Math.round(diff));
	}

	componentDidMount() {
		const limit = this.hoursSince(this.startDate);
		getUsers()
			.then(({ users }) => users.map(user => {
				user.limit = limit;
				return user;
			}))
			.then(users => Promise.all(users.map(getHistorical)))
			.then(users => users.map(this.convertUserToDataset))
			.then(data => {
				console.log(data);
				this.setState({ data });
			})
	}

	convertUserToDataset(user) {
		console.log(user);
		return {
			name: user.symbol,
			color: toHex(user.symbol),
			points: user.raw.map(({ time, open, close }) => ({
				x: new Date(time*1000),
				y: ( open + close ) / 2,
			})),
		};
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
				<Header>Crypto cup</Header>
				<LineChart
					data={this.state.data}
					showLegends={true}
					interpolate={false}
					hidePoints={true}
					xDisplay={this.xDisplay}
				/>
				<Leaderboard data={this.state.data} />
			</div>
		);
	}

}
