import React, { Component } from 'react';
import ClubAjax from '../assets/ClubAjax';
import AppTitle from '../assets/AppTitle';
import Error from '../components/Error';
import Button from '../components/Button';
import Field from '../components/Field';
import { login } from '../util/api';
import goto from '../util/goto';
import { required, password } from '../util/validation'

export default class Login extends Component {

	constructor () {
		super();
		this.state = {
			username: '',
			password: '',
			error: null,
			busy: false,
			valid: {}
		};
	}

	submit = (e) => {
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

	onChange = (e) => {
		this.setState({
			[e.name]: e.value
		});
	}

	onValid = (e) => {
		this.setState({
			valid: {...this.state.valid, [e.name]: e.valid}
		})
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
							onValid={this.onValid}
						/>
						<Field
							type="password"
							name="password"
							label="Password"
							validation={password}
							onChange={this.onChange}
							onValid={this.onValid}
						/>
						<Error error={this.state.error} />
						<div className="button-row">
							<Button
								className="outlined"
								busy={this.state.busy}
								disabled={!this.state.valid.password || !this.state.valid.username}
							>
								Login
							</Button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}