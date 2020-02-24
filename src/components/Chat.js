import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import { Image } from "react-feather";
import {
    // [..]
    onDrop,
    openImageUploadDialog,
    closeImageUploadDialog,
    sendFile
} from "../chat-methods";

import ImageUploadDialog from "./ImageUploadDialog";

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            pictures: [],
            showImageUploadDialog: false,
            fileUploadMessage: ""};

        this.connected = false;

        this.onDrop = onDrop.bind(this);
        this.openImageUploadDialog = openImageUploadDialog.bind(this);
        this.closeImageUploadDialog = closeImageUploadDialog.bind(this);
        this.sendFile = sendFile.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        const input = document.getElementById("message-text");
        this.currentUser.sendSimpleMessage({
            text: input.value,
            roomId: this.currentUser.rooms[0].id
        });
        input.value = "";
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    componentDidMount() {
        let chatManager = new window.Chatkit.ChatManager({
            instanceLocator: "v1:us1:0fa440f3-996e-4157-beb1-efdc519b3973",
            userId: "andreeahasacat",
            tokenProvider: new window.Chatkit.TokenProvider({
                url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0fa440f3-996e-4157-beb1-efdc519b3973/token"
            })
        });

        chatManager
        .connect()
        .then(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.subscribeToRoomMultipart({
                roomId: this.currentUser.rooms[0].id,
                hooks: {
                    onMessage: message => {
                        this.setState(state => {
                            return {messages: state.messages.concat(message)};
                        });
                    }
                }
            });

            this.form = document.getElementById("message-form");
            this.form.addEventListener("submit", this.sendMessage.bind(this));
            this.connected = true;
        })
        .catch(error => {
            console.error("error:", error);
        });

        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        this.form.removeEventListener("submit", this.sendMessage.bind(this));
        this.currentUser.disconnect();
    }

	render() {
        const {
            showImageUploadDialog,
            fileUploadMessage
          } = this.state;

		return (
            <div>
                {this.connected ? (
                    <Card>
                        <CardHeader title= "George"
								subtitle="Age 13, Male, Labradoodle, QVSH Ref: 1932"
								avatar={<Avatar>G</Avatar>}
					    />  
                        <List style={{maxHeight: '60vh', overflow: 'auto'}} >
                            {this.state.messages.map(message => 
                                <ListItem key={message.id} disabled={true}>
                                    {message.senderId + "> " + message.parts[0].payload.content}
                                </ListItem>)}
                            <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </List>
                    </Card>) : (
                    <Card style={{padding: "15px"}}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </div>
                    </Card>
                    )}
                <Card style={{padding: "5px"}}>
                    
                    <form id="message-form">
                        <TextField id='message-text' fullWidth={true} autoComplete={"off"} hintText="Enter a message..."/>
                    </form>
                    <button
                        onClick={this.openImageUploadDialog}
                        type="button"
                        className="btn image-picker"
                    >Image
                    </button>
                    {showImageUploadDialog ? (
                        <ImageUploadDialog
                            handleInput={this.handleInput}
                            fileUploadMessage={fileUploadMessage}
                            onDrop={this.onDrop}
                            sendFile={this.sendFile}
                            closeImageUploadDialog={this.closeImageUploadDialog}
                        />
                        ) : null}
                </Card>
            </div>
		);
	}
}

export default Chat;
