import React from 'react';
import List from 'material-ui/List/List';
import {Card, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

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
            rooms: null,
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

	render() {
        const {
          newMessage,
          showImageUploadDialog,
          fileUploadMessage
        } = this.state;

		return (
            <div>
                { (this.state.rooms) ? (
                    <div>
                        { (this.state.rooms.length > 0) ? (
                            <div>
                                <Tabs>
                                    {this.state.rooms.map((room, index) => (
                                        <Tab 
                                        label={room.name}
                                        onActive={() => {
                                            this.setState({currentRoom: null});
                                            this.connectToRoom(room.id);
                                        }}
                                        key={room.id}>
                                            {this.state.currentRoom ? (
                                                <Card>
                                                    <List className="chat-messages" style={{maxHeight: '60vh', overflow: 'auto'}}>
                                                        <ChatSession messages={this.state.messages} />
                                                    </List>
                                                </Card>
                                            ) : (
                                                <Card style={{padding: "15px"}}>
                                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                        <CircularProgress/>
                                                    </div>
                                                </Card>
                                            )}
                                        </Tab>
                                    ))}
                                </Tabs>

                                <Card style={{padding: "5px"}}>
                                    
                                    <form id="message-form" onSubmit={this.sendMessage}>
                                        <TextField
                                            id='message-text'
                                            name="newMessage" 
                                            fullWidth={true} 
                                            value={newMessage} 
                                            autoComplete={"off"} 
                                            onChange={this.handleInput} 
                                            hintText="Enter a message..."/>
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
                            </div>) : (
                                <Card>
                                    <CardTitle title="You are not associated with any users" />
                                </Card>
                            )}
                    </div>) : (
                        <Card style={{padding: 50}}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </div>
                        </Card>
                )}
            </div>
		);
	}
}

export default VetChat;
