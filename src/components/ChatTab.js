import React from 'react';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import List from 'material-ui/List/List';
import ChatSession from './ChatSession';

class ChatTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            messages: props.messages,
        }
	}

	render() {
		return (
            <Card>
                <List className="chat-messages" style={{maxHeight: '60vh', overflow: 'auto'}}>
                    <ChatSession messages={this.state.messages} />
                </List>
            </Card> 
		);
	}
}

export default ChatTab;
