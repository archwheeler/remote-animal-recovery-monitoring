import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';


const categories = [
	'Leg',
	'Arm',
	'Lower back',
	'Thigh',
  ];

class VetNewSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: [],
			survey:{
				vetTeamID: 1, //User ID of the vet team
				link: "", //Link to the survey
				location: "", //Location being targeted
			}
		}

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
		//TODO: vetTeamID
		this.state.survey.link = document.getElementById("link").value;
		this.state.survey.location = document.getElementById("category").value;
		
		console.log(this.state.survey);
		this.returnInformation();
	}


	handleChange = (event, index, values) => this.setState({values});

	menuItems(values) {
		return categories.map((category) => (
		  <MenuItem
			key={category}
			insetChildren={true}
			checked={values && values.indexOf(category) > -1}
			value={category}
			primaryText={category}
		  />
		));
	  }

	render() {
		const {values} = this.state;

		return (
			<div>
				<Card>
					<CardHeader title= "Create New Survey"
					/>
					<CardText>
						To add a new survey please click <a href="https://docs.google.com/forms/u/0/">here</a> and create a new form. Once you have created the form click the send button and then the link button to get a shareable link to the form. Then copy and paste the link below and click submit.
						<br />
						<SelectField
							id="category"
							multiple={true}
							hintText="Select a category"
							value={values}
							onChange={this.handleChange}
						>
							{this.menuItems(values)}
						</SelectField> 
						<br />

						 <TextField 
						 	id="link"
						 	floatingLabelText="Link"/>
						<br />
						<RaisedButton label="Submit" primary={true} />

					</CardText>
				</Card>
			</div>
		);
	}
}

export default VetNewSurvey;
