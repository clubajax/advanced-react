import React, { Component } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { makes, models, links } from '../util/car-data';
import bind from '../util/bind';

export default class CarSelector extends Component {

	constructor (props) {
		super();
		this.state = {
			models: [],
			make: null,
			model: null
		};
		console.log('CONST', props);
		bind(this, 'onChooseMake,onChooseModel');
	}

	componentWillReceiveProps (props) {
		if (props.value && props.value.make) {
			this.setState({
				models: models[props.value.make],
				make: props.value.make,
				model: props.value.model
			});
		}
	}

	onChooseMake (e) {
		const value = e.target.value;
		console.log('make', value);
		if (value) {
			this.setState({ models: models[value], make: value });
		} else {
			console.log('RESET');
		}
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
					value={this.state.make}
					onChange={this.onChooseMake}
				/>
				<WebComponent
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
