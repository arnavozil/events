import React from 'react';

import s from './Button.module.scss';

const PrimaryButton = ({
    text = 'Submit',
    clickable = false,
    onProceed = () => {},
    className = '',
    secondary = false,
    children = (<></>),
}) => {

    const handleClick = () => {

        if(!clickable){
            return;
        };

        onProceed();
    };

    const decideClass = !secondary ? s.primarybutton : s.secondarybutton;

    return (

        <div 
            style = {!clickable ? { cursor: 'not-allowed', background: '#aaa' } : {}}
            onClick = {handleClick}
            className = {[decideClass, className].join(' ')}
        >
            {children}
            {text}
        </div>
    );
};

export default PrimaryButton;