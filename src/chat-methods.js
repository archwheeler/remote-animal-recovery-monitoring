import Chatkit from "@pusher/chatkit-client";
import axios from "axios";

function sendMessage(event) {
  event.preventDefault();
  const { newMessage, currentUser, currentRoom } = this.state;

  if (newMessage.trim() === "") return;

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

function handleInput(event) {
  const { value, name } = event.target;

  this.setState({
    [name]: value
  });
}

function connectToRoom(id = currentUser.rooms[0].id) {
  const { currentUser } = this.state;

  this.setState({
    messages: []
  });

  return currentUser
    .subscribeToRoomMultipart({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        },
        onPresenceChanged: () => {
          const { currentRoom } = this.state;
          this.setState({
            roomUsers: currentRoom.users.sort(a => {
              if (a.presence.state === "online") return -1;

              return 1;
            })
          });
        }
      }
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
        roomName
      });
    })
    .catch(console.error);
}

function connectToChatkit(event) {
  event.preventDefault();

  const { userId } = this.state;

  if (userId === null || userId.trim() === "") {
    alert("Invalid userId");
    return;
  }

  this.setState({
    isLoading: true
  });

  axios
    .post("http://localhost:8080/users", { userId })
    .then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0fa440f3-996e-4157-beb1-efdc519b3973/token"
      });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:0fa440f3-996e-4157-beb1-efdc519b3973",
        userId,
        tokenProvider
      });

      return chatManager
        .connect({
          onAddedToRoom: room => {
            const { rooms } = this.state;
            this.setState({
              rooms: [...rooms, room]
            });
          }
        })
        .then(currentUser => {
          this.setState(
            {
              currentUser,
              showLogin: false,
              isLoading: false,
              rooms: currentUser.rooms
            },
            () => connectToRoom.call(this)
          );
        });
    })
    .catch(console.error);
}

function createPrivateRoom(id) {
  const { currentUser, rooms } = this.state;
  const roomName = `${currentUser.id}_${id}`;

  const isPrivateChatCreated = rooms.filter(room => {
    if (room.customData && room.customData.isDirectMessage) {
      const arr = [currentUser.id, id];
      const { userIds } = room.customData;

      if (arr.sort().join("") === userIds.sort().join("")) {
        return {
          room
        };
      }
    }

    return false;
  });

  if (isPrivateChatCreated.length > 0) {
    return Promise.resolve(isPrivateChatCreated[0]);
  }

  return currentUser.createRoom({
    name: `${roomName}`,
    private: true,
    addUserIds: [`${id}`],
    customData: {
      isDirectMessage: true,
      userIds: [currentUser.id, id]
    }
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
  sendMessage,
  handleInput,
  connectToRoom,
  connectToChatkit,
  sendDM,
  onDrop,
  sendFile,
  openImageUploadDialog,
  closeImageUploadDialog,
};