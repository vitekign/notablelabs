import React, {Component} from 'react';

import Paper from 'material-ui/Paper'

import PaginatedTable from "./PaginatedTable";
import SeparatedTable from "./SeparatedTable";


export default class DataSetTable extends Component {
    render() {
        if (this.props.toggle_value === 1)
            return (
                <Paper style={{marginLeft: '10px', width: '98%'}}
                       zDepth={2}>
                    <PaginatedTable
                        page_num={this.props.page_num}
                        dataset={this.props.mutable_patients}
                        per_page={this.props.per_page}
                        sorted_by={this.props.sorted_by}
                        setPageNum={this.props.setPageNum}
                        sortDataSet={this.props.sortDataSet}
                        setPerPage={this.props.setPerPage}
                        setSortedBy={this.props.setSortedBy}
                        setAscDesc={this.props.setAscDesc}
                    />
                </Paper>
            )
        else {
            return (
                <Paper style={{marginLeft: '10px', width: '98%'}}
                       zDepth={2}>
                    <SeparatedTable
                        patients={this.props.patients}
                        separation_criterion={this.props.separation_criterion}
                        sortDataSet={this.props.sortDataSet}
                        setSeparatedBy={this.props.setSeparatedBy}

                    />
                </Paper>
            )
        }
    }
}