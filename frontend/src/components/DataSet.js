import React, {Component} from 'react';
import {MenuItem, SelectField, Toggle} from "material-ui";

import {API_PATH, DEBUG_MODE, PATIENT_API_SHORT_FORMAT} from '../constants/Constants'
import {switch_styles} from '../media/styles/DataSet_style'
import SearchBar from './SearchBar'
import Table from './Table'
import {capitalizeFirstLetter, getResourceName} from './../utils/Utils'
import { connect } from 'react-redux'

const RESOURCE_NAME = getResourceName(window.location.hostname);




class DataSet extends Component {
    constructor() {
        if (DEBUG_MODE)
            window.React = React
        super();
        this.state = {
            separation_criterion: PATIENT_API_SHORT_FORMAT.ID,
            mutable_patients: [],
            immutable_patients: [],
            user_input: "",
            toggle_value: 0,
            page_num: 0,
            per_page: 15,
        }
    }

    updatePatientsInTable(userInput) {
        let patients = this.state.immutable_patients.slice(0);
        if (userInput === "") {
            // Clone already sorted legislators.
            patients = this.state.immutable_patients.slice(0);
        } else {
            patients = patients.filter(patient =>
                String(patient.patient_id).indexOf(String(userInput)) >= 0
            )
        }
        this.setState({mutable_patients: patients, page_num: 0});
    }

    processDataSetAfterFetch(patients) {
        return patients.map(patient => ({
            patient_id: patient.patient_id,
            gender: capitalizeFirstLetter(patient.gender),
            ethnicity: capitalizeFirstLetter(patient.ethnicity),
            platelet_result_count: patient.platelet_result_count,
            vital_status: capitalizeFirstLetter(patient.vital_status)
        }));
    }

    componentWillMount() {
        fetch(`${RESOURCE_NAME}${API_PATH}patients`)
            .then(response => response.json())
            .then(patients => {
                patients = this.processDataSetAfterFetch(patients);
                this.setState({mutable_patients: patients, immutable_patients: patients.slice(0)});
                if (DEBUG_MODE)
                    window.patients = patients;
            })
            .catch(error => {
                console.error('Something went terribly wrong.')
                throw `${error}`
            });
    }

    changeSeparationCriterion(event, index, criterion) {
        this.setState({separation_criterion: criterion})
    }

    onToggle(event, toggleInput) {
        toggleInput = toggleInput ? 1 : 0;
        this.setState({toggle_value: toggleInput})
    }

    setPerPage(perPage){
        this.setState({per_page: perPage});
    }

    setPageNum(pageNum){
        this.setState({page_num: pageNum});
    }

    render() {
        let selectField = !this.state.toggle_value ? <SelectField
                style={{margin: 0, marginLeft: 35, marginTop: '-10px'}}
                value={this.state.separation_criterion}
                onChange={this.changeSeparationCriterion.bind(this)}
                floatingLabelText="Separate Patients By:">
                <MenuItem key={1} value={PATIENT_API_SHORT_FORMAT.ID} primaryText="ID"/>
                <MenuItem key={2} value={PATIENT_API_SHORT_FORMAT.GENDER} primaryText="Gender"/>
                <MenuItem key={3} value={PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT} primaryText="Platelet Result"/>
                <MenuItem key={4} value={PATIENT_API_SHORT_FORMAT.VITAL_STATUS} primaryText="Vital Status"/>
            </SelectField>
            : null;
        return (
            <div className="Projects">
                <SearchBar
                    updatePatientsInTable={this.updatePatientsInTable.bind(this)}
                />
                <Toggle
                    label="Paginated"
                    onToggle={this.onToggle.bind(this)}
                    defaultToggled={this.state.toggle_value == 1 ? true : false}
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
                <Table patients={this.state.mutable_patients}
                       separation_criterion={this.state.separation_criterion}
                       toggle_value={this.state.toggle_value}
                       data_set_length={this.state.mutable_patients.length}
                       page_num = {this.state.page_num}
                       per_page = {this.state.per_page}
                       setPageNum = {this.setPageNum.bind(this)}
                       setPerPage = {this.setPageNum.bind(this)}
                />
            </div>
        );
    }
}

export default DataSet;
