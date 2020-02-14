import React from 'react';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { FlatButton } from 'material-ui';

class LoadForm extends React.Component {
	render() {
		return (
			<Card>
					<CardHeader title= "George"
								subtitle="Age 13, Male, Labradoodle, QVSH Ref: 1932"
								avatar={<Avatar>G</Avatar>}
					/>
					<CardText>
					Please fill in the form below. To send it too us after filling in click the print button and print to "Save as PDF". Then email this attachment to the <a href="mailto:hospital@vet.cam.ac.uk">Vet School</a>.
					</CardText>
					<CardMedia>
						<object data = "Printable_LOAD_Form.pdf" type="application/pdf" width="100%" height="600" frameBorder="none">
							<div style={{margin:15}}><p>Unfortunately this browser does not support PDFs. Please download the PDF using the button below, we recommend using Adobe Acrobat to fill in the form.</p>
							</div>
							<FlatButton label="Download PDF" href="Printable_LOAD_Form.pdf"/>
						
						</object>
					</CardMedia>
			</Card>
		);
	}
}

export default LoadForm;
