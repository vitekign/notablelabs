import C from '../../constants/Constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'



const consoleMessages = (store) => (next) => (action) => {
    let result

    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log('number of patients', store.getState().allShortFormattedPatients.allPatients.length)

    result = next(action)

    let {allShortFormattedPatients: {allPatients, fetching, sortedBy, toggleValue}} = store.getState()


    console.log(`
        all patients: ${allPatients.length}
        fetching: ${fetching}
        sorted by: ${sortedBy}
        toggle value: ${toggleValue}
    `)

    console.groupEnd()

    return result
}

export default (initialState={}) => {
    return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}