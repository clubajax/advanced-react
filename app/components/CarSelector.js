import React, { Component } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { types, makes, models, links } from '../util/car-data';
import bind from '../util/bind';

export default class CarSelector extends Component {

	constructor (props) {
		super();
		this.state = {
			makes: [],
			models: [],
			make: null,
			model: null
		};
		bind(this, 'onChooseType,onChooseMake,onChooseModel');
	}

	componentWillReceiveProps (props) {
		console.log('componentWillReceiveProps', props);
		if (props.value && props.value.type) {
			this.setState({
				type: props.value.type,
				make: props.value.make,
				model: props.value.model,
				makes: makes[props.value.type],
				models: models[props.value.make]
			});
		}
	}

	onChooseType (e) {
		console.log('on type');
		const value = e.target.value;
		if (value) {
			this.setState({ makes: makes[value], type: value, models: [] });
		} else {
			console.log('RESET');
		}
	}

	onChooseMake (e) {
		console.log('on make');
		const value = e.target.value;
		if (value) {
			this.setState({ models: models[value], make: value });
		}
	}

	onChooseModel (e) {
		console.log('on model');
		const value = e.target.value;
		this.setState({ model: value });
		this.props.onChange({
			type: this.state.type,
			make: this.state.make,
			model: value,
			link: links[this.state.make]
		});
	}

	render () {
		console.log('render');
		return (
			<div className="car-selector">
				<WebComponent
					component="drop-down"
					label="Type"
					placeholder="Choose Type"
					data={types}
					value={this.state.type}
					onChange={this.onChooseType}
				/>
				<WebComponent
					component="drop-down"
					label="Make"
					placeholder="Choose Make"
					data={this.state.makes}
					value={this.state.make}
					onChange={this.onChooseMake}
				/>
				<WebComponent
					key={this.state.type}
					component="drop-down"
					label="Model"
					placeholder="Choose Model"
					data={this.state.models}
					value={this.state.model}
					onChange={this.onChooseModel}
				/>
			</div>
		);
	}
}
