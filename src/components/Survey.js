import React from 'react';
import {Card, CardMedia, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            loading: true,
            key: props.key,
            animalID: props.animalID,
            link: props.link,
            location: props.location,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	stopLoading = () => {
		this.setState({loading: false});
    }
    
    expandChange = (newExpandedState) => {
        if (!newExpandedState) this.setState({loading: true});
    }

    handleSubmit = async() =>  {
        const response = await fetch('http://localhost:5000/surveyComplete/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                aid: this.state.animalID,
                surveyId: this.state.key,          
            })
        });
        console.log(JSON.stringify({
            aid: this.state.animalID,
            surveyId: this.state.key,          
        }));
        const body = await response.json();
        this.setState({ responseToPost: body.uid });
    }

	render() {
		return (
			<div>
                <Card expandable={true} onExpandChange={this.expandChange}>
                    <CardHeader 
                        title={this.state.location + " Survey"}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardMedia expandable={true}>
                        { this.state.loading ? (
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </div>) : null
                        }
                        <iframe src={this.state.link}
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    onLoad={this.stopLoading}>
                        </iframe>
                    </CardMedia>
                    <CardActions>
                        <FlatButton label="Completed?" primary={true} onClick={this.handleSubmit} />
                    </CardActions>
                </Card>
			</div>
		);
	}
}

export default Survey;
