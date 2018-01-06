import React, {Component} from 'react';
import {CardText, CircularProgress, MenuItem, SelectField, Toggle} from "material-ui";

import {PATIENT_API_SHORT_FORMAT, RELOADING_COLOR} from '../constants/Constants'
import {switch_styles} from '../media/styles/DataSet_style'
import SearchBar from './SearchBar'
import DataSetTable from './DataSetTable'

class DataSet extends Component {


    constructor(props){
        super(props)
    }


    render() {
        if (this.props.fetching_all_patients)
            return (
                <CardText style={{position: 'relative'}}>
                    <CircularProgress
                        color={RELOADING_COLOR}
                        thickness={3}
                        size={60}
                        left={-30}
                        status={"loading"}
                        style={{marginLeft: '47%', marginTop: '5%'}}
                    />
                </CardText>
            );

        let selectField = !this.props.toggle_value ?
            <SelectField
                style={{margin: 0, marginLeft: 35, marginTop: '-10px'}}
                value={this.props.separation_criterion}
                onChange={this.props.setSeparatedBy}
                floatingLabelText="Separate Patients By:">
                <MenuItem key={1} value={PATIENT_API_SHORT_FORMAT.ID} primaryText="ID"/>
                <MenuItem key={2} value={PATIENT_API_SHORT_FORMAT.GENDER} primaryText="Gender"/>
                <MenuItem key={3} value={PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT}
                                  primaryText="Platelet Result"/>
                <MenuItem key={4} value={PATIENT_API_SHORT_FORMAT.VITAL_STATUS}
                                  primaryText="Vital Status"/>
            </SelectField>
            : null;

        return (
            <div className="Projects">
                <SearchBar
                    floatingLabelText={"Search"}
                    hintText={"Search patients by id."}
                    margin={"10px"}
                    width={"98%"}
                    update={this.props.updatePatientsInTable.bind(this)}
                    user_input = {this.props.user_input}
                />
                <Toggle
                    label="Paginated"
                    onToggle={this.props.onToggle}
                    defaultToggled={this.props.toggle_value === 1 ? true : false}
                    thumbStyle={switch_styles.thumbOff}
                    trackStyle={switch_styles.trackOff}
                    thumbSwitchedStyle={switch_styles.thumbSwitched}
                    trackSwitchedStyle={switch_styles.trackSwitched}
                    labelStyle={switch_styles.labelStyle}
                    style={{
                        width: '120px', margin: '10px', marginBottom: '20px',
                        float: 'left'
                    }}
                />
                {selectField}
                <div style={{clear: 'both', marginBottom: '15px'}}></div>

                <DataSetTable patients={this.props.mutable_patients}
                       mutable_patients={this.props.mutable_patients}
                       separation_criterion={this.props.separation_criterion}
                       toggle_value={this.props.toggle_value}
                       data_set_length={this.props.immutable_patients.length}
                       page_num={this.props.page_num}
                       per_page={this.props.per_page}
                       setPageNum={this.props.setPageNum}
                       setPerPage={this.props.setPerPage}
                       sortDataSet={this.props.sortDataSet}
                       setSeparatedBy={this.props.setSeparatedBy}
                       setSortedBy={this.props.setSortedBy}
                       setAscDesc={this.props.setAscDesc}
                />
            </div>
        );
    }
}

export default DataSet;
