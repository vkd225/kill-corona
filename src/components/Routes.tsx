import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import StartGame from './game/StartGame';
import Leaderboard from './leaderboard/Leaderboard'
import PageNotFound from './PageNotFound'

export default class Routes extends Component {
    render() {
        return (
            <Router>
				<Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/game" component={StartGame} />
                    <Route exact path="/leaderboard" component={Leaderboard} />
                    <Route component={PageNotFound} />
				</Switch>
			</Router>
        );
    }
}