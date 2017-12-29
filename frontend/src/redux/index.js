// Redux
import C from '../constants/Constants'
import appReducer from './store/reducers'
import initialState from './InitialState.json'
import { createStore } from 'redux'
import storeFactory from './store/index'
import {loadAllShortFormattedPatients} from './actions'



const store = storeFactory(initialState)
store.dispatch(
    loadAllShortFormattedPatients()
)






// const store = createStore(appReducer, initialState)
//
// store.subscribe(() => console.log(store.getState()))
//
// store.dispatch({
//     type: C.SET_PER_PAGE,
//     payload: 5
// })
//
// store.dispatch({
//     type: C.SET_SEPARATOR_CRITERION,
//     payload: 2
// })



// let state = initialState
// console.log(`
//     Initial State
//     =============
//     fetching: ${initialState.allShortFormattedPatients.fetching}
//     separatedBy: ${initialState.allShortFormattedPatients.separatedBy}
//     patients: ${JSON.stringify(initialState.allShortFormattedPatients.allPatients.length)}
// `)
//
// state = appReducer(state, {
//     type: C.GET_ALL,
//     payload: null
// })
//
// console.log(`
//     Next State
//     =============
//     fetching: ${initialState.allShortFormattedPatients.fetching}
//     separatedBy: ${initialState.allShortFormattedPatients.separatedBy}
//     patients: ${JSON.stringify(initialState.allShortFormattedPatients.allPatients.length)}
// `)





// const state = 15
// const action = {
//     type: C.SET_PER_PAGE,
//     payload: 20
// }
//
// const nextState = perPage(state, action)
// console.log(`
//     initial perPage: ${state}
//     action: ${JSON.stringify(action)}
//     new perPage = ${nextState}
// `)


// console.log(`
//     Patients Info
//     =============
//     Initially there are ${patientsShort.allPatients.length} short-formatted patient/s in the set.
//     The initial value for the perPage attribute is: ${patientsShort.perPage}
//
//     Constants (actions)
//     ${Object.keys(C).join('\n      ')}
//
// `)


// const state = [
//     "server feed not found",
//     "user not authorized"
// ]
// const action = {
//     type: C.CLEAR_ERROR,
//     payload: 0
// }
//
// const nextState = errors(state, action)
//
// console.log(`
//     initial state: ${state}
//     action: ${JSON.stringify(action)}
//     new state: ${JSON.stringify(nextState)}
// `)


// const state = [
//     {
//         "patient_id": "Na",
//         "gender": "Na",
//         "ethnicity": "Na",
//         "platelet_result_count": "Na",
//         "vital_status": "Na"
//     }
// ]
// const action = {
//     type: C.GET_ALL,
//     payload: {}
// }
//
// const nextState = allShortFormattedPatients(state, action)
//
// console.log(`
//     initial state: ${state}
//     action: ${JSON.stringify(action)}
//     new state: ${JSON.stringify(nextState)}
// `)