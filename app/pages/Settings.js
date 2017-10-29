import React, { Component } from 'react';
import CarSelector from '../components/CarSelector';
import Button from '../components/Button';
import Loader from '../assets/Loader';

import bind from '../util/bind';
import { postCar, getCar } from '../util/api';

export default class Settings extends Component {

	constructor () {
		super();
		this.state = {
			models: [],
			make: null,
			model: null,
			link: null,
			busy: false,
			loading: true
		};
		bind(this, 'onSave,onSelect');
	}

	componentDidMount () {
		getCar().then((data) => {
			this.setState({ loading: false });
			if (data) {

			}
		});
	}

	onSave () {
		console.log('onSave');
	}

	onSelect (e) {
		console.log('onSelect', e);
		this.setDisplay(e);
	}

	setDisplay (data) {
		this.setState({
			make: data.make,
			model: data.model,
			link: data.link,
		});
	}

	render () {
		if (this.state.loading) {
			return <Loader />;
		}
		return (
			<main className="settings-page">
				<h2>Settings Page</h2>
				<div className="car-display">
					<form className="bordered">
						<CarSelector
							onChange={this.onSelect}
						/>
						<div className="button-row">
							<Button
								busyText="Saving..."
								onClick={this.onSave}
								busy={this.state.busy}
							>Save</Button>
						</div>
					</form>
					<div className="pic-display">
						{this.state.link && <img src={this.state.link} alt={this.state.make} />}
					</div>
				</div>
			</main>
		);
	}
}