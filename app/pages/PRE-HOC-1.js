import React from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/data-table';
import getData from '../util/data-20';
import Loader from '../assets/Loader';

const columns = 'firstName,lastName,company'.split(',');

export default class PREHOC1 extends React.Component {
	constructor () {
		super();
		this.state = {
			data: null
		};
	}

	loadData = () => {
		this.setState({
			data: getData(columns)
		})
	}

	render () {
		return (
			<main>
				<h2>PRE HOC-1 - Without HOC</h2>
				<div className="hoc-wrapper">
					<div className="data-table-wrapper">
						{!this.state.data && <Loader />}
						{this.state.data && <WebComponent
							component="data-table"
							data={this.state.data}
							scrollable="true"
							selectable="true"
							sortable="true"
							stretch-column="company"
						/>}
					</div>
					<button onClick={this.loadData}>Load Data</button>
				</div>
			</main>
		)
	}
}