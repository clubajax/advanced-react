import React, { Component } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { makes, models } from '../util/car-data';
import bind from '../util/bind';

export default class CarSelector extends Component {

	constructor () {
		super();
		this.state = {
			models: []
		};
		bind(this, 'onChange');
	}

	onChange (e) {
		console.log('cng', e.target.value);
		this.setState({ models: models[e.target.value] });
	}

	render () {
		return (
			<div className="car-selector">
				<WebComponent
					component="drop-down"
					label="Make"
					placeholder="Choose Make"
					data={makes}
					onChange={this.onChange}
				/>
				<WebComponent
					component="drop-down"
					label="Model"
					placeholder="Choose Model"
					data={this.state.models}
				/>
			</div>
		);
	}
}
