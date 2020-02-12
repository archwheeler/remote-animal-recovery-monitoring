import React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {messages: []};
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
		return (
            <div>
			<Card>
                    <List style={{maxHeight: '575px', overflow: 'auto'}} >
                        {this.state.messages.map(message => 
                        <ListItem key={message.id} disabled={true}>
                                {message.senderId + "> " + message.parts[0].payload.content}
                        </ListItem>)}
                        <div style={{ float:"left", clear: "both" }}
                             ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </List>
                </Card>
                <Card style={{padding: "5px"}}>
                    <form id="message-form">
                        <TextField id='message-text' fullWidth={true} autoComplete={"off"} hintText="Enter a message..."/>
                    </form>
                </Card>
            </div>
		);
	}
}

export default Chat;
