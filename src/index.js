import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/chat';
import User from './components/user';
import Navbar from './components/navbar';
import Login from './components/login';

const App = () => {
    return (
        <Fragment>
            <User>
                <Navbar />
                <Login />
                <Chat />
            </User>
        </Fragment>
    );
};
const root = document.getElementById('root');

ReactDOM.render(<App />, root);