import React from 'react';
import { create, style } from '../util/hoc';

let Raw = <div>Basic Node</div>;

Raw = style(Raw, {
	fontSize: '18px',
	fontStyle: 'italic',
	color: '#0000FF',
	cursor: 'pointer'
});

console.log('Raw', Raw);

const Node = create(Raw);

export default function HOC2 () {
	return (
		<main>
			<h2>HOC-2 - Higher Order Components</h2>
			<div className="hoc-wrapper">
				<Node />
			</div>
		</main>
	)
}