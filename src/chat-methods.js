import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value,
  });
}

function connectToChatkit() {

  const { userId } = this.state;

  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
    return;
  }

  axios
    .post('http://localhost:5200/users', { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'http://localhost:5200/authenticate',
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:bc55c891-bd0f-475b-8ec6-7216d20ab4cf',
        userId,
        tokenProvider,
      });

      return chatManager
        .connect({
          onAddedToRoom: room => {
            const { rooms } = this.state;
            this.setState({
              rooms: [...rooms, room],
            });
          },
        })
        .then(currentUser => {
          this.setState(
            {
              currentUser,
              showLogin: false,
              rooms: currentUser.rooms,
            }
          );
          connectToRoom.call(this);
        });
    })
    .catch(console.error);
}

function connectToRoom(id = '41ac18aa-8570-436c-a737-9e310afbaf3d') {
  const { currentUser } = this.state;

  this.setState({
    messages: [],
  });

  return currentUser
    .subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
          });
        },
        onPresenceChanged: () => {
          const { currentRoom } = this.state;
          this.setState({
            roomUsers: currentRoom.users.sort(a => {
              if (a.presence.state === 'online') return -1;

              return 1;
            }),
          });
        },
      },
    })
    .then(currentRoom => {
      const roomName =
        currentRoom.customData && currentRoom.customData.isDirectMessage
          ? currentRoom.customData.userIds.filter(
              id => id !== currentUser.id
            )[0]
          : currentRoom.name;

      this.setState({
        currentRoom,
        roomUsers: currentRoom.users,
        rooms: currentUser.rooms,
        roomName,
      });
    })
    .catch(console.error);
}

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === '') return;

  currentUser.sendMessage({
    text: newMessage,
    roomId: `${currentRoom.id}`,
  });

  this.setState({
    newMessage: '',
  });
}

export { handleInput, connectToChatkit, connectToRoom, sendMessage }