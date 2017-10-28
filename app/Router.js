import React from 'react';
import {  Router, Route, Switch } from 'react-router-dom';
import { history } from './util/goto';
//
import Authenticated from './components/Authenticated';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';


export default function AppRouter () {
	return (
		<Router history={history}>
			<div className="app-container">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/" component={Authenticated(Main)}/>
				</Switch>
			</div>
		</Router>
	);
}

const Main = () => (
	<div>
		<Header />
		<Switch>
			<Route path="/home" component={Home} />
			<Route path="/settings" component={Settings} />
			<Route component={NotFound} />
		</Switch>
	</div>
);