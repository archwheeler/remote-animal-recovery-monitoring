import React from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText, SelectField, DatePicker, TimePicker, CardActions, FlatButton } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem';
import {store} from '../store';

class VetInformationInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animals: [],
			animal: {
				aid: null,
				name: "",
			},
			information: {
				aid: null,
				name: "",
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
		this.handleChangeAnimal = this.handleChangeAnimal.bind(this);
		this.handleChangeSex = this.handleChangeSex.bind(this);
		this.handleChangeAnimalType = this.handleChangeAnimalType.bind(this);
		this.handleChangeStitchesStaples = this.handleChangeStitchesStaples.bind(this);
		this.handleChangeCageRoom = this.handleChangeCageRoom.bind(this);

		this.componentDidMount = this.componentDidMount.bind(this);
		this.getInformation = this.getInformation.bind(this);
		this.getAnimals = this.getAnimals.bind(this);
	
	}

	getAnimals = async(vetTeamID) => {
		const response = await fetch('http://localhost:5000/getAnimals/' + vetTeamID);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	}

	getInformation = async(animalID) => {
		const response = await fetch('http://localhost:5000/getAnimalInfo/' + animalID);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		console.log(body);
		return body;
	}
	
	getAnimals = async() => {
		const response = await fetch('http://localhost:5000/getAnimals/' + store.getState().data.userId);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	}

	returnInformation = async(animalID) => {
        const response = await fetch('http://localhost:5000/modifyAnimal/'+ animalID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(this.state.information)
        });
        const body = await response.json();
        this.setState({ responseToPost: body.uid });
    };

	componentDidMount() {
		this.getAnimals(this.state.information.vetTeamID).then(listOfAnimals => this.setState({animals:listOfAnimals.animals})).catch(err => console.log(err));
	}

	handleChangeAnimal(event, index, animal){
		this.setState({animal:animal});
		console.log(animal);
		this.getInformation(animal.aid).then(info => this.setState({information:info}))
			.catch(err => console.log(err));
		console.log(this.state);
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
		this.returnInformation(this.state.animal.aid);
	
	}

	animalNameItems(animals) {
		return animals.map((animal) => (
			<MenuItem
				key={animal.aid}
				value={animal}
				primaryText={animal.name}
			/>
		));
	}


	render() {
		const nextapptdatetime = new Date(this.state.information.next_appt);
		
		return (
			(store.getState().loggedIn && store.getState().vetAccount)?
			
			(this.state.animal.aid == null)?
			<div>
				<Card>
					<CardTitle title="Please select an animal to update:" />
					<SelectField
					id="animal"
					floatingLabelText="Name"
					value={this.state.animal}
					onChange={this.handleChangeAnimal}
					>
						{this.animalNameItems(this.state.animals)}
          			</SelectField>
				</Card>
			</div>
			:
			<div>
			<Card>
				<CardTitle title="Discharge Information Input"/>
				 <CardText>
					<SelectField
					id="sex"
					floatingLabelText="Sex"
					value={this.state.information.sex}
					onChange={this.handleChangeSex}
					>
						<MenuItem value={"M"} primaryText="Male" />
       					<MenuItem value={"F"} primaryText="Female" />
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
					floatingLabelText="Bodyweight in kg"
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
		  :<div>
		  {window.location.assign("/")}
		  </div>
		);
	}
}

export default VetInformationInput;