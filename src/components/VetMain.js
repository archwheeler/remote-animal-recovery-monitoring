import React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import { FlatButton, CardTitle } from 'material-ui';



class VetMain extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<CardTitle title= "Chats"
					/>
					<CardText>
						Please click the button below to see the chats.
					</CardText>
					<CardActions>
						<FlatButton></FlatButton>
					</CardActions>
				</Card>
				<Card>
					<CardTitle title= "Create New Survey"
					/>
					<CardText>
						Please click the button below to see the chats.
					</CardText>
					<CardActions>
						<FlatButton></FlatButton>
					</CardActions>
				</Card>
				<Card>
					<CardTitle title= "Chats"
					/>
					<CardText>
						Please click the button below to see the chats.
					</CardText>
					<CardActions>
						<FlatButton></FlatButton>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default VetMain;
