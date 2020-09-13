import axios from 'axios';

const BASE = 'https://ik-react-task.herokuapp.com/';


// ACCOUNTS
// LOGIN
export const loginUser = ({
    email = '',
    password = ''
}) => {

    return async dispatch => {

        const config = {
            method: 'post',
            url: `${BASE}accounts/login/`,
            headers: { 
            'Content-Type': 'application/json'
            },
            data: {email, password}
        };

        try {

            const response = await axios(config);
            const { token } = response.data;

            dispatch({
                type: "LOGIN",
                payload: {
                    success: true,
                    message: 'Logged in successfully',
                    token
                }
            });

        } catch (err) {
            
            dispatch({
                type: "LOGIN",
                payload: {
                    success: false,
                    message: 'Something is wrong with the credentials. Please try again.',
                    token: null
                }
            });
        };
    };

    
};


// REGISTER
export const registerUser = ({
    email = '',
    password = ''
}) => {

    return async dispatch => {

        const config = {
            method: 'post',
            url: `${BASE}accounts/register/`,
            headers: { 
            'Content-Type': 'application/json'
            },
            data: {email, password}
        };

        try {

            const response = await axios(config);
            const { message } = response.data;

            dispatch({
                type: "REGISTER",
                payload: {
                    success: true,
                    message
                }
            });

        } catch (err) {
            
            dispatch({
                type: "REGISTER",
                payload: {
                    success: false,
                    message: 'Something is wrong with the credentials. Please try again.'
                }
            });
        };
    };
}


// EVENTS
// GET
export const getUserEvents = ({
    token = null
}) => {

    return async dispatch => {

        try {

            const config = {
                method: 'get',
                url: `${BASE}events`,
                headers: { 
                  'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios(config);
            const events = response.data;
            
            dispatch({
                type: "GET_USER_EVENTS",
                payload: {
                    success: true,
                    message: 'Events fetched successfully',
                    events
                }
            });

        } catch (err) {
            
            dispatch({
                type: "GET_USER_EVENTS",
                payload: {
                    success: false,
                    message: 'Something is wrong with the network. Please try after some time.',
                    events: null
                }
            });
        };
    };
}


// CREATE
export const createUserEvent = ({
    name, token,
    event_type,
    start, end
}) => {

    // const headers = new Headers();
    // headers.append("Authorization", `Bearer ${token}`);
    // headers.append("Content-Type", "application/json");

    // const body = JSON.stringify({ name, event_type, start, end });

    // const requestOptions = {
    //     method: 'POST',
    //     headers,
    //     body,
    //     redirect: 'follow'
    // };

    // fetch(`${BASE}events/`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    return async dispatch => {
        
        try {
            
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            headers.append("Content-Type", "application/json");

            const body = JSON.stringify({ name, event_type, start, end });

            const requestOptions = {
                method: 'POST',
                headers,
                body,
                redirect: 'follow'
            };

            const response = await fetch(`${BASE}events/`, requestOptions);
                
            const { status } = response;

            if(status === 406){
                dispatch({
                    type: "CREATE_USER_EVENT",
                    payload: {
                        success: false,
                        message: 'Please choose a different date. All the slots for selected date are occupied.',
                        eventData: null
                    }
                });
                return;
            }

            const eventData = await response.json();
            
            dispatch({
                type: "CREATE_USER_EVENT",
                payload: {
                    success: true,
                    message: 'Event created successfully',
                    eventData
                }
            });

        } catch (err) {
            
            dispatch({
                type: "CREATE_USER_EVENT",
                payload: {
                    success: false,
                    message: 'Something is wrong with the network. Please try after some time.',
                    eventData: null
                }
            });
        };
    };
};


// EVENT_TYPES
export const getEventTypes = ({
    token
}) => {

    return async dispatch => {

        try {

            const config = {
                method: 'get',
                url: `${BASE}events/event_types`,
                headers: { 
                  'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios(config);

            const eventTypes = response.data;
            
            dispatch({
                type: "GET_EVENT_TYPES",
                payload: {
                    success: true,
                    message: 'Events fetched successfully',
                    eventTypes
                }
            });

        } catch (err) {
            
            dispatch({
                type: "GET_EVENT_TYPES",
                payload: {
                    success: false,
                    message: 'Something is wrong with the network. Please try after some time.',
                    eventTypes: null
                }
            });
        };
    };
};