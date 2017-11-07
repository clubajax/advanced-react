import React from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/data-table';
import getData from '../util/data-20';
import Loader from '../assets/Loader';
import { withProp, withoutProp } from '../util/hoc';
const columns = 'firstName,lastName,company'.split(',');

const Table = withProp('data', (props) => {
	return (<WebComponent
		component="data-table"
		data={props.data}
		scrollable="true"
		selectable="true"
		sortable="true"
		stretch-column="company"
	/>);
});

const TableLoader = withoutProp('data', (props) => {
	return <Loader />;
})

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
				<h2>HOC POST</h2>
				<div className="hoc-wrapper">
					<div className="data-table-wrapper">
						<TableLoader data={this.state.data} />
						<Table data={this.state.data} />
					</div>
					<button onClick={this.loadData}>Load Data</button>
				</div>
			</main>
		)
	}
}