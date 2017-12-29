import DataSet from '../components/DataSet'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        separation_criterion: state.allShortFormattedPatients.separatedBy,
        mutable_patients: state.allShortFormattedPatients.allPatients,
        immutable_patients: state.allShortFormattedPatients.allPatients,
        toggle_value: state.allShortFormattedPatients.toggleValue,
        page_num: state.allShortFormattedPatients.pageNum,
        per_page: state.allShortFormattedPatients.perPage,
    }
}

const Container = connect(mapStateToProps)(DataSet)

export default Container