import React from 'react';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class Main extends React.Component {
	render() {
		return (
			
			<div>
				<Card>
					<CardHeader title= "George"
								subtitle="Age 13, Male, Labradoodle, QVSH Ref: 1932"
								avatar={<Avatar>G</Avatar>}
					/>
					<CardText>
						Please complete the following questionnare to help monitor your dogs progress:
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
