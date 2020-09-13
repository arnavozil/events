import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookies';
import {
    useHistory
} from 'react-router-dom';

import { loginUser } from '../../actions/index';
import PrimaryButton from '../../widgets/Button/Button';
import TextInput from '../../widgets/Input/Input';
import s from './Login.module.scss';

const Login = ({
    email: defaultEmail,
    password: defaultPassword,
    autoLogin,
    dispatch,
    loginState,
    changeCurrentTab,
    stopAutoLogin
}) => {

    const { push } = useHistory();

    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState(defaultPassword);
    const [buttonText, setButtonText] = useState('Log Me In');
    const [warning, setWarning] = useState('');

    const welcomeUser = () => {
        dispatch(loginUser({email, password}));
        setEmail('');
        setPassword('');
        setButtonText('Loading');
    };

    useEffect(() => {

        if(autoLogin){
            setButtonText('Loading');
            dispatch(loginUser({email, password}));
            stopAutoLogin();
        };

    }, [autoLogin]);

    useEffect(() => {
        setButtonText('Log Me In');

        const { message, token, success } = loginState || {};
        
        if(!success){
            setWarning(message);
            setTimeout(() => {
                setWarning('');
            }, 3500);
        }else{
            Cookies.setItem('token', token);
            push('/events');
        };

    }, [loginState]);

    return (
        <div className = {s.main}>
            
            <TextInput 
                placeholder = 'Email'
                uid = 'login_email'
                value = {email}
                onChange = {setEmail}
                type = 'email'
            />
            <TextInput 
                placeholder = 'Password'
                uid = 'login_password'
                value = {password}
                onChange = {setPassword}
                type = 'password'
            />
            <div className = {s.main_buttonholder}>
                <PrimaryButton 
                    text = {buttonText}
                    clickable = {!!email && !!password && buttonText !== 'Loading'}
                    onProceed = {welcomeUser}
                />
                <PrimaryButton 
                    text = 'Signup instead'
                    clickable
                    secondary
                    onProceed = {() => changeCurrentTab(1)}
                />
            </div>
            {warning && <p className = {s.main_warning}>{warning}</p>}
        </div>
    );

};

const matchStateToProps = state => {


    const { loginState } = state || {};

    return {
        loginState
    };
}

export default connect(matchStateToProps)(Login);