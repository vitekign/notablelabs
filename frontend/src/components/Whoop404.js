import React, {Component} from 'react';

class Whoops404 extends Component {
    render() {
        return (
            <div classname="whoops-404">
                <h1>Resource not found at '{this.props.location.pathname}'</h1>
            </div>
        )
    }
}

export default Whoops404;