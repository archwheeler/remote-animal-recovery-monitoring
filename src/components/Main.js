import React from 'react';

import {Card, CardHeader, CardText, CardActions, CardMedia} from 'material-ui/Card';
import {
	Step,
	Stepper,
	StepLabel,
	StepContent,
  } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { Badge } from 'material-ui';


class Main extends React.Component {
	information = {
		name: "George",
		firstLetterOfName: "G",
		sex: "Male",
		species: "Dog",
		bodyweight: "30kg", //this should be an integer (perhaps kg?)
		owner_name: "Albert", // VARCHAR
		op_name: "Leg", //VARCHAR - name of the operation
		op_date: "2020-01-22", //DATE
		body_condition: "7", //INT (out of 9)
		injury_info: "Surgery on that leg tho", //TEXT
		procedure_details: "stuff n nonsense", //TEXT
		surgery_data: "weeee", //TEXT
		abnormalities: "none", //TEXT
		location: "leg", //VARCHAR
		stitches_or_staples: "stitches", //BOOLEAN - true if stitches
		length_of_rest: "35", //INT - how many days rest?
		cage_or_room: "room", //BOOLEAN - true if cage
		next_appt: "2020-02-29", //DATETIME
		meds: {
			name: "MED",
			amount: "3",
			frequency: "2",
			start: "2020-01-23", //DATE??
			length_of_course: "14",
		}
	}
	
	state = {
		finished: false,
		stepIndex: 0,
	  };
	
	  handleNext = () => {
		const {stepIndex} = this.state;
		this.setState({
		  stepIndex: stepIndex + 1,
		  finished: stepIndex >= 5,
		});
	  };
	
	  handlePrev = () => {
		const {stepIndex} = this.state;
		if (stepIndex > 0) {
		  this.setState({stepIndex: stepIndex - 1});
		}
	  };

	  renderStepActions(step) {
		const {stepIndex} = this.state;
	
		return (
		  <div style={{margin: '12px 0'}}>
			<RaisedButton
			  label={stepIndex === 4 ? 'Finish' : 'Next'}
			  disableTouchRipple={true}
			  disableFocusRipple={true}
			  primary={true}
			  onClick={this.handleNext}
			  style={{marginRight: 12}}
			/>
			{step > 0 && (
			  <FlatButton
				label="Back"
				disabled={stepIndex === 0}
				disableTouchRipple={true}
				disableFocusRipple={true}
				onClick={this.handlePrev}
			  />
			)}
		  </div>
		);
	  }

