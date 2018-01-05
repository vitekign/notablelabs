import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper'
import {Avatar, IconButton, MenuItem, SelectField} from "material-ui";
import ArrowBack from 'material-ui-icons/ArrowBack'
import ArrowForward from "material-ui-icons/ArrowForward";

import {PATIENT_API_SHORT_FORMAT, BREAK_ROWS_BY} from './../constants/Constants'
import {sortUtilFunc} from "../utils/Utils";



export default class DataSetTable extends Component {
    constructor() {
        super();

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


    onCellClick(e, rowNum, colNum) {
        this.props.sortDataSet(e.target.id)
    }

    // Two different types of headers. The first one is a range-header: 2802-2821
    // The second one is: label and count: Female:91
    injectSeparationHeader(index, i, patients, criterion, label = null) {
        if (this.numerical_sep_props.has(criterion)) {
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
        const patients = this.props.patients;
        let table_rows_patients = [];
        let back_arrow_color = '#222222';
        let forward_arrow_color = '#c8c8c8';
        if ((this.props.page_num + 1) * this.props.per_page < this.props.patients.length)
            forward_arrow_color = '#222222';
        if (this.props.page_num === 0)
            back_arrow_color = '#c8c8c8';

        let num_of_pages = Math.floor(this.props.patients.length / this.props.per_page)
        if (this.props.patients.length % this.props.per_page !== 0)
            num_of_pages++;

        if (!this.props.toggle_value) {
            patients.sort((a, b) =>
                sortUtilFunc(a, b, this.props.separation_criterion));

            let prev_label = "#(*-..-*)#";
            let filtered_patients = patients.slice(0);
            for (let i = 0, index = 0, cnt = 0; i < patients.length; i++, index++, cnt++) {
                if (this.numerical_sep_props.has(this.props.separation_criterion)) {
                    if (cnt % BREAK_ROWS_BY === 0) {
                        let label = "";
                        filtered_patients = filtered_patients.filter(patient =>
                            Number(patient[this.props.separation_criterion]) >=
                            Number(patients[i][this.props.separation_criterion]))
                        if (filtered_patients.length < BREAK_ROWS_BY-1) {
                            label = String(filtered_patients[filtered_patients.length - 1]
                                [this.props.separation_criterion])
                        }
                        else {
                            label = String(filtered_patients[BREAK_ROWS_BY-1][this.props.separation_criterion])
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
        } else {

            // Paginated Table
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
                                               style={{backgroundColor: "#ffffff", height: 'auto',}}>
                <TableRowColumn colSpan="5">

                    <IconButton
                        style={{float: 'right'}}
                        onClick={this.onArrowForwardClick.bind(this)}>
                        <ArrowForward
                            color={`${forward_arrow_color}`}
                        > </ArrowForward>
                    </IconButton>

                    <IconButton
                        style={{float: 'right'}}
                        onClick={this.onArrowBackClick.bind(this)}>
                        <ArrowBack
                            color={`${back_arrow_color}`}
                        > </ArrowBack>
                    </IconButton>

                    <Avatar
                        color={'grey'}
                        backgroundColor={"#E8E8E8"}
                        size={25}
                        style={{
                            float: 'right', top: '10px',
                            position: 'relative', marginRight: '20px'
                        }}>
                        {num_of_pages}
                    </Avatar>

                    <Avatar
                        color={'grey'}
                        backgroundColor={"#E8E8E8"}
                        size={25}
                        style={{
                            float: 'right', top: '10px',
                            position: 'relative', marginRight: '15px'
                        }}>
                        {this.props.page_num + 1}
                    </Avatar>

                    <SelectField
                        style={{
                            width: '60px', top: '-2px',
                            marginRight: '12px', fontSize: '12px',
                            float: 'right'
                        }}
                        value={this.props.per_page}
                        labelStyle={{color: '#303030', left: '15px'}}
                        underlineStyle={{display: 'none'}}
                        onChange={this.props.setPerPage}>
                        <MenuItem key={0} value={5} primaryText="5"/>
                        <MenuItem key={1} value={10} primaryText="10"/>
                        <MenuItem key={3} value={15} primaryText="15"/>
                    </SelectField>

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
        if ((page_num + 1) * this.props.per_page < this.props.patients.length)
            page_num += 1;
        this.props.setPageNum(page_num)
    }

    render() {
        return (
            <div>
                <Paper style={{marginLeft: '10px', width: '98%'}}
                       zDepth={2}>
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

                            <TableRow onCellClick={this.onCellClick.bind(this)}>
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
                </Paper>
            </div>
        );
    }
}