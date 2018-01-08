import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import {styles} from '../media/styles/Search_style'
import {MAX_LENGTH_USER_INPUT} from './../constants/Constants'

class Search extends Component {

    handleUpdateInput(event, userInput) {
        this.props.update(userInput.slice(0, MAX_LENGTH_USER_INPUT));
    }

    render() {
        return (
                <TextField
                    id={"user_input"}
                    defaultValue={this.props.user_input}
                    floatingLabelText={this.props.floatingLabelText}
                    hintText={this.props.hintText}
                    style={{marginLeft: `${this.props.margin}`, width: `${this.props.width}`}}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}

                    onChange={this.handleUpdateInput.bind(this)}
                />
        )
    }
}

export default Search;