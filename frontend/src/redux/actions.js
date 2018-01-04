import fetch from 'isomorphic-fetch'

import C from '../constants/Constants'
import {API_PATH} from '../constants/Constants'
import {cleanDataSet, getResourceName, reshapeDataSet} from "../utils/Utils";

const RESOURCE_NAME = getResourceName(window.location.hostname);


export const loadAllShortFormattedPatients = () => (dispatch) => {
    dispatch({
        type: C.FETCH_ALL_PATIENTS
    });
    fetch(`${RESOURCE_NAME}${API_PATH}patients`)
        .then(response => response.json())
        .then(patients => {
            dispatch({
                type: C.GET_ALL_PATIENTS,
                payload: patients
            });
        })
        .catch(error => {
            dispatch(
                addError(error.message)
            );

            //TODO: Cancel fetching, display mistakes and say sorry...
            throw `${error}`
        });
};

export const updatePatientsInTableOnChange = (userInput, immutableShortFormattedPatients) => ({
    type: C.FILTER_PATIENTS,
    payload: {
        "userInput": userInput,
        "allPatientsImmutable": immutableShortFormattedPatients
    }
});

export const setAscDesc = (criterion) => ({
    type: C.CHANGE_ASC_DESC,
    payload: criterion
});

export const sort = criterion => (dispatch, getState) => {
    dispatch(
        setAscDesc(criterion)
    );

    dispatch({
        type: C.SORT_PATIENTS,
        payload: {
            criterion: criterion,
            asc_desc: getState().allShortFormattedPatients
                .sortAscDesc
        }
    })
};

export const filterDetails = user_input => (dispatch, getState) => {
    dispatch({
        type: C.SORT_PATIENT_DETAILS,
        payload: {
            user_input: user_input,
            details: getState().patientDetailedInfoImmutable
                .patientDetailsImmutable
        }
    })
};

export const filterAdmin = user_input => (dispatch, getState) => {
    dispatch({
        type: C.FILTER_ADMIN,
        payload: {
            user_input: user_input,
            admin: getState().patientDetailedInfoImmutable
                .adminImmutable
        }
    })
};

export const filterAbnormalities = user_input => (dispatch, getState) => {
    dispatch({
        type: C.FILTER_CYTOGENETIC_ABNORMALITIES,
        payload: {
            user_input: user_input,
            abnorms: getState().patientDetailedInfoImmutable
                .cytogeneticAbnormalitiesImmutable
        }
    })
};

export const filterImmuno = user_input => (dispatch, getState) => {
    dispatch({
        type: C.FILTER_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS,
        payload: {
            user_input: user_input,
            immuno: getState().patientDetailedInfoImmutable
                .immunophenotypeCytochemistryTestingResultsImmutable

        }
    })
};

export const filterMolecular = user_input => (dispatch, getState) => {
    dispatch({
        type: C.FILTER_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS,
        payload: {
            user_input: user_input,
            molecular: getState().patientDetailedInfoImmutable
                .molecularAnalysisAbnormalityTestingResultsImmutable
        }
    })
};

export const filterFishTests = user_input => (dispatch, getState) => {
    dispatch({
        type: C.FILTER_FISH_TEST_COMPONENT_RESULTS,
        payload: {
            user_input: user_input,
            fish_tests: getState().patientDetailedInfoImmutable.fishTestComponentResultsImmutable
        }
    })
};

export const setCurrentDetailedPatientNum = user_input => (dispatch) => {
    dispatch({
        type: C.SET_CURRENT_DETAILED_PATIENT_NUM,
        payload: user_input
    })
};

export const setSortedBy = (criteria) => ({
    type: C.SET_SORTING_ORDER,
    payload: criteria
});


export const setSeparatedBy = (criteria) => ({
    type: C.SET_SEPARATOR_CRITERION,
    payload: criteria
});


export const setToggleValue = (criteria) => ({
    type: C.SET_SWITCH_PAGINATION,
    payload: criteria
});

export const setPageNum = (pageNum) => ({
    type: C.SET_PAGE_NUM,
    payload: pageNum
});

export const setPerPage = (perPage) => ({
    type: C.SET_PER_PAGE,
    payload: perPage
});

export const addError = (message) => ({
    type: C.ADD_ERROR,
    payload: message
});

export const clearError = index => ({
    type: C.CLEAR_ERROR,
    payload: index
});

export const loadDetailedInfoForAPatient = () => (dispatch, getState) => {
    dispatch({
        type: C.FETCHING_DETAILS
    });
    fetch(`${RESOURCE_NAME}${API_PATH}patients/${getState()
        .allShortFormattedPatients.currentDetailedPatientNum}`)
        .then(response => response.json())
        .then(details => {
            reshapeDataSet(details);
            cleanDataSet(details);
            dispatch({
                type: C.LOAD_PATIENT_DETAILS,
                payload: details["patient_details"]
            });
            dispatch({
                type: C.LOAD_ADMIN,
                payload: details["admin"]
            });
            dispatch({
                type: C.LOAD_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS,
                payload: details["immunophenotype_cytochemistry_testing_results"]
            });
            dispatch({
                type: C.LOAD_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS,
                payload: details["molecular_analysis_abnormality_testing_results"]
            });
            dispatch({
                type: C.LOAD_CYTOGENETIC_ABNORMALITIES,
                payload: details["cytogenetic_abnormalities"]
            });
            dispatch({
                type: C.LOAD_FISH_TEST_COMPONENT_RESULTS,
                payload: details["fish_test_component_results"]
            });
            dispatch({
                type: C.CANCEL_FETCHING_DETAILS
            });
        })
        .catch(error => {
            dispatch(
                addError(error.message)
            );

            //TODO: Cancel fetching, display mistakes and say sorry...
            throw `${error}`

        });
};