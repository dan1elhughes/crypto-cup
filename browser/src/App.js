import React from 'react';

export default class Module extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		fetch('/api/history/Bitcoin')
			.then(res => res.json())
			.then(data => this.setState({ data }));
	}

	render() {
		return (
			<div className="Module">
				<pre>
					{JSON.stringify(this.state.data)}
				</pre>
			</div>
		);
	}

}
