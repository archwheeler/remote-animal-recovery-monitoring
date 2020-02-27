import React from 'react';
import {Card, CardMedia, CardHeader} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

class Questionnaire extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            loading: true,
            link: props.link,
        }
	}
	
	stopLoading = () => {
		this.setState({loading: false});
    }
    
    expandChange = (newExpandedState) => {
        if (!newExpandedState) this.setState({loading: true});
    }

	render() {
		return (
            <Card expandable={true} onExpandChange={this.expandChange}>
                <CardHeader 
                    title="NAME"
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
            </Card>
		);
	}
}

export default Questionnaire;
