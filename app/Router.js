import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
//
import Login from './pages/Login';
import Home from './pages/Home';
import Example from './pages/Example';


export default function Router () {
	return (
		<BrowserRouter>
			<div className="app-container">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/home" component={Home} />
					<Route path="/example" component={Example} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}
