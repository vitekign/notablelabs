import {combineReducers} from 'redux';
import * as _ from "lodash";

import C from '../../constants/Constants';
import {capitalizeFirstLetter, sortUtilFunc} from '../../utils/Utils';
import {filter_pair_wise_tables, getRidOfRedundantPairedRows} from "../../utils/Utils_Reducers";


const Patient = (patient) => {
    return ({
        patient_id: patient.patient_id,
        gender: capitalizeFirstLetter(patient.gender),
        ethnicity: capitalizeFirstLetter(patient.ethnicity),
        platelet_result_count: patient.platelet_result_count,
        vital_status: capitalizeFirstLetter(patient.vital_status)
    });
};

export const allPatients = (state = [], action) => {
    switch (action.type) {
        case C.GET_ALL_PATIENTS:
            return action.payload.map(Patient);

        case C.FILTER_PATIENTS:
            if (action.payload.userInput === "" || action.payload.userInput === undefined)
                return [...action.payload.allPatientsImmutable];
            else {
                return action.payload.allPatientsImmutable.filter(patient =>
                    String(patient.patient_id).indexOf(String(action.payload.userInput)) >= 0);
            }

        case C.SORT_PATIENTS:
            if (action.payload.asc_desc[action.payload.criterion]) {
                return [...state.sort((a, b) =>
                    sortUtilFunc(a, b, action.payload.criterion))];
            }
            else {
                return [...state.sort((a, b) =>
                    sortUtilFunc(b, a, action.payload.criterion))];
            }
        default:
            return state;
    }
};

export const userInput = (state = "", action) => {
    switch (action.type){
        case C.SET_USER_INPUT_ALL_PATIENTS:
            return action.payload
        default:
            return state
    }
}

export const allPatientsImmutable = (state = [], action) => {
    switch (action.type) {
        case C.GET_ALL_PATIENTS:
            return action.payload.map(Patient);
        default:
            return state;
    }
};

export const fetching = (state = false, action) => {
    switch (action.type) {
        case C.FETCH_ALL_PATIENTS:
            return true;

        case C.CANCEL_ALL_PATIENTS_FETCHING:
            return false;

        case C.GET_ALL_PATIENTS:
            return false;

        default:
            return state;
    }
};

export const fetchingDetails = (state = false, action) => {
    switch (action.type) {
        case C.FETCHING_DETAILS:
            return true;

        case C.CANCEL_FETCHING_DETAILS:
            return false;

        default:
            return state;
    }
};

export const separatedBy = (state = 0, action) =>
    (action.type === C.SET_SEPARATOR_CRITERION) ?
        action.payload :
        state;


export const sortedBy = (state = "patient_id", action) =>
    (action.type === C.SET_SORTING_ORDER) ?
        action.payload :
        state;


export const toggleValue = (state = 0, action) =>
    (action.type === C.SET_SWITCH_PAGINATION) ?
        parseInt(action.payload) :
        state;


export const perPage = (state = 5, action) =>
    (action.type === C.SET_PER_PAGE) ?
        parseInt(action.payload) :
        state;

export const errors = (state = [], action) => {
    switch (action.type) {
        case C.CLEAR_ERROR:
            return state.filter((error_message, i) => i !== action.payload);
        case C.ADD_ERROR:
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};

export const sortAscDesc = (state = [], action) => {
    switch (action.type) {
        case C.CHANGE_ASC_DESC:
            let newState = {...state};
            newState[action.payload] = newState[action.payload] === 0 ? 1 : 0;
            return newState;
        default:
            return state;
    }
};

export const pageNum = (state = 0, action) =>
    (action.type === C.SET_PAGE_NUM) ?
        parseInt(action.payload) :
        state;


export const currentDetailedPatientNum = (state = 2808, action) =>
    (action.type === C.SET_CURRENT_DETAILED_PATIENT_NUM) ?
        parseInt(action.payload) :
        state;


export const patientDetails = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_PATIENT_DETAILS:
            return _.cloneDeep(action.payload);

        case C.SORT_PATIENT_DETAILS:
            const new_details = _.cloneDeep(action.payload.details);
            const user_input = String(action.payload.user_input);
            if (action.payload.user_input === "")
                return new_details;

            for (let key of Object.keys(new_details[0])) {
                if (!String(key).includes(user_input) &&
                    !String(new_details[0][key]).includes(user_input))
                    delete new_details[0][key];
            }
            return new_details;

        default:
            return state;
    }
};

export const admin = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_ADMIN:
            return _.cloneDeep(action.payload);
        case C.FILTER_ADMIN:
            const new_admin = _.cloneDeep(action.payload.admin);
            const user_input = String(action.payload.user_input);
            if (action.payload.user_input === "")
                return new_admin;

            for (let key of Object.keys(new_admin[0])) {
                if (!String(key).includes(user_input) &&
                    !String(new_admin[0][key]).includes(user_input))
                    delete new_admin[0][key];
            }
            return new_admin;
        default:
            return state;
    }
};

