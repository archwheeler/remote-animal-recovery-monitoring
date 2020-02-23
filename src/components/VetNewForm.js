import React from 'react';
import {Card, CardHeader, CardText, CardMedia, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Contact extends React.Component {
	render() {
		return (
			<Card>
				<CardHeader title="Contact Us"/>
				<CardText>
					For all enquiries during office hours and for emergency referrals at any time please call us on <a href="tel:01223337621">01223 337621</a>
					<br />
					<br />
					<b>Address</b>: Madingley Road, Cambridge, CB3 0ES

				</CardText>
				<CardActions>
					<FlatButton label="Telephone" href="tel:1223 337621"/>
					<FlatButton label="Email" href="mailto:hospital@vet.cam.ac.uk"/>

				</CardActions>
			</Card>
		);
	}
}

export default Contact;
