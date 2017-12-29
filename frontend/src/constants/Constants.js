const API_PATH = 'api/v1/';
const MAX_LENGTH_USER_INPUT = 20;
const DEBUG_MODE = true;
const MAIN_TABLE_FIELDS = new Set(['patient_id', 'gender', 'ethnicity', 'platelet_result_count', 'vital_status']);
const PATIENT_API_SHORT_FORMAT = {
    GENDER: 'gender',
    ID: 'patient_id',
    PLATELET_RESULT_COUNT: 'platelet_result_count',
    ETHNICITY: 'ethnicity',
    VITAL_STATUS: 'vital_status',
};

const constants ={
    FETCH_ALL_PATIENTS: 'FETCH_ALL_PATIENTS',
    CANCEL_ALL_PATIENTS_FETCHING: "CANCEL_ALL_PATIENTS_FETCHING",
    SET_SORTING_ORDER: 'SET_SORTING_ORDER',
    ADD_ERROR: "ADD_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    SET_SEPARATOR_CRITERION: "SET_SEPARATOR_CRITERION",
    SET_SWITCH_PAGINATION: "SET_SWITCH_PAGINATION",
    SET_SEARCH_VALUE: "FIRE_SEARCH",
    SET_PAGE_NUM: "SET_PAGE_NUM",
    SET_PER_PAGE: "SET_PER_PAGE",
    GET_ALL: "GET_ALL",
    FILTER: "FILTER"



}
export default constants;
export {MAX_LENGTH_USER_INPUT, API_PATH, DEBUG_MODE, PATIENT_API_SHORT_FORMAT}