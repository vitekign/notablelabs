import React, {Component} from 'react';

import {process_headers} from '../utils/Utils'
import Paper from 'material-ui/Paper'


const width = 80;
const height = 80;

const style = {
    height: height,
    width: width,
    margin: 20,
    marginTop: 1,
    marginRight: 0,
    marginBottom: 0,
    textAlign: 'center',
    display: 'block',
    background: 'linear-gradient(to bottom, rgba(20,25,31,1) 40%,rgba(31,36,48,1) 40%)',
    float: 'left',
    fontFamily: "'Quicksand', sans-serif",

}

const style_secondary = {
    height: height,
    width: width,
    margin: 20,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 0,
    marginBottom: 0,
    textAlign: 'center',
    display: 'block',
    background: 'linear-gradient(to bottom, rgba(20,25,31,1) 40%,rgba(31,36,48,1) 40%)',
    float: 'left',
    fontFamily: "'Quicksand', sans-serif",

}


class Panel extends Component {
    render() {
        return (
            <div style={{marginTop: '25px'}}>

                <Paper zDepth={3}
                       style={style}>
                    <h4 style={{color: '#1ac800', marginTop: '6px', marginBottom: '0',
                    marginLeft: 10, textAlign: 'left' }}>ID</h4>
                    <h4 style={{color: 'white', marginTop: 15}}>{this.props.detailed_info.patientDetails[0].patient_id}</h4>
                </Paper>

                <Paper zDepth={3}
                       style={style_secondary}>
                    <h4 style={{color: '#e3e9ea', marginTop: '6px', marginBottom: '0',
                    marginLeft: 10, textAlign: 'left' }}> AGE </h4>
                    <h4 style={{color: '#feffff', marginTop: 15}}>
                        {this.props.detailed_info.patientDetails[0]
                            .age_at_initial_pathologic_diagnosis}</h4>
                </Paper>

                <Paper zDepth={3}
                       style={style_secondary}>
                     <h4 style={{color: '#ff3500', marginTop: '6px', marginBottom: '0',
                    marginLeft: 10, textAlign: 'left' }}> GEN </h4>
                    <h4 style={{color: '#feffff', marginTop: 15}}>
                        {process_headers(this.props.detailed_info.patientDetails[0]
                            .gender)}</h4>
                </Paper>

            </div>
        )
    }


}

export default Panel