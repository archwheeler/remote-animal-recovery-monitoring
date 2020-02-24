import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import {
    handleInput,
    connectToChatkit,
    connectToRoom,
    sendMessage,
  } from '../chat-methods';

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: 'userFoo', // TODO: get from DB
            showLogin: true,
            isLoading: false,
            currentUser: null,
            currentRoom: null,
            rooms: [],
            roomUsers: [],
            roomName: null,
            messages: [],
            newMessage: ''};

        this.handleInput = handleInput.bind(this);
        this.connectToChatkit = connectToChatkit.bind(this);
        this.connectToRoom = connectToRoom.bind(this);
        this.sendMessage = sendMessage.bind(this);

        this.connectToChatkit();
    }

    componentDidUpdate() {
        if (this.state.currentRoom) this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }    

	render() {
        const {
          userId,
          showLogin,
          rooms,
          currentRoom,
          currentUser,
          messages,
          newMessage,
          roomUsers,
          roomName,
        } = this.state;

		return (
            <div>
                {this.state.currentRoom ? (
                    <Card>
                        <CardHeader title= "George"
								subtitle="Age 13, Male, Labradoodle, QVSH Ref: 1932"
								avatar={<Avatar>G</Avatar>}
					    />
                        <List style={{maxHeight: '60vh', overflow: 'auto'}} >
                                    {this.state.messages.map(message => 
                                        <ListItem key={message.id} disabled={true}>
                                            {message.senderId + "> " + message.text}
                                        </ListItem>)}
                                    <div style={{ float:"left", clear: "both" }}
                                        ref={(el) => { this.messagesEnd = el; }}>
                                    </div>
                        </List>
                    </Card>
                ) : (
                    <Card style={{padding: "15px"}}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </div>
                    </Card>
                )}
                <Card style={{padding: "5px"}}>
                    
                    <form id="message-form" onSubmit={this.sendMessage}>
                        <TextField id='message-text' name="newMessage" fullWidth={true} value={newMessage} autoComplete={"off"} onChange={this.handleInput} hintText="Enter a message..."/>
                    </form>
                    <button
                        onClick={this.openImageUploadDialog}
                        type="button"
                        className="btn image-picker"
                    >
                        Attach Image
                    </button>
                </Card>
            </div>
		);
	}
}

export default Chat;
