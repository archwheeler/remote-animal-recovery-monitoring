import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import {store} from '../store';


class VetNewQuestionnaire extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionnaire:{
				vetTeamID: null, //User ID of the vet team
				link: "", //Link to the survey
				time_to_send: null, //In no of weeks
				name: "", //Name of questionnaire
			}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	};	

	returnInformation = async () => {
        const response = await fetch('http://localhost:5000/addNewQuestionnaire/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(this.state.questionnaire)
        });
        const body = await response.json();
        this.setState({ responseToPost: body.uid });
	};
	
	handleSubmit(event) {
		this.state.questionnaire.name = document.getElementById("name").value;
		this.state.questionnaire.vetTeamID = store.getState().data.userId;
		this.state.questionnaire.link = document.getElementById("link").value;
		this.returnInformation();
		window.location.assign("/#/VetMain");
	}


	handleChange(event, index, value) {
		this.setState({
			...this.state,
			questionnaire: {
				...this.state.questionnaire,
				time_to_send: value
			}
		});
	}

	render() {
		return (
			(store.getState().loggedIn && store.getState().vetAccount)?
			<div>
				<Card>
					<CardHeader title= "Create New Survey"
					/>
					<CardText>
						To add a new questionnaire please click <a href="https://docs.google.com/forms/u/0/">here</a> and create a new form. Once you have created the form click the send button and then the link button to get a shareable link to the form. Then copy and paste the link below and click submit.
						<br />
						<TextField 
						 	id="name"
						 	floatingLabelText="Name"/>
						<br />
						<SelectField
						id="TTS"
						floatingLabelText="Time to Send after surgery in weeks"
						value={this.state.questionnaire.time_to_send}
						onChange={this.handleChange}
						>
							<MenuItem value={1} primaryText="1" />
							<MenuItem value={2} primaryText="2" />
							<MenuItem value={3} primaryText="3" />
							<MenuItem value={4} primaryText="4" />
							<MenuItem value={5} primaryText="5" />
							<MenuItem value={6} primaryText="6" />
							<MenuItem value={7} primaryText="7" />
							<MenuItem value={8} primaryText="8" />
						</SelectField>
						<br />

						 <TextField 
						 	id="link"
						 	floatingLabelText="Link"/>
						<br />
						<RaisedButton label="Submit" primary={true} onClick={this.handleSubmit}/>

					</CardText>
				</Card>
			</div>
			:<div>
			{window.location.assign("/")}
			</div>
		);
	}
}

export default VetNewQuestionnaire;
