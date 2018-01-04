import React, {Component} from 'react';
import {
    HashRouter,
    Route,
    Switch,

} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import DataSet from "./containers/DataSet";
import DetailedInfo from './containers/DetailedInfo'
import NotFound404 from './components/NotFound404'
import logo from './media/images/NotableLabs-Logo-01.png'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="main">
                    <img src={logo} alt="Notable Labs" style={{
                        width: '150px', marginLeft: '20px', marginTop: '20px',
                        clear: 'both', position: 'relative'
                    }}/>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <MuiThemeProvider>
                                <div className="App">
                                    <DataSet/>
                                </div>
                            </MuiThemeProvider>
                        )}/>
                        <Route path="/detailed_info/:id" component={DetailedInfo}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
