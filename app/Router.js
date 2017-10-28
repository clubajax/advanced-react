import React from 'react';
import {  Router, Route, Switch } from 'react-router-dom';
import { history } from './util/goto';
//
import Login from './pages/Login';
import Home from './pages/Home';
import Example from './pages/Example';


export default function AppRouter () {
	return (
		<Router history={history}>
			<div className="app-container">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/home" component={Home} />
					<Route path="/example" component={Example} />
				</Switch>
			</div>
		</Router>
	);
}
