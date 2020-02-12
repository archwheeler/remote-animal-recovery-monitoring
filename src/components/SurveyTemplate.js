import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Main extends React.Component {
	render() {
		return (
			
			<div>
				<Card>
					<CardText>
						Please complete the following survey:
					</CardText>
					<CardMedia>
					<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe3uN1_Ew1C3pvMUUtUK1eU0vZGpslGZsqlIrOMq9ka4UjrpQ/viewform?embedded=true" width="100%" height="400" frameBorder="0">Loading…</iframe>
					</CardMedia>
				</Card>
			</div>
		);
	}
}

export default Main;
