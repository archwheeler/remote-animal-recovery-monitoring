import React from 'react';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class Questionnaire extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            loading: true,
            link: props.link,
            name: props.name,
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
            (this.state.link=="Printable_LOAD_Form.pdf")?
            <div>
                <Card>
                <CardHeader title="Load Form"
                            actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardText expandable={true}>
                    Please fill in the form below. To send it to us after filling in click the print button and
                    print to "Save as PDF". Then email this attachment to the <a
                    href="mailto:hospital@vet.cam.ac.uk">Vet School</a>.
                </CardText>
                <CardMedia expandable={true}>
                    <object data="Printable_LOAD_Form.pdf" type="application/pdf" width="100%" height="600"
                            frameBorder="none">
                        <div style={{margin: 15}}><p>Unfortunately this browser does not support PDFs. Please
                            download the PDF using the button below, we recommend using Adobe Acrobat to fill in the
                            form.</p>
                        </div>
                        <FlatButton label="Download PDF" href="Printable_LOAD_Form.pdf"/>

                    </object>
                </CardMedia>
                </Card>
            </div>
            :
			<div>
                <Card expandable={true} onExpandChange={this.expandChange}>
                    <CardHeader 
                        title={this.state.name}
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
			</div>
           
		);
	}
}

export default Questionnaire;
