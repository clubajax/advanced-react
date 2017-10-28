import React from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/data-table';
import getData from '../util/data-20';


const columns = 'firstName,lastName,company,city,state,zipcode'.split(',');

export default function Home () {
	return (
		<main>
			<h2>Home Page</h2>
			<div className="data-table-wrapper">
				<WebComponent
					component="data-table"
					data={getData(columns)}
					scrollable="true"
					selectable="true"
					sortable="true"
					stretch-column="company"
				/>
			</div>
		</main>
	)
}