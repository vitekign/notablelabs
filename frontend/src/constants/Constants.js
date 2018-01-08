export const API_PATH = 'api/v1/';
export const MAX_LENGTH_USER_INPUT = 40;
export const BREAK_ROWS_BY = 20;
export const DEBUG_MODE = true;
export const PATIENT_API_SHORT_FORMAT = {
    GENDER: 'gender',
    ID: 'patient_id',
    PLATELET_RESULT_COUNT: 'platelet_result_count',
    ETHNICITY: 'ethnicity',
    VITAL_STATUS: 'vital_status',
};

export const ASCDESC = {
    ASC: 0,
    DESC: 1,
}

export const RELOADING_COLOR = '#00dda6'

const constants ={
    FETCH_ALL_PATIENTS: 'FETCH_ALL_PATIENTS',
    CANCEL_ALL_PATIENTS_FETCHING: "CANCEL_ALL_PATIENTS_FETCHING",
    SET_SORTING_ORDER: 'SET_SORTING_ORDER',
    SORT_PATIENTS: 'SET_SORT',
    ADD_ERROR: "ADD_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    SET_SEPARATOR_CRITERION: "SET_SEPARATOR_CRITERION",
    SET_SWITCH_PAGINATION: "SET_SWITCH_PAGINATION",
    SET_SEARCH_VALUE: "FIRE_SEARCH",
    SET_PAGE_NUM: "SET_PAGE_NUM",
    SET_PER_PAGE: "SET_PER_PAGE",
    GET_ALL_PATIENTS: "GET_ALL_PATIENTS",
    FILTER_PATIENTS: "FILTER_PATIENTS",
    CHANGE_ASC_DESC: "CHANGE_ASC_DESC",
    GET_ADMIN: "GET_ADMIN",
    SET_CURRENT_DETAILED_PATIENT_NUM: "SET_CURRENT_DETAILED_PATIENT_NUM",
    LOAD_ADMIN: "LOAD_ADMIN",
    LOAD_CYTOGENETIC_ABNORMALITIES: "LOAD_CYTOGENETIC_ABNORMALITIES",
    LOAD_FISH_TEST_COMPONENT_RESULTS: "LOAD_FISH_TEST_COMPONENT_RESULTS",
    LOAD_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS: "IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS",
    LOAD_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS: "MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS",
    LOAD_PATIENT_DETAILS: "PATIENT_DETAILS",
    SORT_PATIENT_DETAILS: "SORT_PATIENT_DETAILS",
    FILTER_ADMIN: "FILTER_ADMIN",
    FILTER_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS: "FILTER_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS",
    FILTER_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS: "FILTER_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS",
    FILTER_FISH_TEST_COMPONENT_RESULTS: "FILTER_FISH_TEST_COMPONENT_RESULTS",
    FILTER_CYTOGENETIC_ABNORMALITIES: "FILTER_CYTOGENETIC_ABNORMALITIES",
    FETCHING_DETAILS: "FETCHING_DETAILS",
    CANCEL_FETCHING_DETAILS: "CANCEL_FETCHING_DETAILS",
    SET_USER_INPUT_ALL_PATIENTS: "SET_USER_INPUT_ALL_PATIENTS",
    SET_SUBTABLE_SHOW : "SET_SUBTABLE_SHOW",


}


export default constants;