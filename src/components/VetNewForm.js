import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {TextField, RaisedButton, SelectField, MenuItem, CardTitle } from 'material-ui';

class VetNewSurvey extends React.Component {
	state = {
		value: null,
	};	

	handleChange = (event, index, value) => this.setState({value});



	render() {

		return (
			<div>
				<Card>
					<CardTitle title= "Create New Survey"
					/>
					<CardText>
						To add a new survey please click <a href="https://docs.google.com/forms/u/0/">here</a> and create a new form. Once you have created the form click the send button and then the link button to get a shareable link to the form. Then copy and paste the link below and click submit.
						<br />
						<SelectField
							hintText="Select a category"
							value={this.state.value}
							onChange={this.handleChange}
						>
							<MenuItem value={1} primaryText="Stitches" />
       						<MenuItem value={2} primaryText="Staples" />
						</SelectField> 
						<br />

					 	<TextField floatingLabelText="Link"/>
						<br />
						<RaisedButton label="Submit" primary={true} />

					</CardText>
				</Card>
			</div>
		);
	}
}

export default VetNewSurvey;
