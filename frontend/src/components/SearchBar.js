import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import {styles} from '../media/styles/Search_style'
import {MAX_LENGTH_USER_INPUT} from './../constants/Constants'

class Search extends Component {
    handleUpdateInput(event, userInput) {
        this.props.updatePatientsInTable(userInput.slice(0, MAX_LENGTH_USER_INPUT));
    }

    render() {
        return (
            <div>
                <br/>
                <TextField
                    floatingLabelText="Search"
                    hintText="Search patients by id."
                    style={{margin: '10px', width: '98%'}}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}

                    onChange={this.handleUpdateInput.bind(this)}
                />
            </div>
        )
    }
};
export default Search;