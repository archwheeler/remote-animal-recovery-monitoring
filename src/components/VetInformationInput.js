import React from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText, SelectField, DatePicker } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';

class VetInformationInput extends React.Component {
	state = {
		value: null,
	};

	handleChange = (event, index, value) => this.setState({value});
	
	render() {
		return (
			<div>
			<Card>
				<CardTitle title="Discharge Information Input"/>
				 <CardText>
				 	<TextField
					floatingLabelText="Animal Name"
					defaultValue="George"
					/><br />
					<SelectField
					floatingLabelText="Sex"
					value={this.state.value}
					onChange={this.handleChange}
					>
						<MenuItem value={1} primaryText="Male" />
       					<MenuItem value={2} primaryText="Female" />
          			</SelectField>
					<br />
					<SelectField
					floatingLabelText="Animal Type"
					value={this.state.value}
					onChange={this.handleChange}
					>
						<MenuItem value={1} primaryText="Dog" />
       					<MenuItem value={2} primaryText="Cat" />
          			</SelectField>
					<br />
					<TextField
					floatingLabelText="Bodyweight"
					defaultValue=""
					/><br />
					<TextField
					floatingLabelText="Owner Name"
					defaultValue="Albert"
					/><br />
					<br />
					<TextField
					floatingLabelText="Operation Name"
					defaultValue=""
					/><br />
					<br />
					<DatePicker 
						floatingLabelText="Operation Date"/>
					<br />
					<TextField
					floatingLabelText="Abnormalities"
					defaultValue=""
					/><br />
					<br />
					<TextField
					floatingLabelText="Location"
					defaultValue=""
					/><br />
					<br />
					<SelectField
					floatingLabelText="Stitches or Staples"
					value={this.state.value}
					onChange={this.handleChange}
					>
						<MenuItem value={1} primaryText="Stitches" />
       					<MenuItem value={2} primaryText="Staples" />
          			</SelectField>
					<br />
					<TextField
					floatingLabelText="Length of rest"
					defaultValue=""
					/><br />
					<br />
					<SelectField
					floatingLabelText="Cage or Room"
					value={this.state.value}
					onChange={this.handleChange}
					>
						<MenuItem value={1} primaryText="Cage" />
       					<MenuItem value={2} primaryText="Small Room" />
          			</SelectField>
					<br />
					<DatePicker 
						floatingLabelText="Next Appointment"/>
					<br />

					<RaisedButton label="Submit" primary={true} />
				</CardText>
			</Card>
		  </div>
		);
	}
}

export default VetInformationInput;
