import React from 'react';
import {Card, CardHeader, CardText, CardMedia, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class VetNewForm extends React.Component {
	render() {
		return (
			<Card>
				<CardHeader title="New Survey"/>
				<CardText>
						Please complete the following questionnare to help monitor your dog's progress:
				</CardText>
				<CardMedia>
				<iframe src="https://docs.google.com/forms/u/0/" width="100%" height="400" frameBorder="0">Loading…</iframe>
				</CardMedia>

			</Card>
		);
	}
}

export default VetNewForm;
