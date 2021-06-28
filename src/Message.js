import { Avatar } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './Message.css';
import * as timeago from 'timeago.js';

const Message = forwardRef(({id, content: {timestamp, displayName, email, photo, uid, message}}, ref) => {

    const user = useSelector(selectUser);
    return (
        <div ref={ref} className={`message ${user.email === email ? 'message__sender' : ''}`}>
            <Avatar className="message__photo" src={photo} />
            <p >{message}</p>
            <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
        </div>
    )
})

export default Message;
