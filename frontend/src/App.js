import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataSet from "./containers/DataSet";
import logo from './media/images/NotableLabs-Logo-01.png'
import DetailedInfo from './components/DetailedInfo'
import Whoops404 from './components/Whoop404'
import {
    HashRouter,
    Route,
    Switch,

} from 'react-router-dom'







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
                        <Route component={Whoops404}/>
                        {/*if nothing was matched fire the last option*/}
                        {/*in the router switch statement*/}
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
