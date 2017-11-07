import React, { Component } from 'react';

export default class Field extends Component {

	constructor () {
		super();
		this.state = {
			value: '',
			touched: false,
			errorMessage: '',
			className: ''
		};
	}

	onChange = (e) => {
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

	onBlur = () => {
		if (this.props.validation && this.state.touched) {
			const errorMessage = this.props.validation(this.state.value);
			this.setState({
				errorMessage
			});
			this.onValid(this.state.value);
		}
	}

	onValid (value) {
		if (this.props.validation && this.state.touched) {
			const errorMessage = this.props.validation(value);
			const valid = !errorMessage;
			this.setState({
				errorMessage
			});

			if (this.props.onValid) {
				this.props.onValid({
					name: this.props.name,
					valid
				});
			}
			if (valid && this.state.className) {
				this.setState({ className: '' });
			} else if (!valid && !this.state.className) {
				this.setState({ className: 'invalid' });
			}
		}
	}

	render () {
		const { type = 'text', label, name } = this.props;
		const msg = this.state.errorMessage;
		const className = this.state.className;
		return (
			<label className={className}>
				<span>{label}</span>
				<input
					type={type}
					value={this.state.value}
					name={name}
					onChange={this.onChange}
				/>
				{msg && <div className="error-message">{msg}</div>}
			</label>
		)
	}
}