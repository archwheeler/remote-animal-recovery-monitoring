import React from 'react';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class LoadForm extends React.Component {
	render() {
		return (
			<Card>
					<CardHeader title= "George"
								subtitle="Age 13, Male, Labradoodle, QVSH Ref: 1932"
								avatar={<Avatar>G</Avatar>}
					/>
					<CardMedia>
						<iframe src = "Printable_LOAD_Form.pdf" width="100%" height="600" frameBorder="none"></iframe>
					</CardMedia>
			</Card>
		);
	}
}

export default LoadForm;
