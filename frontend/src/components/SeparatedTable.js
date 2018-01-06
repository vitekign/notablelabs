import React, {Component} from 'react';

import {Link} from 'react-router-dom'
import {
    TableRow, TableRowColumn, TableHeaderColumn,
    TableHeader, TableBody, Table
} from "material-ui";

import uuidv1 from 'uuid/v1'
import {BREAK_ROWS_BY, PATIENT_API_SHORT_FORMAT} from './../constants/Constants'

class SeparatedTable extends Component {
    constructor(props) {
        super(props)
        this.components_params = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: true,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
        };

        this.numerical_sep_props = new Set([PATIENT_API_SHORT_FORMAT.ID,
            PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT])
    }


    injectSeparationHeader(index, i, patients, criterion, label = null) {
        let injection = label
        if (this.numerical_sep_props.has(criterion))
            injection = patients[i][criterion] + " - " + Number(label)
        return (
            <TableRow key={index} style={{backgroundColor: "#222d38"}}>
                <TableRowColumn colSpan="5"><h2 style={{
                    margin: '0px',
                    padding: '0px',
                    color: "white"
                }}> {injection} </h2></TableRowColumn>
            </TableRow> )
    }

    buildRows() {
        const patients = this.props.patients;
        let table_rows_patients = [];

        let prev_label = "#(*-..-*)#";
        let filtered_patients = patients.slice(0);
        for (let i = 0, index = 0, cnt = 0; i < patients.length; i++, index++, cnt++) {
            if (this.numerical_sep_props.has(this.props.separation_criterion)) {
                if (cnt % BREAK_ROWS_BY === 0) {
                    let label = "";
                    filtered_patients = filtered_patients.filter(patient =>
                        Number(patient[this.props.separation_criterion]) >=
                        Number(patients[i][this.props.separation_criterion]))
                    if (filtered_patients.length < BREAK_ROWS_BY - 1) {
                        label = String(filtered_patients[filtered_patients.length - 1]
                            [this.props.separation_criterion])
                    }
                    else {
                        label = String(filtered_patients[BREAK_ROWS_BY - 1][this.props.separation_criterion])
                        filtered_patients = filtered_patients.slice(BREAK_ROWS_BY);
                    }

                    table_rows_patients.push(this.injectSeparationHeader(index, i,
                        patients, this.props.separation_criterion, label))
                    index++;
                }
            } else {
                if (patients[i][this.props.separation_criterion] !== prev_label) {
                    prev_label = patients[i][this.props.separation_criterion];
                    const label_length = patients.filter(patient =>
                        patient[this.props.separation_criterion] === prev_label).length
                    table_rows_patients.push(this.injectSeparationHeader(index,
                        i, patients, this.props.separation_criterion,
                        prev_label + ": " + String(label_length)));
                    index++;
                }
            }
            table_rows_patients.push(
                <TableRow key={index}>
                    <TableRowColumn>
                        <Link to={"detailed_info/" + patients[i].patient_id}>
                            {patients[i].patient_id}
                        </Link>
                    </TableRowColumn>
                    <TableRowColumn>{patients[i].gender}</TableRowColumn>
                    <TableRowColumn>{patients[i].ethnicity}</TableRowColumn>
                    <TableRowColumn>{patients[i].platelet_result_count}</TableRowColumn>
                    <TableRowColumn>{patients[i].vital_status}</TableRowColumn>
                </TableRow>
            )
        }
        return table_rows_patients;
    }

    render() {

        return (
            <Table
                height={this.components_params.height}
                fixedHeader={this.components_params.fixedHeader}
                fixedFooter={this.components_params.fixedFooter}
                selectable={this.components_params.selectable}
                multiSelectable={this.components_params.multiSelectable}>
                <TableHeader
                    displaySelectAll={this.components_params.showCheckboxes}
                    adjustForCheckbox={this.components_params.showCheckboxes}
                    enableSelectAll={this.components_params.enableSelectAll}>

                    <TableRow>
                        <TableHeaderColumn tooltip="Patient's ID"
                                           id={PATIENT_API_SHORT_FORMAT.ID}>ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Patient's Gender"
                                           id={PATIENT_API_SHORT_FORMAT.GENDER}>Gender
                        </TableHeaderColumn>
                        <TableHeaderColumn tooltip="Patient's Ethnicity"
                                           id={PATIENT_API_SHORT_FORMAT.ETHNICITY}>Ethnicity
                        </TableHeaderColumn>
                        <TableHeaderColumn tooltip="Patient's Platelet Result Count"
                                           id={PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT}>
                            Platelet Result
                            Count</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Patient's Vital Status"
                                           id={PATIENT_API_SHORT_FORMAT.VITAL_STATUS}>Vital
                            Status
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={this.components_params.showCheckboxes}
                    deselectOnClickaway={this.components_params.deselectOnClickaway}
                    stripedRows={this.components_params.stripedRows}>
                    {this.buildRows.call(this)}
                </TableBody>
            </Table>
        )
    }
}

export default SeparatedTable;