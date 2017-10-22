import React from 'react';
import { render } from 'react-dom';
import './styles/main.scss';

function renderApp () {
	render(
		<div>React App</div>, document.getElementById('react-root')
	);
}

renderApp();
