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
        if (page_num != this.props.page_num)
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
        if (page_num != this.props.page_num)
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
        num_of_pages = num_of_pages === 0 ? 1 : num_of_pages;

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
        // Add/Remove additional height to/from the table when the search result is equal to 0
        let additional_height = ""
        let i = 0;
        while (table_rows_patients.length < this.props.per_page) {
            additional_height = "1px solid white";
            if (this.props.dataset.length === 0 && i == 0)
                additional_height = "0px solid white";
            table_rows_patients.push(
                <TableRow key={uuidv1()} style={{backgroundColor: "#ffffff", border: `${additional_height}`}}>
                    <TableRowColumn colSpan="5">
                    </TableRowColumn>
                </TableRow>
            )
            i++;
        }

        table_rows_patients.push(
            <TableRow key={uuidv1()}>
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

        let bold_style = {
            color: 'black',
            fontWeight: 'bold'
        }
        let reg_style = {
            color: 'grey',
            fontWeight: 'normal'
        }

        let id_style = this.props.sorted_by === PATIENT_API_SHORT_FORMAT.ID ? bold_style : reg_style;
        let gender_style = this.props.sorted_by === PATIENT_API_SHORT_FORMAT.GENDER ? bold_style : reg_style;
        let ethnicity_style = this.props.sorted_by === PATIENT_API_SHORT_FORMAT.ETHNICITY ? bold_style : reg_style;
        let platelet_result_count = this.props.sorted_by === PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT ?
            bold_style : reg_style
        let vital_status = this.props.sorted_by === PATIENT_API_SHORT_FORMAT.VITAL_STATUS ?
            bold_style : reg_style

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
                        <TableHeaderColumn style={id_style}
                                           id={PATIENT_API_SHORT_FORMAT.ID}>ID</TableHeaderColumn>
                        <TableHeaderColumn style={gender_style}
                                           id={PATIENT_API_SHORT_FORMAT.GENDER}>Gender
                        </TableHeaderColumn>
                        <TableHeaderColumn style={ethnicity_style}
                                           id={PATIENT_API_SHORT_FORMAT.ETHNICITY}>Ethnicity
                        </TableHeaderColumn>
                        <TableHeaderColumn style={platelet_result_count}
                                           id={PATIENT_API_SHORT_FORMAT.PLATELET_RESULT_COUNT}>
                            Platelet Result
                            Count</TableHeaderColumn>
                        <TableHeaderColumn style={vital_status}
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