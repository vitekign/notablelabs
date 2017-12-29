import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import sampleData from './redux/InitialState.json'
import storeFactory from './redux/store/index'
import {loadAllShortFormattedPatients} from './redux/actions'

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState())

const store = storeFactory(initialState)
store.subscribe(saveState)

store.dispatch(
    loadAllShortFormattedPatients()
)

window.React = React
window.store = store

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));
