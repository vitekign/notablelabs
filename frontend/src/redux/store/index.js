import appReducer, {userInput} from './reducers'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

const consoleMessages = (store) => (next) => (action) => {
    let result;

    console.groupCollapsed(`dispatching action => ${action.type}`);

    result = next(action);

    let {allShortFormattedPatients: {allPatients, fetching, sortedBy, toggleValue,
                                     separatedBy, perPage, allPatientsImmutable,
                                     pageNum, errors, userInput}} = store.getState();

    console.log(`
        all patients: ${allPatients.length}
        all patients immutable: ${allPatientsImmutable.length}
        fetching: ${fetching}
        page num: ${pageNum}
        rows per page: ${perPage}
        sorted by: "${sortedBy}"
        toggle value: ${toggleValue}
        separated by: "${separatedBy}"
        user input: "${userInput}
        errors: ${errors}
    `);

    console.groupEnd();

    return result
};

export default (initialState={}) => {
    return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}