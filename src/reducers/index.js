const defaultState = {
    loginState: {},
    registerState: {},
    getEventState: {},
    createEventState: {},
    getEventTypeState: {}
};

const masterReducer = (state = defaultState, {type, payload}) => {

    switch (type) {
        case "LOGIN":
            return { ...state, loginState: payload };
        case "REGISTER":
            return { ...state, registerState: payload };
        case "GET_USER_EVENTS":
            return { ...state, getEventState: payload };
        case "CREATE_USER_EVENT":
            return { ...state, createEventState: payload };
        case "GET_EVENT_TYPES":
            return { ...state, getEventTypeState: payload };
        default:
            return state;
    };
    
};


export default masterReducer;