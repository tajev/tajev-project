import React from 'react';
import { Redirect } from 'react-router-dom';
import  './login.css';

const Logout =props=> {
    //    props.setUser(Null);   
    props.setEmail('');
    props.setToken('');   
        return (
            <Redirect to='/'/>
        );
    
}

export default Logout;