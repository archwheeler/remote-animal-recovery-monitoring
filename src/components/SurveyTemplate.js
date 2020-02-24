import React from 'react';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { CircularProgress } from 'material-ui';

class Survey extends React.Component {
	render() {
		return (
			
			<div>
				<Card>
					<CardHeader title= "George"
								subtitle="Age 13, Male, Labradoodle, QVSH Ref: 1932"
								avatar={<Avatar>G</Avatar>}
					/>
					<CardText>
						Please complete the following questionnare to help monitor your dog's progress:
					</CardText>
					{ this.state.loading ? (
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<CircularProgress/>
						</div>) : null
					}
					<CardMedia>
					<iframe src="https://docs.google.com/forms/u/0/"
							width="100%"
							height="400"
							frameBorder="0"
							onLoad={this.stopLoading}>
								Loading…
							</iframe>
					</CardMedia>
				</Card>
			</div>
		);
	}
}

export default Survey;
