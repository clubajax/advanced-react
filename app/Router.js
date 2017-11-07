import React from 'react';
import {  Router, Route, Switch } from 'react-router-dom';
import { history } from './util/goto';
//
import Authenticated from './components/Authenticated';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import HOC from './pages/HOC';
import HOCPRE from './pages/HOC-PRE';
import HOCPOST from './pages/HOC-POST';
import HOC2 from './pages/HOC-2';
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
			<Route path="/hoc-pre" component={HOCPRE} />
			<Route path="/hoc-post" component={HOCPOST} />
			<Route path="/hoc-2" component={HOC2} />
			<Route path="/hoc" component={HOC} />
			<Route component={NotFound} />
		</Switch>
	</div>
);