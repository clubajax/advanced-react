import React, { Component } from 'react';
import ClubAjax from '../assets/ClubAjax';
import AppTitle from '../assets/AppTitle';
import Error from '../components/Error';
import Button from '../components/Button';
import Field from '../components/Field';
import { login } from '../util/api';
import goto from '../util/goto';
import bind from '../util/bind';
import { required, password } from '../util/validation'

export default class Login extends Component {

	constructor () {
		super();
		this.state = {
			username: '',
			password: '',
			error: null,
			busy: false
		};
		bind(this, 'submit,onChange');
	}

	submit (e) {
		e.preventDefault();
		this.setState({ busy: true });
		login(this.state.username, this.state.password).then(() => {
			this.setState({ busy: false });
			goto('/home');
		}).catch((e) => {
			console.log('fail', e);
			this.setState({
				error: e,
				busy: false
			});
		});
		return false;
	}

	onChange (e) {
		console.log(e);
		this.setState({
			[e.name]: e.value
		});
	}

	render () {
		return (
			<div className="login-page">
				<div className="login-bg" />
				<div className="login-widget">
					<ClubAjax />
					<AppTitle />
					<form onSubmit={this.submit}>
						<Field
							name="username"
							label="Username"
							validation={required}
							onChange={this.onChange}
						/>
						<Field
							type="password"
							name="password"
							label="Password"
							validation={password}
							onChange={this.onChange}
						/>
						<Error error={this.state.error} />
						<div className="button-row">
							<Button className="outlined" busy={this.state.busy}>Login</Button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}