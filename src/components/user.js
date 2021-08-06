import React, { useState, createContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import usercontext from '../contexts/usercontext';

const initial_user = {
    id: '',
    username: '',
    token: ''
};

const User = ({children}) => {
    const [user, setuser] = useState(initial_user);

    const login = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        try{
            const res = await fetch('http://localhost:3000/login/',{
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                },
                body: form
            });
            const data = JSON.parse(await res.json());
            console.log(data);
            if(data.status == 'OK'){
                console.log('Loged in!');
                const new_user = {
                    id: data.id,
                    username: data.username,
                    token: data.token
                };
                setuser(new_user);
            }else{
                console.error(data.status);
            }
        }catch(error){
            console.error(error);
        }
    };
    const logout = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('id', user.id);
        form.append('token', user.token);
        form.append('username', user.username);
        try{
            const res = await fetch('http://localhost:3000/logout/',{
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                },
                body: form
            });
            const data = JSON.parse(await res.json());
            if(data.status == 'OK'){
                setuser({
                    id: '',
                    username: '',
                    token: ''
                });
            }else{
                console.error(data.status);
            }
        }catch(error){
            console.error(error);
        }
    };
    const signup = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        try{
            const res = await fetch('http://localhost:3000/signup/',{
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                },
                body: form
            });
            const data = JSON.parse(await res.json());
            if(data.status == 'OK'){
                const new_user = {
                    id: data.id,
                    username: data.username,
                    token: data.token
                };
                setuser(new_user);
            }else{
                console.error(data.status);
            }
        }catch(error){
            console.error(error);
        }
    };

    const data = { user, login, logout, signup };
    
    return (
        <usercontext.Provider value={data}>
            {children}
        </usercontext.Provider>
    );
};

export default User;