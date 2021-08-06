import React, { Fragment, useContext } from 'react';
import usercontext from '../contexts/usercontext';

const Login = () => {
    const user = useContext(usercontext);
    console.log('Login "State":', user.user);
    if(user.user.id == ''){
        return (
            <Fragment>
                <h3>Login</h3>
                <form onSubmit={user.login}>
                    <input type="text" placeholder="Username" name="username" id="username" />
                    <input type="password" placeholder="Password" name="password" id="password" />
                    <button type="submit">Login!</button>
                </form>
            </Fragment>
        );
    }else{
        return (<Fragment></Fragment>);
    }
};

export default Login;