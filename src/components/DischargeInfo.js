import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Main extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<CardHeader title= "Wound Care"
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
						<ul>
						<li>Animal’s name has a surgical wound on his/her xxxx. Please check the wound twice daily for any signs of swelling, heat, redness, discharge or pain. Please contact us or your vets if you have any concerns with the appearance of the wound.</li>
						<li>Animal’s name must not be allowed to lick the surgical site as this will interfere with healing and may cause infection. He/she must wear the Buster collar at all times, especially when unsupervised, until the skin stitches have been removed.</li>
						<li>During the first 2-3 days after surgery, Animal’s name may benefit from cold packing of the XXXX. Please apply a cold pack (commercially available cool pack or bag of frozen peas for example), wrapped in a clean towel for 5-10 minutes, 3-4 times a day.</li>
						</ul>
					</CardText>
				</Card>
				<Card>
					<CardHeader title= "Exercise"
								actAsExpander={true}
								showExpandableButton={true}
					/>
					<CardText expandable={true}>
						
						<Card>
							<CardHeader title= "Weeks 1-4"
										actAsExpander={true}
										showExpandableButton={true}
							/>
							<CardText expandable={true}>5-10 minutes 3-4 times daily</CardText>
						</Card>
						<Card>
							<CardHeader title= "Weeks 5 & 6 (or until the re-examination appointment)"
										actAsExpander={true}
										showExpandableButton={true}
							/>
							<CardText expandable={true}>10-15 minutes 3-4 times daily</CardText>
						</Card>
						<Card>
							<CardHeader title= "Weeks 7 & 8"
										actAsExpander={true}
										showExpandableButton={true}
							/>
							<CardText expandable={true}>15-20 minutes on the lead 2-3 times daily</CardText>
						</Card>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default Main;
