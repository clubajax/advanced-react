import React from 'react';
import { pure, style, logClick, toggleState } from '../util/hoc';

let Raw = <div>Basic Node</div>;

Raw = style(Raw, {
	fontSize: '18px',
	fontStyle: 'italic',
	color: '#0000FF',
	cursor: 'pointer'
});

Raw = logClick(Raw);

const Node = pure(Raw);


let Raw2 = <div>Stateful Node</div>;
Raw2 = toggleState({
	method: 'click',
	prop: 'className'
}, Raw2);

export default function HOC2 () {
	return (
		<main>
			<h2>HOC-2 - Higher Order Components</h2>
			<div className="hoc-wrapper">
				<Node />
				<Raw2 />
			</div>
		</main>
	)
}