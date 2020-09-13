import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';

import s from './Input.module.scss';

const TextInput = ({
    value = '',
    onChange = () => {},
    placeholder = 'Search...',
    type = 'text',
    containerClassName = '',
    inputClassName = '',
    uid = '',
    required = true
}) => {

    return(
        <div className = {[s.textinput, containerClassName].join(' ')}>
            {uid && <label className = {s.textinput_label} htmlFor = {uid}>{placeholder}</label>}
            <input 
                name = {uid}
                id = {uid}
                value = {value}
                onChange = {e => onChange(e.target.value)}
                className = {[s.textinput_input, inputClassName].join(' ')}
                type = {type}
                placeholder = {placeholder}
                required = {required}
            />
        </div>
    )

};

export default TextInput;



const defaultOptions = ['Yes', 'No'];

export const DropDown = ({
    options = defaultOptions,
    selected  = '',
    onChooseOption = () => {},
    showDropdown = true,
    required = true,
    uid,
    placeholder,
    inputClassName = '',
    containerClassName = '',
    onRequestDropdown = () => {}
}) => {

    return (

        <div className = {[s.textinput, containerClassName].join(' ')}>
            {uid && <label className = {s.textinput_label} htmlFor = {uid}>{placeholder}</label>}
            <input 
                name = {uid}
                id = {uid}
                value = {selected}
                readOnly
                onChange = {onChooseOption}
                className = {[s.textinput_input, inputClassName].join(' ')}
                placeholder = {placeholder}
                required = {required}
            />
            
            {showDropdown && <div className = {s.dropdown}>
                {options.map(el => <span 
                    onClick = {() => onChooseOption(el)} 
                    key = {el} 
                    className = {s.dropdown_element}
                >
                    {el}
                </span>)}
            </div>}
            
            <div onClick = {onRequestDropdown} className = {s.arrow}>
                <MdArrowDropDown />
            </div>

        </div>
    )
};