import React, {Component} from 'react';
import {API_PATH} from "../constants/Constants";
import {capitalizeFirstLetter, getResourceName, removeUnderscores, compose,
capitalizeWholeStrIfInSet} from '../utils/Utils'

import Paper from 'material-ui/Paper';
import {MuiThemeProvider} from "material-ui";

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack'
import {iconButtonStyle, paper_style} from "../media/styles/DetailedInfo_style";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


import {Link} from 'react-router-dom'

const RESOURCE_NAME = getResourceName(window.location.hostname);


export default class DetailedInfo extends Component {
    state = {
        details: {},
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

    componentWillMount() {
        fetch(`${RESOURCE_NAME}${API_PATH}patients/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(details => {
                this.setState({details: details});
                window.details = details;
            })
            .catch(error => {
                throw `${error}`
            });
    }



    render() {
        let details = this.state.details;
        window.details = details;
        let table_rows_details = [];
        let keys = Object.keys(details);

        const process_strings = compose(
            removeUnderscores,
            capitalizeFirstLetter,
            capitalizeWholeStrIfInSet.bind(null, new Set(['id','bcr', 'uuid',
            'icd', 'o', 'lab', 'dx', ]))
        )

        for (let i = 0; i < keys.length; i++) {
            if (Object(details[keys[i]]) !== details[keys[i]]) {
                table_rows_details.push(
                    <TableRow key={i}>
                        <TableRowColumn> {process_strings(String((keys[i])))} </TableRowColumn>
                        <TableRowColumn style={{textAlign: 'left'}}>
                            {details[keys[i]]}
                        </TableRowColumn>
                    </TableRow>
                )
            }
        }

        window.table = table_rows_details;

        return (
            <MuiThemeProvider>
                <div></div>
                <Link to={"/"}>
                    <IconButton
                        iconStyle={iconButtonStyle.mediumIcon}
                        style={iconButtonStyle.small}>
                        <ArrowBack> </ArrowBack>
                    </IconButton>
                </Link>
                <div></div>
                <Paper style={paper_style} zDepth={2}>
                    <h2 style={{marginTop: '5px', marginBottom: 0}}>Patient</h2>
                    <h1 style={{marginTop: '5px', color: '#22eda7'}}> {this.state.details.patient_id}</h1>
                </Paper>

                <Paper style={paper_style} zDepth={2}>
                    <h4 style={{marginTop: '5px', marginBottom: 0}}>More Info</h4>
                    <h1 style={{marginTop: '5px', color: '#ff1c0e'}}> {this.state.details.vital_status}</h1>
                </Paper>


                <div style={{clear: 'both'}}></div>
                <Paper style={{marginLeft: '20px', width: '95%'}}
                       zDepth={2}>
                    <Table
                        height={this.state.height}
                        fixedHeader={this.state.fixedHeader}
                        fixedFooter={this.state.fixedFooter}
                        selectable={this.state.selectable}
                        multiSelectable={this.state.multiSelectable}>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                            enableSelectAll={this.state.enableSelectAll}
                        >
                            <TableRow style={{backgroundColor: "#222d38"}}>
                                <h3 style={{marginLeft: '20px', color:'white'}}>Patient's Details</h3>
                            </TableRow>
                        </TableHeader>


                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            showRowHover={this.state.showRowHover}
                            stripedRows={this.state.stripedRows}>
                            >
                            {table_rows_details}
                        </TableBody>
                    </Table>
                </Paper>

            </MuiThemeProvider>
        );
    }
}
