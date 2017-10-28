import React, { Component } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { makes, models } from '../util/car-data';

export default class CarSelector extends Component {

	constructor () {
		super();
	}

	render () {
		return (
			<WebComponent
				component="drop-down"
				data={makes}
			/>
		);
	}
}
