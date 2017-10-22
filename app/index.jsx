import React from 'react';
import { render } from 'react-dom';

function renderApp () {
	render(
		<div>React App</div>, document.getElementById('react-root')
	);
}

renderApp();
