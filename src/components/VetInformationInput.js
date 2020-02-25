import React from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText, SelectField, DatePicker, TimePicker } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';

class VetInformationInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			information: {
				name: "George",
				firstLetterOfName: "G",
				sex: "Female",
				species: "Dog",
				bodyweight: "30kg", //this should be an integer (perhaps kg?)
				owner_name: "Albert", // VARCHAR
				op_name: "Leg", //VARCHAR - name of the operation
				op_date: "2020-01-22", //DATE
				body_condition: 7, //INT (out of 9)
				injury_info: "surgery on that leg tho.", //TEXT
				procedure_details: "It went pretty well didn't it.", //TEXT
				surgery_data: "weeee", //TEXT
				abnormalities: "none", //TEXT
				location: "leg", //VARCHAR
				stitches_or_staples: true, //BOOLEAN - true if stitches
				length_of_rest: 35, //INT - how many days rest?
				cage_or_room: false, //BOOLEAN - true if cage
				next_appt: "2020-02-29 10:54:00", //DATETIME
				meds_name: "MED",
				meds_amount: 3,
				meds_frequency: 2,
				meds_start: "2020-01-23", //DATE??
				meds_length_of_course: 14,
				
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeSex = this.handleChangeSex.bind(this);
		this.handleChangeAnimalType = this.handleChangeAnimalType.bind(this);
		this.handleChangeStitchesStaples = this.handleChangeStitchesStaples.bind(this);
		this.handleChangeCageRoom = this.handleChangeCageRoom.bind(this);
	
	}
	

	handleChangeSex(event, index, value) {
		this.setState({
			...this.state,
			information: {
				...this.state.information,
				sex: value
			}
		});
	}
	handleChangeAnimalType(event, index, value) {
		this.setState({
			...this.state,
			information: {
				...this.state.information,
				species: value
			}
		});
	}
	handleChangeStitchesStaples(event, index, value) {
		this.setState({
			...this.state,
			information: {
				...this.state.information,
				stitches_or_staples: value
			}
		});
	}
	handleChangeCageRoom(event, index, value) {
		this.setState({
			...this.state,
			information: {
				...this.state.information,
				cage_or_room: value
			}
		});
	}
	handleSubmit(event) {
		const namestr = document.getElementById("name").value;
		const timestr = document.getElementById("nextappttime").value;
		this.state.information.name = namestr;
		this.state.information.firstLetterOfName = namestr.substring(0,1);
		this.state.information.bodyweight = document.getElementById("bodyweight").value;
		this.state.information.owner_name = document.getElementById("ownername").value;
		this.state.information.op_name = document.getElementById("opname").value;
		this.state.information.op_date = document.getElementById("opdate").value;
		this.state.information.body_condition = document.getElementById("bodycondition").value;
		this.state.information.injury_info = document.getElementById("injuryinfo").value;
		this.state.information.procedure_details = document.getElementById("procedure").value;
		this.state.information.surgery_data = document.getElementById("surgerydata").value;
		this.state.information.abnormalities = document.getElementById("abnormalities").value;
		this.state.information.location = document.getElementById("op_loc").value;
		this.state.information.length_of_rest = document.getElementById("length").value;
		this.state.information.next_appt = document.getElementById("nextapptdate").value + " " + document.getElementById("nextappttime").value + ":00";
		this.state.information.meds_name = document.getElementById("medname").value;
		this.state.information.meds_amount = document.getElementById("medamount").value;
		this.state.information.meds_frequency = document.getElementById("medfreq").value;
		this.state.information.meds_start = document.getElementById("medstart").value;
		this.state.information.meds_length_of_course = document.getElementById("medlength").value;
		console.log(this.state.information);
	
	}


	render() {
		const nextapptdatetime = new Date(this.state.information.next_appt);
		return (
			
			<div>
			<Card>
				<CardTitle title="Discharge Information Input"/>
				 <CardText>
				 	<TextField
					id="name"
					floatingLabelText="Animal Name"
					defaultValue={this.state.information.name}
					/><br />
					<SelectField
					id="sex"
					floatingLabelText="Sex"
					value={this.state.information.sex}
					onChange={this.handleChangeSex}
					>
						<MenuItem value={"Male"} primaryText="Male" />
       					<MenuItem value={"Female"} primaryText="Female" />
          			</SelectField>
					<br />
					<SelectField
					id="species"
					floatingLabelText="Animal Type"
					value={this.state.information.species}
					onChange={this.handleChangeAnimalType}
					>
						<MenuItem value={"Dog"} primaryText="Dog" />
       					<MenuItem value={"Cat"} primaryText="Cat" />
          			</SelectField>
					<br />
					<TextField
					id="bodyweight"
					floatingLabelText="Bodyweight"
					defaultValue={this.state.information.bodyweight}
					/><br />
					<TextField
					id="ownername"
					floatingLabelText="Owner Name"
					defaultValue={this.state.information.owner_name}
					/><br />
					<br />
					<TextField
					id="opname"
					floatingLabelText="Operation Name"
					defaultValue={this.state.information.op_name}
					/><br />
					<br />
					<DatePicker 
						id="opdate"
						floatingLabelText="Operation Date"
						defaultDate={new Date(this.state.information.op_date)}
						/>
					<br />
					<TextField
					id="bodycondition"
					floatingLabelText="Body Condition"
					defaultValue={this.state.information.body_condition}
					/><br />
					<br />
					<TextField
					id="injuryinfo"
					floatingLabelText="Injury Info"
					defaultValue={this.state.information.injury_info}
					/><br />
					<br />
					<TextField
					id="procedure"
					floatingLabelText="Procedure Details"
					defaultValue={this.state.information.procedure_details}
					/><br />
					<br />
					<TextField
					id="surgerydata"
					floatingLabelText="Surgery Information"
					defaultValue={this.state.information.surgery_data}
					/><br />
					<br />
					<TextField
					id="abnormalities"
					floatingLabelText="Abnormalities"
					defaultValue={this.state.information.abnormalities}
					/><br />
					<br />
					<TextField
					id="op_loc"
					floatingLabelText="Operation Location"
					defaultValue={this.state.information.location}
					/><br />
					<br />
					<SelectField
					id="stitchesstaples"
					floatingLabelText="Stitches or Staples"
					value={this.state.information.stitches_or_staples}
					onChange={this.handleChangeStitchesStaples}
					>
						<MenuItem value={true} primaryText="Stitches" />
       					<MenuItem value={false} primaryText="Staples" />
          			</SelectField>
					<br />
					<TextField
					id="length"
					floatingLabelText="Length of rest"
					defaultValue={this.state.information.length_of_rest}
					/><br />
					<br />
					<SelectField
					id="cageroom"
					floatingLabelText="Cage or Room"
					value={this.state.information.cage_or_room}
					onChange={this.handleChangeCageRoom}
					>
						<MenuItem value={true} primaryText="Cage" />
       					<MenuItem value={false} primaryText="Small Room" />
          			</SelectField>
					<br />
					<DatePicker 
						id="nextapptdate"
						floatingLabelText="Next Appointment Date"
						defaultDate={nextapptdatetime}
						/>
					<br />
					<TimePicker
						id="nextappttime"
						format="24hr"
						floatingLabelText="Next Appointment Time"
						defaultTime={nextapptdatetime}
					/>
					<br />
					<TextField
					id="medname"
					floatingLabelText="Medication Name"
					defaultValue={this.state.information.meds_name}
					/><br />
					<br />
					<TextField
					id="medamount"
					floatingLabelText="Medication amount per dose"
					defaultValue={this.state.information.meds_amount}
					/><br />
					<br />
					<TextField
					id="medfreq"
					floatingLabelText="Medication frequency per day"
					defaultValue={this.state.information.meds_frequency}
					/><br />
					<br />
					<DatePicker 
						id="medstart"
						floatingLabelText="Start of medication course"
						defaultDate={new Date(this.state.information.meds_start)}
						/>
					<br />
					<TextField
					id="medlength"
					floatingLabelText="Length of course of medication"
					defaultValue={this.state.information.meds_length_of_course}
					/><br />
					<br />

					<RaisedButton label="Submit" primary={true} onClick={this.handleSubmit}/>
				</CardText>
			</Card>
		  </div>
		);
	}
}

export default VetInformationInput;