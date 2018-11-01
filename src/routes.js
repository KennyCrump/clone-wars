import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard'
import ChallengeList from './Components/ChallengeList/ChallengeList'
import Profile from './Components/Profile/Profile'
import Login from './Components/Login/Login'
import Challenge from './Components/Challenge/Challenge';
import Create from './Components/Create/Create';
import About from './Components/About/About'
import Account from './Components/Profile/Account'
export default <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/challenges" component={ChallengeList}/>
        <Route path="/profile/:id" component={Profile}/>
        {/* <Route path="/profile" component={Profile}/> */}
        <Route path="/challenge/:id" component={Challenge}/>
        <Route path="/create" component={Create}/>
        <Route path="/about" component={About}/>
        <Route path="/account" component={Account}/>

    </Switch>
