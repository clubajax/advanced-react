import React, { Component } from 'react';
import CarSelector from '../components/CarSelector';
import Button from '../components/Button';
import Loader from '../assets/Loader';
import Error from '../components/Error';
import bind from '../util/bind';
import { postCar, getCar } from '../util/api';

export default class Settings extends Component {

	constructor () {
		super();
		this.state = {
			type: null,
			make: null,
			model: null,
			link: null,
			busy: false,
			loading: true,
			error: null
		};
		bind(this, 'onSelect,onSubmit');
	}

	componentDidMount () {
		getCar().then((data) => {
			console.log('GET', data);
			this.setState({ loading: false });
			if (data) {
				this.setDisplay(data);
			}
		});
	}

	onSubmit (e) {
		e.preventDefault();
		console.log('onSave', e);
		this.setState({ busy: true });
		postCar(this.state).then(() => {
			this.setState({ busy: false });
		}).catch((e) => {
			this.setState({
				busy: false,
				error: e
			});

		});
	}

	onSelect (e) {
		console.log('onSelect', e);
		this.setDisplay(e);
	}

	setDisplay (data) {
		this.setState({
			type: data.type,
			make: data.make,
			model: data.model,
			link: data.link,
			error: null
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
					<form className="bordered" onSubmit={this.onSubmit}>
						<CarSelector
							value={{
								type: this.state.type,
								make: this.state.make,
								model: this.state.model,
								link: this.state.link
							}}
							onChange={this.onSelect}
						/>
						<Error error={this.state.error} />
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