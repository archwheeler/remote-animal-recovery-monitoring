import React from 'react';
import {Card, CardHeader, CardText, Banner} from 'material-ui/Card';

class Main extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<CardHeader><a href="/DogInformation">Dog Information</a></CardHeader>
				</Card>
				<Card>
					<CardHeader>Information</CardHeader>
				</Card>
			</div>
		);
	}
}

export default Main;
