import DataSet from '../components/DataSet'
import {connect} from 'react-redux'
import {
    setSeparatedBy, setToggleValue, updatePatientsInTableOnChange, setPageNum, setPerPage, setSortedBy, sort
} from '../redux/actions'
import {MAX_LENGTH_USER_INPUT} from "../constants/Constants";


const mapStateToProps = (state) => {
    return {
        separation_criterion: state.allShortFormattedPatients.separatedBy,
        mutable_patients: state.allShortFormattedPatients.allPatients,
        immutable_patients: state.allShortFormattedPatients.allPatientsImmutable,
        toggle_value: state.allShortFormattedPatients.toggleValue,
        page_num: state.allShortFormattedPatients.pageNum,
        per_page: state.allShortFormattedPatients.perPage,
        fetching_all_patients: state.allShortFormattedPatients.fetching,
    }
};

const mapDispatchToProps = (dispatch,) => {

    return {
        changeSeparationCriterion(event, index, criterion) {
            dispatch(
                setSeparatedBy(criterion)
            )
        },

        onToggle(event, toggleInput) {
            toggleInput = toggleInput ? 1 : 0;
            dispatch(
                setToggleValue(toggleInput)
            )
        },
        setPageNum(pageNum) {
            dispatch(
                setPageNum(pageNum)
            )
        },
        setPerPage(event, key, perPage) {
            dispatch(
                setPageNum(0)
            );
            dispatch(
                setPerPage(perPage)
            );
        },
        sortDataSet(criterion){
             dispatch(
                setSortedBy(criterion)
            );
            dispatch(
                sort(criterion)
            );
        },
        updatePatientsInTable(userInput) {
            userInput = String(userInput).toLowerCase().slice(0, MAX_LENGTH_USER_INPUT)
            if (userInput === "") {
                dispatch(
                    setPageNum(0)
                );
                dispatch(
                    updatePatientsInTableOnChange('', [...this.props.immutable_patients]),
                );
            } else {
                dispatch(
                    setPageNum(0)
                );
                dispatch(
                    updatePatientsInTableOnChange(userInput, [...this.props.immutable_patients]),
                    setPageNum(0)
                );
            }
        },
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(DataSet);

export default Container