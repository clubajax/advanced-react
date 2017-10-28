import React from 'react';
import '@clubajax/data-table';
import getData from '../util/data-20';


const columns = 'firstName,lastName,company,city,state,zipcode'.split(',');

export default function Home () {
	return (
		<main>
			<h2>Home Page</h2>
			<div className="data-table-wrapper">
				<data-table
					data={getData(columns)}
					scrollable={true}
					sortable={true}
					stretch-column="company"
				/>
			</div>
		</main>
	)
}