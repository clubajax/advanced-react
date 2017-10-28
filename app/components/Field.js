import React, { Component } from 'react';
import bind from '../util/bind';

export default class Field extends Component {

	constructor () {
		super();
		this.state = {
			value: '',
			touched: false,
			errorMessage: ''
		};
		bind(this, 'onChange,onBlur');
	}

	onChange (e) {
		const value = e.target.value;
		this.setState({
			value,
			touched: true
		});
		this.props.onChange({
			name: this.props.name,
			value
		});
		this.onValid(value);
	}

	onBlur () {
		if (this.props.validation && this.state.touched) {
			const errorMessage = this.props.validation(this.state.value);
			this.setState({
				errorMessage
			});
			this.onValid(this.state.value);
		}
	}

	onValid (value) {
		if(this.props.onValid){
			this.props.onValid({
				name: this.props.name,
				valid: !this.props.validation(value)
			});
		}
	}

	render () {
		const {type = 'text', label, name } = this.props;
		const msg = this.state.errorMessage;

		return (
			<label>
				<span>{label}</span>
				<input
					type={type}
					value={this.state.value}
					name={name}
					onChange={this.onChange}
					onBlur={this.onBlur}
				/>
				{msg && <div className="error-message">{msg}</div>}
			</label>
		)
	}
}