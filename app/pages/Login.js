import React, { Component } from 'react';
import ClubAjax from '../assets/ClubAjax';
import AppTitle from '../assets/AppTitle';
import { login } from '../util/api';

export default class Login extends Component {

	constructor () {
		super();
		this.submit = this.submit.bind(this);
	}

	submit (e) {
		e.preventDefault();
		const form = e.target;
		console.log('SUBMIT!', e.target);
		window.form = e.target;
		login(form.username.value, form.password.value).then(() => {
			console.log('success');
		}).catch(() => {
			console.log('fail');
		});
		return false;
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
							<input name="username" />
						</label>
						<label>
							<span>Password</span>
							<input name="password" type="password" />
						</label>
						<div className="button-row">
							<button className="outlined">Login</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}