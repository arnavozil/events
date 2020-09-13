import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/index';

import PrimaryButton from '../../widgets/Button/Button';
import TextInput from '../../widgets/Input/Input';
import s from './Register.module.scss';

const Register = ({
    dispatch,
    registerState,
    changeCurrentTab,
    setCredentials
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Register Me');
    const [warning, setWarning] = useState('');

    const signupUser = () => {
        dispatch(registerUser({email, password}));
        setButtonText('Loading');
    };

    useEffect(() => {
        setButtonText('Register Me');

        const { message, success } = registerState || {};
        
        if(!success){
            setWarning(message);
            setTimeout(() => {
                setWarning('');
            }, 3500);
        }else{
            changeCurrentTab(0);
            setCredentials(email, password);
        };

    }, [registerState]);

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
                    onProceed = {signupUser}
                />
                <PrimaryButton 
                    text = 'Login instead'
                    clickable
                    secondary
                    onProceed = {() => changeCurrentTab(0)}
                />
            </div>
            {warning && <p className = {s.main_warning}>{warning}</p>}
        </div>
    );
};

const matchStateToProps = state => {

    const { registerState } = state || {};

    return {
        registerState
    };
}

export default connect(matchStateToProps)(Register);