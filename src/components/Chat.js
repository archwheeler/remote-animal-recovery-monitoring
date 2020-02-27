import React from 'react';
import List from 'material-ui/List/List';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import {store} from '../store';

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

import {Image} from 'react-feather';

import './Chat.css';

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
            newMessage: '',
            pictures: [],
            showImageUploadDialog: false,
            fileUploadMessage: "",
            information: {
				name: "",
				firstLetterOfName: "",
				sex: "",
				species: "",
				bodyweight: "", //this should be an integer (perhaps kg?)
				owner_name: "", // VARCHAR
				op_name: "", //VARCHAR - name of the operation
				op_date: "2000-01-01", //DATE
				body_condition: 0, //INT (out of 9)
				injury_info: "", //TEXT
				procedure_details: "", //TEXT
				surgery_data: "", //TEXT
				abnormalities: "", //TEXT
				location: "", //VARCHAR
				stitches_or_staples: true, //BOOLEAN - true if stitches
				length_of_rest: 0, //INT - how many days rest?
				cage_or_room: true, //BOOLEAN - true if cage
				next_appt: "2000-01-01 00:00:00", //DATETIME
				meds_name: "",
				meds_amount: 0,
				meds_frequency: 0,
				meds_start: "2000-01-01", //DATE??
				meds_length_of_course: 0,
            },
        };

        this.handleInput = handleInput.bind(this);
        this.connectToChatkit = connectToChatkit.bind(this);
        this.connectToRoom = connectToRoom.bind(this);
        this.sendMessage = sendMessage.bind(this);
        this.onDrop = onDrop.bind(this);
        this.openImageUploadDialog = openImageUploadDialog.bind(this);
        this.closeImageUploadDialog = closeImageUploadDialog.bind(this);
        this.sendFile = sendFile.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
        this.connectToChatkit();
    }

    getInformation = async(animalID) => {
		const response = await fetch('http://localhost:5000/getAnimalInfo/' + animalID);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
    }

    componentDidMount() {
        this.getInformation("123").then(info => this.setState({information:info}))
            .catch(err => console.log(err));
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
          showImageUploadDialog,
          fileUploadMessage
        } = this.state;

		return (
            (store.getState().loggedIn)?
            <div>
                <Card>
					<CardHeader title = {this.state.information.name}
									subtitle={"Sex: " + ((this.state.information.sex=="M")?"Male":"Female") + ", Animal Type: "+ this.state.information.species}
									avatar={<Avatar>{this.state.information.firstLetterOfName}</Avatar>}
					/>
                </Card>
                {this.state.currentRoom ? (
                    <Card>
                        <List className="chat-messages" style={{maxHeight: '60vh', overflow: 'auto'}}>
                            <ChatSession messages={messages} />
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
            </div>
            :
            <div>
			{window.location.assign("/")}
            </div>
		);
	}
}

export default Chat;
