import React, { Component } from 'react';
import Loader from '../assets/Loader';
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
				return <Loader />
			}
			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	return AuthenticatedComponent;
}
