import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
//import { Router } from 'react-router';
//
import Login from './pages/Login';
import Home from './pages/Home';


export default function AppRouter () {
	return (
		<BrowserRouter>
			<div className="app-container">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/home" component={Home} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}