export const cytogeneticAbnormalities = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_CYTOGENETIC_ABNORMALITIES:
            return _.cloneDeep(action.payload);

        case C.FILTER_CYTOGENETIC_ABNORMALITIES:
            const new_abnorms = _.cloneDeep(action.payload.abnorms);
            const user_input = String(action.payload.user_input);

            if (action.payload.user_input === "")
                return new_abnorms;

            for (let i = new_abnorms.length - 1; i >= 0; i--) {
                if (!"abnormality".includes(user_input) &&
                    !String(new_abnorms[i]["abnormality"]).toLowerCase().includes(user_input))
                    new_abnorms.splice(i, 1);
            }
            return new_abnorms;

        default:
            return state;
    }
};

export const fishTestComponentResults = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_FISH_TEST_COMPONENT_RESULTS:
            const new_fish_state = _.cloneDeep(action.payload);
            getRidOfRedundantPairedRows(new_fish_state);
            return new_fish_state;

        case C.FILTER_FISH_TEST_COMPONENT_RESULTS:
            const new_fish_tests = _.cloneDeep(action.payload.fish_tests);
            if (action.payload.user_input === "")
                return new_fish_tests;

            filter_pair_wise_tables(new_fish_tests, action.payload.user_input);

            return new_fish_tests;

        default:
            return state;
    }
};

export const immunophenotypeCytochemistryTestingResults = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS:
            const new_immuno_state = _.cloneDeep(action.payload);
            getRidOfRedundantPairedRows(new_immuno_state);
            return new_immuno_state;

        case C.FILTER_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS:
            const new_immuno = _.cloneDeep(action.payload.immuno);
            if (action.payload.user_input === "")
                return new_immuno;

            filter_pair_wise_tables(new_immuno, action.payload.user_input);

            return new_immuno;

        default:
            return state;
    }
};

export const molecularAnalysisAbnormalityTestingResults = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS:
            const new_molecular_state = _.cloneDeep(action.payload);
            getRidOfRedundantPairedRows(new_molecular_state);
            return new_molecular_state;

        case C.FILTER_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS:
            const new_molecular = _.cloneDeep(action.payload.molecular);
            if (action.payload.user_input === "")
                return new_molecular;

            filter_pair_wise_tables(new_molecular, action.payload.user_input);

            return new_molecular;

        default:
            return state;
    }
};

export const patientDetailsImmutable = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_PATIENT_DETAILS:
            return _.cloneDeep(action.payload);
        default:
            return state;
    }
};

export const adminImmutable = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_ADMIN:
            return _.cloneDeep(action.payload);
        default:
            return state;
    }
};

export const cytogeneticAbnormalitiesImmutable = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_CYTOGENETIC_ABNORMALITIES:
            return _.cloneDeep(action.payload);
        default:
            return state;
    }
};

export const fishTestComponentResultsImmutable = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_FISH_TEST_COMPONENT_RESULTS:
            let new_fish_tests = _.cloneDeep(action.payload);
            getRidOfRedundantPairedRows(new_fish_tests);
            return new_fish_tests;
        default:
            return state;
    }
};

export const immunophenotypeCytochemistryTestingResultsImmutable = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_IMMUNOPHENOTYPE_CYTOCHEMISTRY_TESTING_RESULTS:
            return _.cloneDeep(action.payload);
        default:
            return state;
    }
};

export const molecularAnalysisAbnormalityTestingResultsImmutable = (state = [], action) => {
    switch (action.type) {
        case C.LOAD_MOLECULAR_ANALYSIS_ABNORMALITY_TESTING_RESULTS:
            return _.cloneDeep(action.payload);
        default:
            return state;
    }
};


export default combineReducers({
    allShortFormattedPatients: combineReducers({
        allPatients,
        allPatientsImmutable,
        userInput,
        fetching,
        separatedBy,
        sortedBy,
        toggleValue,
        pageNum,
        perPage,
        errors,
        sortAscDesc,
        currentDetailedPatientNum,
    }),
    fetchingDetails,
    patientDetailedInfo: combineReducers({
        patientDetails,
        admin,
        cytogeneticAbnormalities,
        fishTestComponentResults,
        immunophenotypeCytochemistryTestingResults,
        molecularAnalysisAbnormalityTestingResults,
    }),
    patientDetailedInfoImmutable: combineReducers({
        patientDetailsImmutable,
        adminImmutable,
        cytogeneticAbnormalitiesImmutable,
        fishTestComponentResultsImmutable,
        immunophenotypeCytochemistryTestingResultsImmutable,
        molecularAnalysisAbnormalityTestingResultsImmutable,
    })
})