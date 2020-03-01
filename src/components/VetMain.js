import React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import { FlatButton, CardTitle } from 'material-ui';
import {store} from "../store"



class VetMain extends React.Component {
	render() {
		return (
			(store.getState().loggedIn && store.getState().vetAccount)?
			<div>
				<Card>
					<CardTitle title= "Chats"
					/>
					<CardText>
						Please click the button below to see the chats.
					</CardText>
					<CardActions>
						<FlatButton label="Chats" href="/#/VetChat"/>
					</CardActions>
				</Card>
				<Card>
					<CardTitle title= "Create New Questionnaire"
					/>
					<CardText>
						Please click the button below to create a new survey.
					</CardText>
					<CardActions>
						<FlatButton label="Create" href="/#/VetNewQuestionnaire"/>
					</CardActions>
				</Card>
				<Card>
					<CardTitle title= "Create New Survey"
					/>
					<CardText>
						Please click the button below to create a new survey.
					</CardText>
					<CardActions>
						<FlatButton label="Create" href="/#/VetNewSurvey"/>
					</CardActions>
				</Card>
				<Card>
					<CardTitle title= "Create/Update discharge information"
					/>
					<CardText>
						Select a user if updating and then click the button below.
					</CardText>
					<CardActions>
						<FlatButton label="Create New Animal" href="/#/VetNewAnimal"/>
						<FlatButton label="Update discharge information" href="/#/VetInformationInput"/>
					</CardActions>
				</Card>
			</div>
			:<div>
			{window.location.assign("/")}
            </div>
		);
	}
}

export default VetMain;
