import C from '../constants/Constants'
import fetch from 'isomorphic-fetch'
import {API_PATH, DEBUG_MODE} from '../constants/Constants'

const RESOURCE_NAME = "http://127.0.0.1:8000/"


export const loadAllShortFormattedPatients = () => (dispatch, getState) => {
    dispatch({
        type: C.FETCH_ALL_PATIENTS
    })
    fetch(`${RESOURCE_NAME}${API_PATH}patients`)
        .then(response => response.json())
        .then(patients => {
            dispatch({
                type: C.GET_ALL,
                payload: patients
            })
        })
        .catch(error => {
            console.error('Something went terribly wrong.')
            throw `${error}`

            dispatch({
                type: C.CANCEL_ALL_PATIENTS_FETCHING
            })
        });
}


//      errors

export const setSeparatedBy = (criteria) =>
    ({
        type: C.SET_SEPARATOR_CRITERION,
        payload: criteria
    })

export const setSortedBy = (criteria) =>
    ({
        type: C.SET_SORTING_ORDER,
        payload: criteria
    })

export const setToggleValue = (criteria) =>
    ({
        type: C.SET_SWITCH_PAGINATION,
        payload: criteria
    })

export const setPageNum = (pageNum) =>
    ({
        type: C.SET_PAGE_NUM,
        payload: pageNum
    })
export const setPerPage = (perPage) =>
    ({
        type: C.SET_PER_PAGE,
        payload: perPage
    })

export const addError = (message) =>
   ({
      type: C.ADD_ERROR,
      payload: message
   })

export const clearError = index =>
    ({
        type: C.CLEAR_ERROR,
        payload: index
    })
