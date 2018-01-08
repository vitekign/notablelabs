import {connect} from 'react-redux'

import DetailedInfo from '../components/DetailedInfo'
import {
    filterDetails, loadDetailedInfoForAPatient, filterAdmin,
    filterImmuno, filterMolecular, setCurrentDetailedPatientNum, filterFishTests, filterAbnormalities, setShowSubtables
} from '../redux/actions'
import {MAX_LENGTH_USER_INPUT} from "../constants/Constants";

const mapStateToProps = (state) => {
    return {
        detailed_info: state.patientDetailedInfo,
        detailed_info_immutable: state.patientDetailedInfoImmutable,
        fetchingDetails: state.fetchingDetails,
        show_sub_tables: state.showSubTables,
    }
};

const mapDispatchToProps = (dispatch,) => {
    return {
        loadDetailedInfoForAPatient() {
            dispatch(
                loadDetailedInfoForAPatient()
            )
        },
        changeShowSubTables(table_name){
            dispatch(
                setShowSubtables(table_name)
            )
        },

        filterPatientDetails(user_input) {
            user_input = String(user_input).toLowerCase().slice(0, MAX_LENGTH_USER_INPUT);

            dispatch(
                filterDetails(user_input)
            );
            dispatch(
                filterAdmin(user_input)
            );
            dispatch(
                filterImmuno(user_input)
            );
            dispatch(
                filterMolecular(user_input)
            );
            dispatch(
                filterFishTests(user_input)
            );
            dispatch(
                filterAbnormalities(user_input)
            );
        },
        setCurrentDetailedPatientNum(new_patient_number) {
            dispatch(
                setCurrentDetailedPatientNum(new_patient_number)
            );
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(DetailedInfo);

export default Container