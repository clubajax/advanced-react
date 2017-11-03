import React, { Component } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { types, makes, models, links } from '../util/car-data';

export default class CarSelector extends Component {

	constructor (props) {
		super();
		this.state = {
			makes: [],
			models: [],
			make: null,
			model: null
		};
	}

	componentWillReceiveProps (props) {
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

	onChooseType = (e) => {
		const value = e.target.value;
		if (value) {
			this.setState({ makes: makes[value], type: value, models: [] });
		} else {
			console.log('RESET');
		}
	}

	onChooseMake = (e) => {
		const value = e.target.value;
		if (value) {
			this.setState({ models: models[value], make: value });
		}
	}

	onChooseModel = (e) => {
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
