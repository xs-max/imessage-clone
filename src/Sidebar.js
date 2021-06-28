import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import './Sidebar.css';
import  {Avatar , IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat';
import { selectUser } from './features/userSlice';
import db, {auth} from './firebase';
import {selectShow} from './features/chatslice';

function Sidebar() {
    
    const user = useSelector(selectUser);
    const show = useSelector(selectShow);
    const [chat, setChat] = useState();

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => {
            setChat(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const addChat = () => {
        const chatName = prompt('please enter a chatname');
        if(chatName) {
            db.collection('chats').add({
                chatName: chatName
            });
        }
    }

    return (
        <div className={`sidebar ${show ? 'sidebar__hide' : ''}`}>
            <div className="sidebar__header">
                <Avatar 
                    onClick={() => auth.signOut()} 
                    src={user.photo} 
                    className="sidebar__avatar"  />
                <div className="sidebar__input" >
                    <SearchIcon />
                    <input type="search" placeholder="search" />
                </div>
                <IconButton onClick={addChat} variant="outlined" className="sidebar__inputButton">
                    <RateReviewOutlinedIcon  />
                </IconButton>
                
            </div>
            <div className="sidebar__chat">
                {chat?.map(({id, data: {chatName}}) => (
                    <SidebarChat key={id} id={id} chatName={chatName} />
                ))}
            </div>
            
        </div>
    )
}

export default Sidebar;
