import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { findDate } from '../../utils/index';
import PrimaryHeading from '../../widgets/Heading/Heading';
import s from './Scheduled.module.scss';

const Scheduled = ({
    events = false,
    eventTypes = [],
    colors = []
}) => {

    const findSchedule = (events, date) => {
        let color = '#ffffff';
        const schedule = events.find(el => findDate(date) === findDate(el.start));

        if(schedule){
            color = colors[eventTypes.indexOf(schedule.event_type)];
        };
        return color;
    }

    const renderTiles = (tileInfo, events) => {
        const { date } = tileInfo;

        const color = findSchedule(events, date);
        return <div 
            style = {{
                backgroundColor: color
            }}
            className = {s.main_calendar_tile_dot}
        />
    };

    return (
        <div className = {s.main}>
            <PrimaryHeading 
                text = 'Scheduled Events'
            />
            <h5 className = {s.main_sub}>
                Days that have schedules placed against are highlighed by a coloured dot.
            </h5>
            {(!!events && !!eventTypes?.length) ? 
            <Calendar 
                className = {s.main_calendar}
                defaultView = 'month'
                tileClassName = {s.main_calendar_tile}
                tileContent = {info => renderTiles(info, events)}
            /> : 
            <div className = {s.shimmercalendar} />}
        </div>
    );

};

export default Scheduled;