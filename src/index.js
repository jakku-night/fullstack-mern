import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/chat';

const App = () => {
    return (
        <Fragment>
            <h1>React works!</h1>
            <Chat />
        </Fragment>
    );
};
const root = document.getElementById('root');

ReactDOM.render(<App />, root);