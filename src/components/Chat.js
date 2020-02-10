import React from 'react';

class Chat extends React.Component {
    sendMessage(e) {
        e.preventDefault();
        const input = document.getElementById("message-text");
        this.currentUser.sendSimpleMessage({
            text: input.value,
            roomId: this.currentUser.rooms[0].id
        });
        input.value = "";
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
                        const ul = document.getElementById("message-list");
                        const li = document.createElement("li");
                        li.appendChild(
                            document.createTextNode(`${message.senderId}: ${
                                // TODO: check the partType here.
                                message.parts[0].payload.content
                            }`)
                        );
                        ul.appendChild(li);
                    }
                }
            });

            this.form = document.getElementById("message-form");
            this.form.addEventListener("submit", this.sendMessage.bind(this));
        })
        .catch(error => {
            console.error("error:", error);
        });
            
    }

    componentWillUnmount() {
        this.form.removeEventListener("submit", this.sendMessage.bind(this));
        this.currentUser.disconnect();
    }

	render() {
		return (
			<div>
                <ul id="message-list"></ul>
                <form id="message-form">
                    <input type='text' id='message-text' />
                    <input type="submit" />
                </form>
            </div>
		);
	}
}

export default Chat;
