import React, {useState, useEffect} from 'react';
import FlipMove from 'react-flip-move';
import './Chat.css';
import MicNoneIcon from '@material-ui/icons/MicNone';
import {IconButton} from '@material-ui/core';
import Message from './Message';
import { useSelector, useDispatch } from 'react-redux';
import { selectChatName, selectChatId, selectShow, setShow } from './features/chatslice';
import db from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Chat() {

    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const show = useSelector(selectShow);
    const dispatch = useDispatch();

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            });
        }
    }, [chatId])

    const sendMessage = (event) =>{
        event.preventDefault();

        //firebase magic
        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })

        setInput('');
    }

    return (
        <div className={ `chat ${show ? 'chat__show' : ''}`}>
            <div className="chat__header">
                {show ? <IconButton onClick={() => dispatch(setShow())} className="chat__back">
                    <ArrowBackIcon  />
                </IconButton> : null}
                
                <h4>To : <span className="chat__name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            <div className="chat__messages">
                <FlipMove>
                    {messages?.map(({id, data}) => (
                        <Message key={id} content={data} />
                    ))}
                </FlipMove>
                
            </div>

            <div className="chat__input">
                <form>
                    <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="iMessage" />
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton >
                    <MicNoneIcon className="chat__mic" />
                </IconButton>
            </div>

            
        </div>
    )
}

export default Chat;
