import React from 'react';

export default class Module extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		fetch('/api')
			.then(res => res.json())
			.then(({ message }) => this.setState({ message }));
	}

	render() {
		return (
			<div className="Module">{this.state.message}</div>
		);
	}

}
