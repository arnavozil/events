import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookies';
import {
    useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { MdAdd } from 'react-icons/md';

import { 
    getEventTypes,
    getUserEvents,
    createUserEvent
} from '../../actions/index';
import { findDate } from '../../utils/index';
import s from './Events.module.scss';
import Header from '../Header/Header';
import Available from '../Available/Available';
import PrimaryButton from '../../widgets/Button/Button';
import Scheduled from '../Scheduled/Scheduled';
import Modal from '../Modal/Modal';

const colors = ['#321325', '#5f04f0', '#9a031e', '#cb793a', '#fcdc4d', '#84a07c', '#e6f14a', '#cacaaa', '#eec584', '#0081a7', '#00afb9', '#f07167', '#fe5e41', '#35ff69'];

const Events = ({
    dispatch,
    getEventTypeState,
    getEventState,
    createEventState
}) => {

    const { push } = useHistory();

    const [types, setTypes] = useState([]);
    const [userEvents, setUserEvents] = useState(false);
    const [modal, toggleModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(false);

    useEffect(() => {

        const token = Cookies.getItem('token');
        if(!token){
            push('/');
        };

        dispatch(getEventTypes({token}));
        dispatch(getUserEvents({token}));
    }, []);

    useEffect(() => {

        const { eventTypes = [] } = getEventTypeState;
        setTypes(eventTypes);
    }, [getEventTypeState]);

    useEffect(() => {

        if(!Object.keys(createEventState).length){
            return;
        };

        setModalMessage(createEventState);
    }, [createEventState]);

    useEffect(() => {
        const { events = [] } = getEventState;
        setUserEvents(events);
    }, [getEventState]);

    const rerenderComponent = () => {

        const token = Cookies.getItem('token');
        setTypes([]);
        setUserEvents(false);
        dispatch(getEventTypes({token}));
        dispatch(getUserEvents({token}));
    };

    const addEvent = (name, eventType, selectedDate, time) => {

        const token = Cookies.getItem('token');
        
        const buildDate = (date, time) => new Date(moment(date+' '+time).format()).toISOString();

        const date = findDate(selectedDate);
        const [startTime, endTime] = time.split(' - ');
        const startDate = buildDate(date, startTime);
        const endDate = buildDate(date, endTime);

        dispatch(createUserEvent({
            token, name, event_type: eventType,
            end: endDate, start: startDate
        }));

    };

    return (
        <div className = {s.main}>
            <Header />
            <Available 
                events = {userEvents}
                eventTypes = {types}
                colors = {colors}
            />
            <Scheduled 
                events = {userEvents}
                eventTypes = {types}
                colors = {colors}
            />
            <PrimaryButton 
                text = 'Add an Event'
                className = {s.main_adder}
                clickable
                children = {<MdAdd />}
                onProceed = {() => toggleModal(true)}
            />
            <Modal 
                show = {modal}
                hideModal = {() => toggleModal(false)}
                eventTypes = {types}
                events = {userEvents}
                addEvent = {addEvent}
                message = {modalMessage}
                rerender = {rerenderComponent}
            />
        </div>
    );

};

const matchStateToProps = state => {
     
    const { getEventTypeState, getEventState, createEventState } = state || {};

    return {
        getEventTypeState,
        getEventState,
        createEventState
    };
}

export default connect(matchStateToProps)(Events);