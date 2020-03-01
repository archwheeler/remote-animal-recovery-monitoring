import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import {store} from "./store";

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value,
  });
}

function connectToChatkit() {

  const userId = "Vet";

  if (userId === null || userId.trim() === '') {
    alert('Invalid userId');
    return;
  }

  const instance = "bc55c891-bd0f-475b-8ec6-7216d20ab4cf";

  const tokenProvider = new Chatkit.TokenProvider({
    url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/' + instance + '/token',
  });

  const chatManager = new Chatkit.ChatManager({
    instanceLocator: 'v1:us1:' + instance,
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
      connectToRoom.call(this, currentUser.rooms[0].id);
    });
}

function connectToRoom(id) {
  const { currentUser } = this.state;

  this.setState({
    messages: [],
  });

  return currentUser
    .subscribeToRoomMultipart({
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

  const parts = [];
  if (newMessage.trim() !== "") {
    parts.push({
      type: "text/plain",
      content: newMessage
    });
  }

  currentUser.sendMultipartMessage({
    roomId: `${currentRoom.id}`,
    parts
  });

  this.setState({
    newMessage: ""
  });
}

function onDrop(pictureFiles) {
  this.setState({
    pictures: this.state.pictures.concat(pictureFiles)
  });
}

function openImageUploadDialog() {
  this.setState({
    showImageUploadDialog: true
  });
}

function closeImageUploadDialog() {
  this.setState({
    showImageUploadDialog: false
  });
}

function sendFile(event) {
  event.preventDefault();
  const { currentUser, fileUploadMessage, pictures, currentRoom } = this.state;

  if (pictures.length === 0) return;

  const parts = [];
  if (fileUploadMessage.trim() !== "") {
    parts.push({
      type: "text/plain",
      content: fileUploadMessage
    });
  }

  pictures.forEach(pic => {
    parts.push({
      file: pic
    });
  });

  currentUser.sendMultipartMessage({
    roomId: `${currentRoom.id}`,
    parts
  });

  this.setState({
    fileUploadMessage: "",
    pictures: [],
    showImageUploadDialog: false
  });
}

export {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  onDrop,
  sendFile,
  openImageUploadDialog,
  closeImageUploadDialog,
}
