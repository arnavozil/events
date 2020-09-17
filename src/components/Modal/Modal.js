import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-date-picker';
import { FcCalendar } from 'react-icons/fc';

import PrimaryButton from '../../widgets/Button/Button';
import { findDate, findTime, isTimeColliding } from '../../utils/index';
import PrimaryHeading from '../../widgets/Heading/Heading';
import TextInput, { DropDown } from '../../widgets/Input/Input';
import s from './Modal.module.scss';

const Modal = ({
    show = false,
    eventTypes = [],
    events = [],
    hideModal = () => {},
    addEvent = () => {},
    message = false,
    rerender = () => {},
}) => {

    const mainRef = useRef(null);

    const [eventName, setEventName] = useState('');
    const [options, toggleOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [date, setDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonText, setButtonText] = useState('Add');

    useEffect(() => {
        if(!mainRef?.current){
            return;
        };

        const { expand, shrink } = s;

        const applyClass = className => mainRef.current.classList.add(className);
        const removeClass = className => mainRef.current.classList.remove(className);

        if(show){
            removeClass(shrink);
            applyClass(expand);
        }else{
            removeClass(expand);
            applyClass(shrink);
        }

    }, [show]);

    const chooseOption = option => {
        setSelectedOption(option);
        toggleOptions(false);
    };

    const validateSlot = (currDate, events, currTime) => {
        const date = findDate(currDate);
        
        if(!events?.length){
            return;
        }

        const existingDays = events.filter(el => {
            return (findDate(el.start) === date || findDate(el.end) === date);
        });

        return existingDays.some(day => {

            const startTime = findTime(day.start);
            const endTime = findTime(day.end);

            return isTimeColliding(currTime, `${startTime}-${endTime}`);
        });
    };

    useEffect(() => {

        setButtonText('Add');
        const { success, message: msg } = message || {};

        if(success){
            onCancelClick();
            rerender();
        }else{
            setErrorMessage(msg);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }

    }, [message]);

    const handleTimeClick = (time, conflicts = false) => {
        if(conflicts){
            return;
        };
        setCurrentTime(time);
    }

    const renderSlots = (currDate, events) => {
        
        return Array(48).fill(null).map((el, index) => {

            const hour = Math.floor(index / 2);
            const start = hour;
            const end = index % 2 === 0 ? hour : hour + 1;
            const suffix = index % 2 === 0 ? [':00', ':30'] : [':30', ':00'];
            const timeString = `${start}${suffix[0]} - ${end}${suffix[1]}`;
            const conflicts = validateSlot(currDate, events, timeString);
            const classes = timeString === currentTime ? s.selected : '';

                return (
                <div 
                    key = {index} 
                    className = {[s.main_content_slots_item, classes].join(' ')}
                    style = {!conflicts ? {
                        color: '#555555',
                        borderColor: '#555555',
                        cursor: 'pointer'
                    } : {}}
                    onClick = {() => handleTimeClick(timeString, conflicts)}
                >
                    {timeString}
                </div>
            )
        })
    }

    const onCancelClick = (short = false) => {
        setEventName('');
        toggleOptions(false);
        setSelectedOption('');
        setDate(new Date());
        setCurrentTime('');
        if(!short){
            hideModal();
        }
    };

    const onAddEventClick = () => {
        addEvent(eventName, selectedOption, date, currentTime);
        setButtonText('Loading');
        onCancelClick(true);
    };

    const renderShimmer = () => {

        return(<>
            <div className = {s.shimmerevent} />
            <div className = {s.shimmerevent} />
            <div className = {[s.shimmerevent, s.shimmerevent_big].join(' ')} />
        </>)
    }

    return (
        <div className = {s.main} ref = {mainRef}>
            <div className = {s.main_content}>
                <PrimaryHeading 
                    text = 'Add an Event'
                />
                {!!events && !!eventTypes?.length ? <div className = {s.main_content_area}>
                    <TextInput 
                        placeholder = 'Event Name'
                        inputClassName = {s.main_content_area_input}
                        value = {eventName}
                        onChange = {setEventName}
                        containerClassName = {s.main_content_area_container}
                    />
                    <DropDown 
                        placeholder = 'Event Type'
                        inputClassName = {s.main_content_area_input}
                        onRequestDropdown = {() => toggleOptions(!options)}
                        showDropdown = {options}
                        options = {eventTypes}
                        selected = {selectedOption}
                        onChooseOption = {chooseOption}
                        containerClassName = {s.main_content_area_container}
                    />
                    <h4 className = {s.main_content_area_text}>Choose Event Date</h4>
                    <DatePicker 
                        value = {date}
                        calendarIcon = {<FcCalendar />}
                        minDate = {new Date()}
                        onChange = {setDate}
                        className = {s.main_content_area_calendar}
                    />
                    <h4 className = {s.main_content_area_text}>Choose Event Time</h4>
                    <div className = {s.main_content_slots}>
                        {renderSlots(date, events)}
                    </div>
                </div> : renderShimmer()}
                <div className = {s.main_content_tray}>
                    <PrimaryButton 
                        text = 'Cancel'
                        secondary
                        clickable  
                        onProceed = {onCancelClick} 
                    />
                    <span className = {s.main_content_tray_voidVertical} />
                    <PrimaryButton 
                        text = {buttonText}
                        onProceed = {onAddEventClick}
                        clickable = {!!eventName && !!selectedOption && !!date && !!currentTime}
                    />
                </div>
                {errorMessage && <p className = {s.main_content_message}>
                    {errorMessage}
                </p>}
            </div>
        </div>
    );
};


export default Modal;