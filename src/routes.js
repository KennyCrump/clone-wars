import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import ChallengeList from './Components/ChallengeList'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Challenge from './Components/Challenge';
import Create from './Components/Create';

export default (
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/challenges" component={ChallengeList}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/challenge/:id" component={Challenge}/>
        <Route path="/create" component={Create}/>


    </Switch>
)