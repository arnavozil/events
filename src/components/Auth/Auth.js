import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookies';
import {
    useHistory
} from 'react-router-dom';

import scene from '../../assets/login.png';
import logo from '../../assets/logo.png';
import Login from '../Login/Login';
import s from './Auth.module.scss';
import Register from '../Register/Register';

const Auth = () => {
    const { push } = useHistory();

    const [currentTab, setCurrentTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(false);

    const navRef = useRef(null);

    const setCredentials = (email, password) => {
        setEmail(email);
        setAutoLogin(true);
        setPassword(password);
    }

    useEffect(() => {
        if(Cookies.getItem('token')){
            push('/events');
        }

        if(!navRef?.current){
            return;
        };

        if(currentTab === 'login'){
            navRef.current.style.left = '1%';
        }else{
            navRef.current.style.left = '51%';
        };

    }, [currentTab]);

    const changeCurrentTab = index => {
        if(index === 0){
            setCurrentTab('login');
        }else{
            setCurrentTab('register');
        };
    };

    return (
        <div className={s.main}>
            
            <div className = {s.main_image}>
                <img 
                    src = {scene}
                    alt = 'Login Screen'
                    className = {s.main_image_img}
                />
            </div>

            <div className = {s.main_actions}>
                <nav className={s.main_nav}>
                    <span onClick = {() => changeCurrentTab(0)} className={s.main_nav_item}>
                        Login
                    </span>
                    <span onClick = {() => changeCurrentTab(1)} className={s.main_nav_item}>
                        Register
                    </span>
                    <span ref = {navRef} className={s.main_nav_back} />
                </nav>

                <div className = {s.main_logo}>
                    <img 
                        className = {s.main_logo_img}
                        alt = 'events'
                        src = {logo}
                    />
                </div>

                {currentTab === 'login' ?
                <Login 
                    changeCurrentTab = {changeCurrentTab} 
                    email = {email} password = {password}    
                    autoLogin = {autoLogin}
                    stopAutoLogin = {() => setAutoLogin(false)}
                /> :
                <Register 
                    changeCurrentTab = {changeCurrentTab} 
                    setCredentials = {setCredentials}    
                />}
            </div>

        </div>
    );

};


export default Auth;