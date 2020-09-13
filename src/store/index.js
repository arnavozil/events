import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import masterRedcer from '../reducers/index';

const store = createStore(masterRedcer, applyMiddleware(reduxThunk));

export default store;