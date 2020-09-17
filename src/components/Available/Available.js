import React from 'react';
import PrimaryHeading from '../../widgets/Heading/Heading';
import moment from 'moment';

import s from './Available.module.scss';

const Available = ({
    events = false,
    eventTypes = [],
    colors = []
}) => {

    const renderEvents = e => {

        return e.map(el => {
            
            const {
                name, event_type,
                start, end, id
            } = el;

            const color = colors[eventTypes.indexOf(event_type)] || '#dfdfdf';

            return (
                <div 
                    className = {s.main_eventgrid_event} 
                    key = {id}
                >
                    <span className = {s.main_eventgrid_event_name}>
                        {name}
                    </span>
                    <span className = {s.main_eventgrid_event_type}>
                        {event_type}
                    </span>
                    <div className = {s.main_eventgrid_event_time}>
                        <span className = {s.main_eventgrid_event_time_text}>
                            {moment(start).format('DD/MM/YYYY hh:mm A')}
                        </span>
                        <span className = {s.main_eventgrid_event_time_dash}>-</span>
                        <span className = {s.main_eventgrid_event_time_text}>
                            {moment(end).format('DD/MM/YYYY hh:mm A')}
                        </span>
                    </div>
                    <span 
                        className = {s.main_eventgrid_event_color}
                        style = {{
                            backgroundColor: color
                        }}
                    />
                </div>
            )
        })
    }

    return (
        <div className = {s.main}>
            <PrimaryHeading
                text = 'Current Events'
            />
            <div className = {s.main_eventgrid}>
                {!!events?.length ? renderEvents(events) :
                events ? <p className = {s.main_eventgrid_message}>The events you add will be displayed here.</p> :
                Array(4).fill(null).map((e, ind) => <div key = {ind} className = {s.shimmerevent} />)
                }
            </div>
        </div>
    );
};


export default Available;