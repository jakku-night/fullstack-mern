import React, { Fragment, useState, useEffect } from 'react';
const io = require('socket.io-client');
const socket = io('/');

const Chat = () => {
    
    const [log, setlog] = useState([]);

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
        socket.emit('msg', input.value);
        console.log('Sent');
        input.value = '';
    };

    return (
        <Fragment>
            <div id="chat" border="1">
                {log.map((msg, key) => (
                    <p key={key}>{msg.id}: {msg.msg}</p>
                ))}
            </div>
            <input type="text" id="msg" />
            <button id="send" onClick={send}>Send</button>
        </Fragment>
    );
};

export default Chat;