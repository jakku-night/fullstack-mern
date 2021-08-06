import React, { Fragment, useState, useEffect, useContext } from 'react';
const io = require('socket.io-client');
const socket = io('/');
import usercontext from '../contexts/usercontext';

const Chat = () => {
    
    const context = useContext(usercontext);
    const [log, setlog] = useState([]);
    const [user, setuser] = useState(context.user);

    useEffect(() => {
        setuser(context.user);
    });

    useEffect(() => {
        console.log('Mounting...');
        socket.on('msg', (data) => {
            setlog([...log, JSON.parse(data)]);
            console.log('Log changed!', log);
        });
        console.log('Mounted');
        return () => {
            console.log('Unmounting...');
            console.log('Unmounted');
        };
    }, [log]);

    const send = (event) => {
        console.log('Sending...');
        const input = document.getElementById('msg');
        event.preventDefault();
        const data = {
            message: input.value,
            username: user.username
        };
        socket.emit('msg', JSON.stringify(data));
        console.log('Sent');
        input.value = '';
    };

    if(user.id != ''){
        return (
            <Fragment>
                <div id="chat" border="1">
                    {log.map((msg, key) => (
                        <p key={key}>{msg.username}: {msg.message}</p>
                    ))}
                </div>
                <input type="text" id="msg" />
                <button id="send" onClick={send}>Send</button>
            </Fragment>
        );
    }else{
        return (<Fragment></Fragment>);
    }
};

export default Chat;