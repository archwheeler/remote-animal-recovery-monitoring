import React from 'react';
import Proptypes from 'prop-types';
import { format } from 'date-fns';

const ChatSession = props => {
    const { messages } = props;
    return (
        <div>
            {messages.map(message => {
            const time = format(new Date(`${message.updatedAt}`), 'HH:mm');

            const arr = message.parts.map(p => {
                if (p.partType === "inline") {
                    return (
                        <span>{p.payload.content}</span>
                    );
                }

                if (Date.now() > Date.parse(p.payload._expiration)) {
                    p.payload._fetchNewDownloadURL();
                }

                return (
                    <div className="media">
                        <img className="image-attachment" src={p.payload._downloadURL} alt="attachment" />
                    </div>
                );
            });

            return (
                <li className="message" key={message.id}>
                <div>
                    <span className="user-id">{message.senderId}</span>
                    {arr}
                </div>
                <span className="message-time">{time}</span>
                </li>
            );
            })}
        </div>
    );
};

ChatSession.propTypes = {
    messages: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default ChatSession;