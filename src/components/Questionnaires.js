import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Questionnaire from './Questionnaire';
import {store} from "../store"

class Questionnaires extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			information: {
				name: "",
				first_letter_of_name: "",
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
			this.componentDidMount = this.componentDidMount.bind(this);
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
        this.getInformation(store.getState().data.animalId).then(info => this.setState({information:info}))
			.catch(err => console.log(err));
		this.getQuestionnaires(store.getState().data.animalId).then(info => this.setState({questionnaire:info}))
			.catch(err => console.log(err));
	}

	render() {
		return (
			(store.getState().loggedIn)?
			<div>
				<Card>
					<CardHeader title = {this.state.information.name}
									subtitle={"Sex: " + ((this.state.information.sex=="M")?"Male":"Female") + ", Animal Type: "+ this.state.information.species}
									avatar={<Avatar>{this.state.information.first_letter_of_name}</Avatar>}
					/>
					<CardText>
						Please complete the following outcome questionnaire(s) to help monitor your dog's progress:
					</CardText>					
				</Card>
				{this.state.questionnaire.questionnaires.map((q, index) => (
					<Questionnaire key={q.questionnaire_id} animalID={store.getState().animalId} link={q.link} name={q.name}/>		
				))}
			</div>
			:
			<div>
			{window.location.assign("/")}
            </div>
		);
	}
}

export default Questionnaires;
