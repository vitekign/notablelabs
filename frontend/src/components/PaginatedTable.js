import React, {Component} from 'react';

import {
    Avatar, IconButton, MenuItem, SelectField, TableRow, TableRowColumn, TableHeaderColumn,
    TableHeader, TableBody, Table
} from "material-ui";
import {Link} from 'react-router-dom'

import ArrowBack from 'material-ui-icons/ArrowBack'
import ArrowForward from "material-ui-icons/ArrowForward";
import uuidv1 from 'uuid/v1'
import {PATIENT_API_SHORT_FORMAT} from './../constants/Constants'


class PaginatedTable extends Component {

    constructor(props) {
        super(props);
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
    }

    onArrowBackClick(even) {
        let page_num = this.props.page_num;
        if (page_num > 0)
            page_num -= 1;
        if(page_num != this.props.page_num)
            this.props.setPageNum(page_num)
    }

    // 67
    // (0+1) * 67 < 200 =  67 < 200:= True:= Go to the next page [to page 2]
    // (1+1) * 67 < 200 = 134 < 200:= True:= Go to the next page [to page 3]
    // (2+1) * 67 < 200 = 201 < 200:= False:= State at the current page [stay at 3]
    onArrowForwardClick(event) {
        let page_num = this.props.page_num;
        if ((page_num + 1) * this.props.per_page < this.props.dataset.length)
            page_num += 1;
        if(page_num != this.props.page_num)
            this.props.setPageNum(page_num)
    }

    onCellClick(e, rowNum, colNum) {
        this.props.setAscDesc(e.target.id)
        this.props.setSortedBy(e.target.id)

    }

    buildRows() {
        let back_arrow_color = '#222222';
        let forward_arrow_color = '#c8c8c8';
        if ((this.props.page_num + 1) * this.props.per_page < this.props.dataset.length)
            forward_arrow_color = '#222222';
        if (this.props.page_num === 0)
            back_arrow_color = '#c8c8c8';

        let num_of_pages = Math.floor(this.props.dataset.length / this.props.per_page)
        if (this.props.dataset.length % this.props.per_page !== 0)
            num_of_pages++;

        let table_rows_patients = this.props.dataset
            .filter((patient, i) => i < (this.props.page_num + 1) * this.props.per_page &&
                i >= this.props.page_num * this.props.per_page)
            .map((patient, i) => {
                return (
                    <TableRow key={uuidv1()}>
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

        //Fill up the empty slots.
        while (table_rows_patients.length < this.props.per_page) {
            table_rows_patients.push(
                <TableRow key={uuidv1()} style={{backgroundColor: "#ffffff", border: '1px solid white'}}>
                    <TableRowColumn colSpan="5">
                    </TableRowColumn>
                </TableRow>
            )
        }

        table_rows_patients.push(
            <TableRow key={uuidv1()}
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
        )
    }
};
export default PaginatedTable