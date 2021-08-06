import React, { Fragment, useContext, useEffect, useState } from 'react';
import usercontext from '../contexts/usercontext';

const Navbar = () => {
    const context = useContext(usercontext);
    const [user, setuser] = useState(context.user);
    useEffect(() => {
        setuser(context.user);
    });

    return (
        <Fragment>
            <h1>Hello, {user.username}!</h1>
        </Fragment>
    );
};

export default Navbar;