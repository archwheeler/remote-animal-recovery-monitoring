import React from 'react';
import Proptypes from 'prop-types';
import { format } from 'date-fns';
import ListItem from 'material-ui/List/ListItem';

const ChatSession = props => {
    const { messages } = props;
    return (
        <div>
            {messages.map(message => {
            const time = format(new Date(`${message.updatedAt}`), 'HH:mm');

            const arr = message.parts.map((p, index) => {
                if (p.partType === "inline") {
                    return (
                        <span key={index}>{p.payload.content}</span>
                    );
                }

                if (Date.now() > Date.parse(p.payload._expiration)) {
                    p.payload._fetchNewDownloadURL();
                }

                return (
                    <div className="media" key={index}>
                        <img className="image-attachment" src={p.payload._downloadURL} alt="attachment" />
                    </div>
                );
            });

            return (
                <ListItem className="message" key={message.id} disabled={true}>
                    {time + " " + message.senderId + "> "}
                    {arr}
                </ListItem>
            );
            })}
        </div>
    );
};

ChatSession.propTypes = {
    messages: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default ChatSession;