import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './App';
import {DEBUG_MODE} from './constants/Constants'
import {
    loadAllShortFormattedPatients, updatePatientsInTableOnChange
} from './redux/actions'
import sampleData from './redux/InitialState.json'
import storeFactory from './redux/store/index'


const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData;

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState());

const store = storeFactory(initialState);
store.subscribe(saveState);

store.dispatch(
    loadAllShortFormattedPatients(),
);


if (DEBUG_MODE) {
    window.React = React;
    window.store = store;
}

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));
