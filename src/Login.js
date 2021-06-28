import React from 'react';
import {Button} from '@material-ui/core';
import {auth, provider} from './firebase';
import './Login.css';
import image from './kisspng-imessage-macos-messages-apple-messenger-social-apps-all-in-one-google-play-5c11253de94995.0680294115446275179556.png'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src={image} alt="" />
            </div>
            <Button onClick={signIn} className="login__btn">Sign In</Button>
        </div>
    )
}

export default Login;
