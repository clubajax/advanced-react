import React, { Component } from 'react';
import { auth } from '../util/api';
import goto from '../util/goto';

export default function Authenticated(ComposedComponent, Alt) {

	class AuthenticatedComponent extends Component {
		constructor () {
			super();
			this.state = {
				authed: null
			};
		}

		componentWillMount() {
			console.log('check auth...');
			auth().then((authed) => {
				this.setState({ authed });
				if (!authed) {
					goto('/');
				}
			});
		}

		render() {
			if (this.state.authed === null) {
				return null; // TODO - loader
			}
			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	return AuthenticatedComponent;
}
