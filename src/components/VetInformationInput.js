import React from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText, SelectField, DatePicker } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';

class Contact extends React.Component {
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
					floatingLabelText="Owner Name"
					defaultValue="Albert"
					/><br />
					<br />
					<TextField
					floatingLabelText="Animal Name"
					defaultValue="George"
					/><br />
					<TextField
					floatingLabelText="Bodyweight"
					defaultValue=""
					/><br />
					<SelectField
					floatingLabelText="Animal Type"
					value={this.state.value}
					onChange={this.handleChange}
					>
						<MenuItem value={1} primaryText="Dog" />
       					<MenuItem value={2} primaryText="Cat" />
          			</SelectField>
					<br />
					<DatePicker 
						floatingLabelText="Date of Birth"/>
					<br />
					<TextField
					hintText="Password Field"
					floatingLabelText="Password"
					type="password"
					/><br />
					<TextField
					hintText="MultiLine with rows: 2 and rowsMax: 4"
					multiLine={true}
					rows={2}
					rowsMax={4}
					/><br />
					<RaisedButton label="Submit" primary={true} />
				</CardText>
			</Card>
		  </div>
		);
	}
}

export default Contact;
