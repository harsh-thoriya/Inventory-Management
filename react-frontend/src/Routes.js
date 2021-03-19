import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Home from './components/employee/Home';
import Request from './components/employee/Request';
import Return from './components/employee/Return';
import AddInventory from './components/admin/AddInventory';
import Dashboard from './components/admin/Dashboard';
import RequestHr from './components/admin/Request';
import ReturnHr from './components/admin/Return';
import Approval from './components/admin/Approval';
import Login from './components/Login'

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/home" exact component={Home} />   
                    <Route path="/request" component={Request}/>
                    <Route path="/return" component={Return}/>
                    <Route path="/addInventory" component={AddInventory} />
                    <Route path="/dashboard" exact component={Dashboard} />  
                    <Route path="/requestHr" component={RequestHr}/>
                    <Route path="/returnHr" component={ReturnHr}/>
                    <Route path="/approval" exact component={Approval} /> 
                    <Route path="/" exact component={Login} />   
                </Switch>
            </Router>
        )
    }
}