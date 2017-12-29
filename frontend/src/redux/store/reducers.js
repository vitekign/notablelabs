import C from '../../constants/Constants'
import {combineReducers} from 'redux'

export const allPatients = (state = [], action) => {
    switch (action.type) {
        case C.GET_ALL:
            return [...action.payload]
        default:
            return state
    }
}

export const fetching = (state = false, action) => {
    switch (action.type) {
        case C.FETCH_ALL_PATIENTS:
            return true

        case C.CANCEL_ALL_PATIENTS_FETCHING:
            return false

        case C.GET_ALL:
            return false

        default:
            return state
    }
}

export const separatedBy = (state = 0, action) =>
    (action.type === C.SET_SEPARATOR_CRITERION) ?
        parseInt(action.payload) :
        state


export const sortedBy = (state = 0, action) =>
    (action.type === C.SET_SORTING_ORDER) ?
        parseInt(action.payload) :
        state


export const toggleValue = (state = 0, action) =>
    (action.type === C.SET_SWITCH_PAGINATION) ?
        parseInt(action.payload) :
        state


export const pageNum = (state = 0, action) =>
    (action.type === C.SET_PAGE_NUM) ?
        parseInt(action.payload) :
        state

export const perPage = (state = 10, action) =>
    (action.type === C.SET_PER_PAGE) ?
        parseInt(action.payload) :
        state

export const errors = (state = [], action) => {
    switch (action.type) {
        case C.CLEAR_ERROR:
            return state.filter((error_message, i) => i !== action.payload)
        case C.ADD_ERROR:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}


export default combineReducers({
    allShortFormattedPatients: combineReducers({
        allPatients,
        fetching,
        separatedBy,
        sortedBy,
        toggleValue,
        pageNum,
        perPage,
        errors
    })
})