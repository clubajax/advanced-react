import React, { Component } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { makes, models, links } from '../util/car-data';
import bind from '../util/bind';

export default class CarSelector extends Component {

	constructor () {
		super();
		this.state = {
			models: [],
			make: null,
			model: null
		};
		bind(this, 'onChooseMake,onChooseModel');
	}

	onChooseMake (e) {
		const value = e.target.value;
		console.log('make', value);
		this.setState({ models: models[value], make: value });
	}

	onChooseModel (e) {
		const value = e.target.value;
		console.log('model', value);
		this.setState({ model: value });
		this.props.onChange({
			make: this.state.make,
			model: value,
			link: links[this.state.make]
		});
	}

	render () {
		return (
			<div className="car-selector">
				<WebComponent
					component="drop-down"
					label="Make"
					placeholder="Choose Make"
					data={makes}
					onChange={this.onChooseMake}
				/>
				<WebComponent
					component="drop-down"
					label="Model"
					placeholder="Choose Model"
					data={this.state.models}
					onChange={this.onChooseModel}
				/>
			</div>
		);
	}
}
