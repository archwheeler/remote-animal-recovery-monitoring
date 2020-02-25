import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';


const categories = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder',
  ];

class VetNewSurvey extends React.Component {
	state = {
		values: [],
	};	

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
							multiple={true}
							hintText="Select a name"
							value={values}
							onChange={this.handleChange}
						>
							{this.menuItems(values)}
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
