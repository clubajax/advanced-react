import '@clubajax/custom-elements-polyfill';
import React from 'react';
import { render } from 'react-dom';
import './styles/main.scss';
import Router from './Router';

function renderApp () {
	render(
		<Router />, document.getElementById('react-root')
	);
}

renderApp();