	render() {
		const {finished, stepIndex} = this.state;

		return (
			<div>
				<Card>
					<CardHeader title = {this.information.name}
								subtitle={"Sex: " + this.information.sex + ", Animal Type: "+ this.information.species}
								avatar={<Avatar>{this.information.firstLetterOfName}</Avatar>}
					/>
					<CardText>
					{this.information.name} was presented to the Queen’s Veterinary School Hospital on {this.information.op_date} for further investigation into *mild/moderate/severe, left/right hindlimb/forelimb lameness of ….duration*. *Progression of lameness*. *Other medical issues*.
					</CardText>
				</Card>

				<Card>
					<CardHeader title={<Badge
						badgeContent={1}
						primary={true}
						style={{padding: 0}}
						badgeStyle={{top:-10, right: -28}}>
							Questionnaires

					</Badge>}
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
						You have a new questionnaire to fill in! Please click the button below.
					</CardText>
					<CardActions expandable={true}>
						<FlatButton label="Weeks 1-2 Questionnaire" href="/#/SurveyTemplate"/>
					</CardActions>
				</Card>
				<Card>
					<CardHeader title= "Wound Care"
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
						<ul>
						<li>{this.information.name} has a surgical wound on his/her {this.information.location}. Please check the wound twice daily for any signs of swelling, heat, redness, discharge or pain. Please contact us or your vets if you have any concerns with the appearance of the wound.</li>
						<li>{this.information.name} must not be allowed to lick the surgical site as this will interfere with healing and may cause infection. He/She must wear the Buster collar at all times, especially when unsupervised, until the skin stitches have been removed.</li>
						<li>During the first 2-3 days after surgery, {this.information.name} may benefit from cold packing of the XXXX. Please apply a cold pack (commercially available cool pack or bag of frozen peas for example), wrapped in a clean towel for 5-10 minutes, 3-4 times a day.</li>
						</ul>
					</CardText>
				</Card>

				<Card>
					<CardHeader title= "Load Form"
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
					Please fill in the form below. To send it too us after filling in click the print button and print to "Save as PDF". Then email this attachment to the <a href="mailto:hospital@vet.cam.ac.uk">Vet School</a>.
					</CardText>
					<CardMedia expandable={true}>
						<object data = "Printable_LOAD_Form.pdf" type="application/pdf" width="100%" height="600" frameBorder="none">
							<div style={{margin:15}}><p>Unfortunately this browser does not support PDFs. Please download the PDF using the button below, we recommend using Adobe Acrobat to fill in the form.</p>
							</div>
							<FlatButton label="Download PDF" href="Printable_LOAD_Form.pdf"/>
						
						</object>
					</CardMedia>
				</Card>

				<Card>
					<CardHeader title= "Vet Metrica Questionnare"
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
						Please complete the Vet Metrica Questionnare by clicking <a href="https://www.vetmetrica.com/Auth/Login">here</a>.
					</CardText>
				</Card>

				
				<Card>
					<CardHeader title= "Exercise"
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
					<ul>
					<li>{this.information.name} must not be allowed to do any running, jumping on/off furniture, climbing stairs or playing. At home, they must be kept confined to a cage/small room. They must be kept on the lead at all times when they are outside, even in the garden.</li>
					<li>{this.information.name} can be taken for controlled walks on the lead as per the following schedule. Please walk slowly to encourage use of the operated limb</li>
					</ul>
					<div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
						<Stepper activeStep={stepIndex} orientation="vertical">
							<Step>
								<StepLabel>Weeks 1-4</StepLabel> 
								<StepContent>
									<p>5-10 minutes 3-4 times daily</p>
									{this.renderStepActions(0)}
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Weeks 5-6</StepLabel> 
								<StepContent>
									<p>10-15 minutes 3-4 times daily</p>
									{this.renderStepActions(1)}
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Weeks 7-8</StepLabel> 
								<StepContent>
									<p>15-20 minutes on the lead 2-3 times daily</p>
									{this.renderStepActions(2)}
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Weeks 9-10</StepLabel> 
								<StepContent>
									<p>20-30 minutes on the lead 2-3 times daily</p>
									{this.renderStepActions(3)}
								</StepContent>
							</Step>
							<Step>
								<StepLabel>Weeks 11-12</StepLabel> 
								<StepContent>
									<p>30-40 minutes on the lead 2-3 times daily.</p>
									{this.renderStepActions(4)}
								</StepContent>
							</Step>
							
						</Stepper>
						{finished && (
						<p style={{margin: '20px 0', textAlign: 'center'}}>
							<a
							href="#"
							onClick={(event) => {
								event.preventDefault();
								this.setState({stepIndex: 0, finished: false});
							}}
							>
							Click here
							</a> to reset the example.
						</p>
						)}
					</div>
					
					</CardText>
				</Card>

				<Card>
					<CardHeader
						title="Physiotherapy and hydrotherapy"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
					Physiotherapy and hydrotherapy can help to optimise recovery and are recommended.
					<ul>
						<li>For physiotherapy, we recommend <a href="https://www.ACPAT.org">ACPAT</a> or <a href="https://www.IAAT.org.uk">IAAT</a> certified animal physiotherapists. This can be started after discharge from the hospital.</li>
						<li>For hydrotherapy, underwater treadmill hydrotherapy is recommended. This should not be started until after the surgical wound has healed and the skin sutures have been removed. Free swimming hydrotherapy is not allowed until after the recheck at QVSH. We suggest that you look for a member of the <a href="https://www.canine-hydrotherapy.org">Canine Hydrotherapy Association</a>.</li>
					</ul>
					</CardText>
				</Card>
				<Card>
					<CardHeader
						title="Medication"
						actAsExpander={true}
						showExpandableButton={true}
						/>
					<CardText expandable={true}>
						{this.information.meds.name}: Please give {this.information.meds.amount} capsules/tablets {this.information.meds.frequency} times daily with food starting {this.information.meds.start} for {this.information.meds.length_of_course} days. If {this.information.name} has any vomiting or diarrhoea, stop this medication and contact us or your vets for advice. 
					</CardText>
				</Card>

				<Card>
					<CardHeader
						title="Further  Appointments"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						<ul>
							<li>{this.information.name} has skin {this.information.stitches_or_staples} that will need to be removed 10-14 days after surgery. Please arrange an appointment with your local vets for this.</li>
							<li>We would like to re-examine {this.information.name} at the QVSH. An appointment has been booked on {this.information.next_appt} at XX.XX. Please contact our reception team to rearrange this appointment if required. Please do not feed animal’s name in the morning prior to this appointment, as sedation or general anaesthesia may be required. There is no need to withhold water during this time. Please be prepared to leave animal’s name with us for the day.</li>
						</ul>
					</CardText>
					<CardActions expandable={true}>
						<FlatButton label="Contact Us" href="/#/Contact"/>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default Main;
