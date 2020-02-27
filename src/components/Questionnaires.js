import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Questionnaire from './Questionnaire';

class Questionnaires extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			information: {
				name: "",
				firstLetterOfName: "",
				sex: "",
				species: "",
				bodyweight: "", //this should be an integer (perhaps kg?)
				owner_name: "", // VARCHAR
				op_name: "", //VARCHAR - name of the operation
				op_date: "2000-01-01", //DATE
				body_condition: 0, //INT (out of 9)
				injury_info: "", //TEXT
				procedure_details: "", //TEXT
				surgery_data: "", //TEXT
				abnormalities: "", //TEXT
				location: "", //VARCHAR
				stitches_or_staples: true, //BOOLEAN - true if stitches
				length_of_rest: 0, //INT - how many days rest?
				cage_or_room: true, //BOOLEAN - true if cage
				next_appt: "2000-01-01 00:00:00", //DATETIME
				meds_name: "",
				meds_amount: 0,
				meds_frequency: 0,
				meds_start: "2000-01-01", //DATE??
				meds_length_of_course: 0,
			},
			loading: true,
			questionnaire: {
				noOfQuestionnaires: 0,
				questionnaires: []}
			};
	}

	getInformation = async(animalID) => {
		const response = await fetch('http://localhost:5000/getAnimalInfo/' + animalID);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	}

	getQuestionnaires = async(animalID) => {
		const response = await fetch('http://localhost:5000/checkForQuestionnaires/' + animalID);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	}

	componentDidMount() {
        this.getInformation("123").then(info => this.setState({information:info}))
			.catch(err => console.log(err));
		this.getQuestionnaires("123").then(info => this.setState({questionnaire:info}))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<Card>
					<CardHeader title = {this.state.information.name}
									subtitle={"Sex: " + ((this.state.information.sex=="M")?"Male":"Female") + ", Animal Type: "+ this.state.information.species}
									avatar={<Avatar>{this.state.information.firstLetterOfName}</Avatar>}
					/>
					<CardText>
						Please complete the following questionnaire(s) to help monitor your dog's progress:
					</CardText>					
				</Card>
				{this.state.questionnaire.questionnaires.map((q, index) => (
					<Questionnaire data={q}/>		
				))}
			</div>
		);
	}
}

export default Questionnaires;
