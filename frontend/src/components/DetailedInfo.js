import React, {Component} from 'react';
import uuidv1 from 'uuid/v1'
import {Link} from 'react-router-dom'
import * as _ from "lodash";

import Paper from 'material-ui/Paper';
import {CardText, CircularProgress, MuiThemeProvider} from "material-ui";
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

import {iconButtonStyle} from "../media/styles/DetailedInfo_style";
import {process_headers, process_strings} from '../utils/Utils'
import SearchBar from "./SearchBar"
import {RELOADING_COLOR} from "../constants/Constants"

export default class DetailedInfo extends Component {
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
        }

        this.pair_wise_tables = new Set(["fish_test_component_results",
            "molecularAnalysisAbnormalityTestingResults",
            "immunophenotype_cytochemistry_testing_results",
            "immunophenotypeCytochemistryTestingResults",
            "molecular_analysis_abnormality_testing_results",
            "fishTestComponentResults"]);
    }

    componentWillMount() {
        this.props.setCurrentDetailedPatientNum(this.props.match.params.id);
        this.props.loadDetailedInfoForAPatient();
    }

    updateDetailsInTables(details, user_input) {
        this.props.filterPatientDetails(user_input);
    }

    addRows(nested_features, cur_field) {
        const pair_rows_to_skip = new Set(["NA"]);
        let features_to_skip = new Set(['id', 'patient_withdrawal']);
        let rows = [];
        if (!this.pair_wise_tables.has(cur_field)) {
            for (let i = 0; i < nested_features.length; i++) {
                for (let key in nested_features[i]) {
                    if (nested_features.hasOwnProperty(key)) continue;
                    if (features_to_skip.has(key)) continue;

                    rows.push(
                        <TableRow key={uuidv1()}>
                            <TableRowColumn> {process_strings(String(key))} </TableRowColumn>
                            <TableRowColumn style={{textAlign: 'left'}}>
                                {nested_features[i][key]}
                            </TableRowColumn>
                        </TableRow>
                    )
                }
            }
        } else {
            for (let i = 0; i < nested_features.length; i++) {
                const keys = Object.keys(nested_features[i]);
                if (pair_rows_to_skip.has(nested_features[i][keys[0]]) &&
                    pair_rows_to_skip.has(nested_features[i][keys[1]]))
                    continue;
                rows.push(
                    <TableRow key={uuidv1()}>
                        <TableRowColumn>
                            {nested_features[i][keys[0]]}
                        </TableRowColumn>
                        <TableRowColumn style={{textAlign: 'left'}}>
                            {nested_features[i][keys[1]]}
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }
        return rows;
    }


    createTables(nested_features) {
        let nested_tables = [];

        for (let i = 0; i < Object.keys(nested_features).length; i++) {
            let cur_field = Object.keys(nested_features)[i];
            if (_.every(nested_features[cur_field], _.isEmpty)) {
                continue;
            }

            nested_tables.push(
                <Paper key={uuidv1()} style={{marginLeft: '20px', width: '95%', marginTop: '50px'}}
                       zDepth={2}>
                    <Table
                        key={uuidv1()}
                        fixedHeader={this.components_params.fixedHeader}
                        fixedFooter={this.components_params.fixedFooter}

                        multiSelectable={this.components_params.multiSelectable}>
                        <TableHeader
                            key={uuidv1()}
                            displaySelectAll={this.components_params.showCheckboxes}
                            adjustForCheckbox={this.components_params.showCheckboxes}
                            enableSelectAll={this.components_params.enableSelectAll}>

                            <TableRow style={{backgroundColor: "#222d38"}}
                                      key={uuidv1()} colSpan={3}>
                                <TableHeaderColumn colSpan={2} style={{
                                    marginLeft: '20px',
                                    color: 'white'
                                }}>
                                    <h2>{process_headers(Object.keys(nested_features)[i])}</h2>
                                </TableHeaderColumn>
                            </TableRow>

                            {this.pair_wise_tables.has(cur_field) ?
                                <TableRow key={uuidv1()}>
                                    <TableHeaderColumn>
                                        {process_strings(
                                            Object.keys(nested_features[cur_field][0])[0])}
                                    </TableHeaderColumn>
                                    <TableHeaderColumn>
                                        {process_strings(
                                            Object.keys(nested_features[cur_field][0])[1])}
                                    </TableHeaderColumn>
                                </TableRow>
                                : <tr></tr>
                            }

                        </TableHeader>

                        <TableBody
                            displayRowCheckbox={false}
                            deselectOnClickaway={false}
                            showRowHover={false}
                            stripedRows={false}>
                            {this.addRows(nested_features[cur_field], cur_field)}
                        </TableBody>
                    </Table>
                </Paper>
            )
        }
        return nested_tables;
    }


    render() {
        if (this.props.fetchingDetails)
            return (
                <MuiThemeProvider>
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
                </MuiThemeProvider>
            );

        const details = this.props.detailed_info;
        return (
            <MuiThemeProvider>
                <div>
                    <Link to={"/"}>
                        <IconButton
                            iconStyle={iconButtonStyle.mediumIcon}
                            style={iconButtonStyle.small}>
                            <ArrowBack
                                color={'#464646'}
                            > </ArrowBack>
                        </IconButton>
                    </Link>
                    <SearchBar
                        update={this.updateDetailsInTables.bind(this, details)}
                        floatingLabelText={"Search"}
                        hintText={"Search data set."}
                        margin={"22px"}
                        width={"94%"}>
                    </SearchBar>

                    {this.createTables(details)}

                </div>
            </MuiThemeProvider>
        );
    }
}
