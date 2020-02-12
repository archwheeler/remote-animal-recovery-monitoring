import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

class Main extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<CardHeader title= "NAME"
								avatar={<Avatar>N</Avatar>}
					/>
					<CardText>
					Animal’s name was presented to the Queen’s Veterinary School Hospital on date for further investigation into *mild/moderate/severe, left/right hindlimb/forelimb lameness of ….duration*. *Progression of lameness*. *Other medical issues*. *Current exercise regime and current medication. You reported that animal’s name was otherwise well at the time of presentation.
					</CardText>
				</Card>
				
			</div>
		);
	}
}

export default Main;
