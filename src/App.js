import React from 'react';

import toHex from './util/toHex';

import Chart from './components/Chart/Chart';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Header from './components/Header/Header';

import getHistorical from './data/getHistorical';
import getUsers from './data/getUsers';
import calculateGain from './data/calculateGain';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
		};

		this.startDate = new Date(2017, 10, 2);
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
				this.setState({ data });
			});
	}

	convertUserToDataset(user) {
		const initial = user.raw[0];
		return {
			username: user.username,
			picture: `https://api.skype.com/users/${user.skype}/profile/avatar`,
			name: user.symbol,
			color: toHex(user.symbol),
			points: user.raw.map(point => ({
				x: new Date(point.time*1000),
				y: calculateGain({ initial, point }),
			})),
		};
	}

	render() {
		return (
			<div className="App">
				<Header>Crypto cup</Header>
				<Chart
					data={this.state.data}
				/>
				<Leaderboard data={this.state.data} />
			</div>
		);
	}

}
