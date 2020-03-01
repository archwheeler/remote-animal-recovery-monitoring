import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import {store} from '../store';

class VetNewSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: [],
			survey:{
				vetTeamID: null, //User ID of the vet team
				link: "", //Link to the survey
				location: "", //Location being targeted
			}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	};	

	returnInformation = async () => {
        const response = await fetch('http://localhost:5000/addNewSurvey/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(this.state.survey)
        });
        const body = await response.json();
        this.setState({ responseToPost: body.uid });
	};
	
	handleSubmit(event) {
		this.state.survey.vetTeamID = store.getState().data.userId;
		this.state.survey.link = document.getElementById("link").value;
		this.returnInformation();
		window.location.assign("/#/VetMain");
	}

	handleChange(event, index, value) {
		this.setState({
			...this.state,
			survey: {
				...this.state.survey,
				location: value
			}
		});
	}

	
	render() {
		const {values} = this.state;

		return (
			(store.getState().loggedIn && store.getState().vetAccount)?
			<div>
				<Card>
					<CardHeader title= "Create New Survey"
					/>
					<CardText>
						To add a new survey please click <a href="https://docs.google.com/forms/u/0/">here</a> and create a new form. Once you have created the form click the send button and then the link button to get a shareable link to the form. Then copy and paste the link below and click submit.
						<br />
						<SelectField
						id="location"
						floatingLabelText="Location"
						value={this.state.survey.location}
						onChange={this.handleChange}
						>
							<MenuItem value={"Wrist"} primaryText="Wrist" />
							<MenuItem value={"Elbow"} primaryText="Elbow" />
							<MenuItem value={"Shoulder"} primaryText="Shoulder" />
							<MenuItem value={"Hip"} primaryText="Hip" />
							<MenuItem value={"Knee"} primaryText="Knee" />
							<MenuItem value={"Hock"} primaryText="Hock" />
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

export default VetNewSurvey;
