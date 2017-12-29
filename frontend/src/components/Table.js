import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper'
import {PATIENT_API_SHORT_FORMAT} from './../constants/Constants'

import {Link} from 'react-router-dom'
import {Avatar, deepOrange300, IconButton, purple500, TextField} from "material-ui";
import ArrowBack from 'material-ui-icons/ArrowBack'

import ArrowForward from "material-ui-icons/ArrowForward";

const numerical_sep_props = new Set([PATIENT_API_SHORT_FORMAT.ID, PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT])

export default class DataSetTable extends Component {
    state = {
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

    sortUtilFunc(a, b, key) {
        a = this.getValueForSorting(a, key);
        b = this.getValueForSorting(b, key);
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

// Need to use this utility function because some properties
// must be converted to a Numeric Type. Chose not to parse due
// to computational reasons.
    getValueForSorting(obj, key) {
        if (key == PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT ||
            key == PATIENT_API_SHORT_FORMAT.ID)
            return Number(obj[key]);
        return obj[key];
    }

    onCellClick(e, rowNum, colNum) {
        console.log(`row number: ${rowNum}, column number: ${colNum}`)
    }

    onClickHeaderCells(e, rowNum, colNum) {
        console.log(`row number: ${rowNum}, column number: ${colNum}`)
    }

    injectSeparationHeader(index, i, patients, criterion, label = null) {
        if (numerical_sep_props.has(criterion)) {
            return (
                <TableRow key={index} style={{backgroundColor: "#222d38"}}
                >
                    <TableRowColumn colSpan="5"><h2 style={{
                        margin: '0px',
                        padding: '0px',
                        color: "white"
                    }}> {patients[i][criterion]}{" - "}{Number(label)} </h2></TableRowColumn>

                </TableRow>
            )
        } else {
            return (
                <TableRow key={index} style={{backgroundColor: "#222d38"}}>
                    <TableRowColumn colSpan="5"><h2 style={{
                        margin: '0px',
                        padding: '0px',
                        color: "white"
                    }}> {label} </h2></TableRowColumn>
                </TableRow>
            )
        }
    }


    buildRows() {
        let patients = this.props.patients;
        let table_rows_patients = [];

        if (!this.props.toggle_value) {
            patients.sort((a, b) =>
                this.sortUtilFunc(a, b, this.props.separation_criterion));

            let prev_label = "#(*-..-*)#"
            let filtered_patients = patients.slice(0);
            for (let i = 0, index = 0, cnt = 0; i < patients.length; i++, index++, cnt++) {
                if (numerical_sep_props.has(this.props.separation_criterion)) {
                    if (cnt % 20 == 0) {
                        let label = ""
                        filtered_patients = filtered_patients.filter(patient => Number(patient[this.props.separation_criterion]) >=
                            Number(patients[i][this.props.separation_criterion]))
                        if (filtered_patients.length < 19) {
                            label = String(filtered_patients[filtered_patients.length - 1][this.props.separation_criterion])
                        }
                        else {
                            label = String(filtered_patients[19][this.props.separation_criterion])
                            filtered_patients = filtered_patients.slice(20);
                        }

                        table_rows_patients.push(this.injectSeparationHeader(index, i, patients, this.props.separation_criterion, label))
                        index++;
                    }
                } else {
                    if (patients[i][this.props.separation_criterion] !== prev_label) {
                        prev_label = patients[i][this.props.separation_criterion];
                        const label_length = patients.filter(patient => patient[this.props.separation_criterion] === prev_label).length
                        table_rows_patients.push(this.injectSeparationHeader(index, i, patients, this.props.separation_criterion,
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
        } else {
            patients.sort((a, b) =>
                this.sortUtilFunc(a, b, PATIENT_API_SHORT_FORMAT.ID));
            table_rows_patients = patients
                .filter((patient, i) => i < (this.props.page_num + 1) * this.props.per_page &&
                    i >= this.props.page_num * this.props.per_page)
                .map((patient, i) => {
                    return (
                        <TableRow key={i}>
                            <TableRowColumn>
                                <Link to={"detailed_info/" + patient.patient_id}>
                                    {patient.patient_id}
                                </Link>
                            </TableRowColumn>
                            <TableRowColumn>{patient.gender}</TableRowColumn>
                            <TableRowColumn>{patient.ethnicity}</TableRowColumn>
                            <TableRowColumn>{patient.platelet_result_count}</TableRowColumn>
                            <TableRowColumn>{patient.vital_status}</TableRowColumn>
                        </TableRow>
                    )

                })
            let index = this.props.data_set_length;
            while (table_rows_patients.length < this.props.per_page) {
                table_rows_patients.push(
                    <TableRow key={index++} style={{backgroundColor: "#ffffff", border: '1px solid white'}}>
                        <TableRowColumn colSpan="5">
                        </TableRowColumn>
                    </TableRow>
                )
            }

            table_rows_patients.push(<TableRow key={this.props.per_page + 1}
                                               style={{backgroundColor: "#ffffff",
                                               height: 'auto',}} >
                <TableRowColumn colSpan="5">
                    <h2 style={{
                        margin: '0px',
                        padding: '0px',
                        color: "#989898",
                        textAlign: 'right',
                    }}>

                        <Avatar
                            color='grey'
                            backgroundColor="#E8E8E8"
                            size={25}
                            style={{
                                top: '-7px', position: 'relative',
                                marginRight: '20px'
                            }}

                        >
                            {this.props.page_num + 1}
                        </Avatar>


                        <IconButton
                            onClick={this.onArrowBackClick.bind(this)}>
                            <ArrowBack> </ArrowBack>
                        </IconButton>

                        <IconButton
                            onClick={this.onArrowForwardClick.bind(this)}>
                            <ArrowForward> </ArrowForward>
                        </IconButton>
                    </h2>
                </TableRowColumn>
            </TableRow>)
        }
        return table_rows_patients;
    }

    onArrowBackClick(even) {
        let page_num = this.props.page_num;
        if (page_num > 0)
            page_num -= 1;
        this.props.setPageNum(page_num)
    }

    // 67
    // (0+1) * 67 < 200 =  67 < 200:= True:= Go to the next page [to page 2]
    // (1+1) * 67 < 200 = 134 < 200:= True:= Go to the next page [to page 3]
    // (2+1) * 67 < 200 = 201 < 200:= False:= State at the current page [stay at 3]
    onArrowForwardClick(event) {
        let page_num = this.props.page_num;
        if ((page_num + 1) * this.props.per_page < this.props.data_set_length)
        page_num += 1;
        this.props.setPageNum(page_num)
    }

    render() {
        return (
            <div>
                <Paper style={{marginLeft: '10px', width: '98%'}}
                       zDepth={2}>
                    <Table
                        //onCellClick={this.onClickHeaderCells.bind(this)}
                        height={this.state.height}
                        fixedHeader={this.state.fixedHeader}
                        fixedFooter={this.state.fixedFooter}
                        selectable={this.state.selectable}
                        multiSelectable={this.state.multiSelectable}>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                            enableSelectAll={this.state.enableSelectAll}>

                            <TableRow onCellClick={this.onCellClick.bind(this)}>
                                <TableHeaderColumn tooltip="Patient's ID">ID</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Patient's Gender">Gender
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Patient's Ethnicity">Ethnicity
                                </TableHeaderColumn>
                                <TableHeaderColumn tooltip="Patient's Platelet Result Count">
                                    Platelet Result
                                    Count</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Patient's Vital Status">Vital Status
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            stripedRows={this.state.stripedRows}>
                            {this.buildRows.call(this)}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}
