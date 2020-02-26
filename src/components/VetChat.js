import React from 'react';
import List from 'material-ui/List/List';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import {
    handleInput,
    connectToChatkit,
    connectToRoom,
    sendMessage,
    onDrop,
    openImageUploadDialog,
    closeImageUploadDialog,
    sendFile
  } from '../chat-methods';

import ImageUploadDialog from "./ImageUploadDialog";
import ChatSession from "./ChatSession";
import {Tabs, Tab} from 'material-ui/Tabs';

import './Chat.css';

class VetChat extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: 'Vet', // TODO: get from DB
            showLogin: true,
            isLoading: false,
            currentUser: null,
            currentRoom: null,
            rooms: [],
            roomUsers: [],
            roomName: null,
            messages: [],
            newMessage: '',
            pictures: [],
            showImageUploadDialog: false,
            fileUploadMessage: ""};

        this.handleInput = handleInput.bind(this);
        this.connectToChatkit = connectToChatkit.bind(this);
        this.connectToRoom = connectToRoom.bind(this);
        this.sendMessage = sendMessage.bind(this);
        this.onDrop = onDrop.bind(this);
        this.openImageUploadDialog = openImageUploadDialog.bind(this);
        this.closeImageUploadDialog = closeImageUploadDialog.bind(this);
        this.sendFile = sendFile.bind(this);

        this.connectToChatkit();
    }

    componentDidUpdate() {
        if (this.state.currentRoom) {
            this.messagesEnd1.scrollIntoView({ behavior: "smooth" });
            this.messagesEnd2.scrollIntoView({ behavior: "smooth" });
        }
    }
    
    userBar = () => {
        if (this.state.currentRoom) {
            this.connectToRoom("9996e540-1d7a-433e-a21c-177de99dcdd8");
        }
    }

    userFoo = () => {
        if (this.state.currentRoom) {
            this.connectToRoom("41ac18aa-8570-436c-a737-9e310afbaf3d");
        }
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
          showImageUploadDialog,
          fileUploadMessage
        } = this.state;

		return (
            <div>
                <Tabs>
                    <Tab label="userFoo" onActive={this.userFoo}>
                        {this.state.currentRoom ? (
                            <Card>
                                <List className="chat-messages" style={{maxHeight: '60vh', overflow: 'auto'}}>
                                    <ChatSession messages={messages} />
                                    <div style={{ float:"left", clear: "both" }}
                                                ref={(el) => { this.messagesEnd1 = el; }}>
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
                            <FlatButton
                                onClick={this.openImageUploadDialog}
                                type="button"
                                className="btn image-picker"
                                label="Attach an Image"
                                fullWidth={true}
                            />
                        </Card>
                        {showImageUploadDialog ? (
                            <ImageUploadDialog
                                handleInput={this.handleInput}
                                fileUploadMessage={fileUploadMessage}
                                onDrop={this.onDrop}
                                sendFile={this.sendFile}
                                closeImageUploadDialog={this.closeImageUploadDialog}
                            />
                        ) : null}
                    </Tab>
                    <Tab label="userBar" onActive={this.userBar}>
                        {this.state.currentRoom ? (
                                <Card>
                                    <List className="chat-messages" style={{maxHeight: '60vh', overflow: 'auto'}}>
                                        <ChatSession messages={messages} />
                                        <div style={{ float:"left", clear: "both" }}
                                                    ref={(el) => { this.messagesEnd2 = el; }}>
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
                                <FlatButton
                                    onClick={this.openImageUploadDialog}
                                    type="button"
                                    className="btn image-picker"
                                    label="Attach an Image"
                                    fullWidth={true}
                                />
                            </Card>
                            {showImageUploadDialog ? (
                                <ImageUploadDialog
                                    handleInput={this.handleInput}
                                    fileUploadMessage={fileUploadMessage}
                                    onDrop={this.onDrop}
                                    sendFile={this.sendFile}
                                    closeImageUploadDialog={this.closeImageUploadDialog}
                                />
                            ) : null}
                    </Tab>
                </Tabs>
            </div>
		);
	}
}

export default VetChat;
