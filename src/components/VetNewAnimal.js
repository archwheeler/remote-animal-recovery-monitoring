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
				vetTeamID: 1,
				name: "",
				firstLetterOfName: "",
				sex: "",
				species: "",
				bodyweight: null, //this should be an integer (perhaps kg?)
				owner_name: "", // VARCHAR
				op_name: "", //VARCHAR - name of the operation
				op_date: "", //DATE
				body_condition: null, //INT (out of 9)
				injury_info: "", //TEXT
				procedure_details: "", //TEXT
				surgery_data: "", //TEXT
				abnormalities: "", //TEXT
				location: "", //VARCHAR
				stitches_or_staples: null, //BOOLEAN - true if stitches
				length_of_rest: null, //INT - how many days rest?
				cage_or_room: null, //BOOLEAN - true if cage
				next_appt: "", //DATETIME
				meds_name: "",
				meds_amount: null,
				meds_frequency: null,
				meds_start: "", //DATE??
				meds_length_of_course: null,
				
			},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeSex = this.handleChangeSex.bind(this);
		this.handleChangeAnimalType = this.handleChangeAnimalType.bind(this);
		this.handleChangeStitchesStaples = this.handleChangeStitchesStaples.bind(this);
		this.handleChangeCageRoom = this.handleChangeCageRoom.bind(this);
	
	}

	returnInformation = async(animalID) => {
        const response = await fetch('http://localhost:5000/addNewAnimal/'+ animalID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(this.state.information)
        });
        const body = await response.json();
        this.setState({ responseToPost: body.uid });
    };

	

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
		this.returnInformation(1234);
	
	}


	render() {
		return (
			
			<div>
			<Card>
				<CardTitle title="Discharge Information Input"/>
				 <CardText>
				 	<TextField
					id="name"
					floatingLabelText="Animal Name"
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
					/><br />
					<TextField
					id="ownername"
					floatingLabelText="Owner Name"
					/><br />
					<br />
					<TextField
					id="opname"
					floatingLabelText="Operation Name"
					/><br />
					<br />
					<DatePicker 
						id="opdate"
						floatingLabelText="Operation Date"
						/>
					<br />
					<TextField
					id="bodycondition"
					floatingLabelText="Body Condition"
					/><br />
					<br />
					<TextField
					id="injuryinfo"
					floatingLabelText="Injury Info"
					/><br />
					<br />
					<TextField
					id="procedure"
					floatingLabelText="Procedure Details"
					/><br />
					<br />
					<TextField
					id="surgerydata"
					floatingLabelText="Surgery Information"
					/><br />
					<br />
					<TextField
					id="abnormalities"
					floatingLabelText="Abnormalities"
					/><br />
					<br />
					<TextField
					id="op_loc"
					floatingLabelText="Operation Location"
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
						/>
					<br />
					<TimePicker
						id="nextappttime"
						format="24hr"
						floatingLabelText="Next Appointment Time"
					/>
					<br />
					<TextField
					id="medname"
					floatingLabelText="Medication Name"
					/><br />
					<br />
					<TextField
					id="medamount"
					floatingLabelText="Medication amount per dose"
					/><br />
					<br />
					<TextField
					id="medfreq"
					floatingLabelText="Medication frequency per day"
					/><br />
					<br />
					<DatePicker 
						id="medstart"
						floatingLabelText="Start of medication course"
						/>
					<br />
					<TextField
					id="medlength"
					floatingLabelText="Length of course of medication"
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