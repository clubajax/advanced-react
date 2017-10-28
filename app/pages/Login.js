import React, { Component } from 'react';
import ClubAjax from '../assets/ClubAjax';
import AppTitle from '../assets/AppTitle';
import Error from '../components/Error';
import { login } from '../util/api';
import goto from '../util/goto';
import bind from '../util/bind';

export default class Login extends Component {

	constructor () {
		super();
		this.state = {
			username: '',
			password: '',
			error: null
		};
		bind(this, 'submit,onChange');
	}

	submit (e) {
		e.preventDefault();
		login(this.state.username, this.state.password).then(() => {
			goto('/home');
		}).catch((e) => {
			console.log('fail', e);
			this.setState({
				error: e
			});
		});
		return false;
	}

	onChange (e) {
		this.setState({
			[e.target.name]: e.target.value
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
						<label>
							<span>Username</span>
							<input name="username" value={this.state.username} onChange={this.onChange} />
						</label>
						<label>
							<span>Password</span>
							<input name="password" type="password" onChange={this.onChange} />
						</label>
						{this.state.error && <Error error={this.state.error} />}
						<div className="button-row">
							<button className="outlined">Login</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}