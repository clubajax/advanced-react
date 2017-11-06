import React, { createElement } from 'react';
import WebComponent from '@clubajax/react-web-component';
import '@clubajax/popup-list/src/drop-down';
import { types, makes, models, links } from '../util/car-data';


// React.createElement(
// 	type,
// 	[props],
// 	[...children]
// )
// ReactElement = function (type, key, ref, self, source, owner, props)

const create = (node) => {
	console.log('create.node', node);
	return (props) => {
		console.log('create.props', props);
		const mixed = Object.assign({}, node, props);
		console.log('mix', mixed);
		return mixed;
	};
}

// const composable = (Component) => {
// 	const factory = createFactory(Component)
// 	return props => factory(props)
// }

const compose  = (...fns) => {
	return (...args) => {
		return fns.reduce((a, b) => {
			return b(a);
		}, ...args);
	}
};

const list = (...Components) => {
	return (props) => {
		return Components.map((c, i) => {
			return c(Object.assign({key: i + 1}, props));
		});
	}
}

const wrapped = (className, Component) => {
	return (props) => {
		return (
			<div className={className}>
				{Component(props)}
			</div>
		);
	}
}

//const D = (create(<div>D</div>));

const A = (props) => {
	console.log('a:', props);
	return create(<span>A</span>)(props);
}
const B = (props) => {
	return <span key={props.key}>B</span>;
}
const C = (props) => {
	return <span key={props.key}>C</span>;
}

// console.log('A', A);
// console.log('A()', A());
// console.log('D', D);
// console.log('D()', D());



const hoc = wrapped('car-selector hoc', list(A, B, C));

export default function SelectorHOC (props) {
	return hoc(props);
}
