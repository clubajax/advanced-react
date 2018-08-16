import React from 'react';
import { pure, style, logClick, toggleState, toggleClass, clone, mix } from '../util/hoc';

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
	prop: 'className',
	className: 'hoc-selected'
}, Raw2);


const Input = (props) => {
	return (
		<input onChange={(e) => {
			console.log('input.change...');
			if (props.onChange) {
				props.onChange(e);
			}
		}}/>
	);
}

class Wrapper extends React.Component {
	onChange (e) {
		console.log('wrapper.change', e.target.value);
	}
	render () {
		console.log('this.props.children', this.props.children);
		const child = clone(Array.isArray(this.props.children) ? this.props.children[0] : this.props.children);
		child.props = mix(child.props, {onChange: (e) => {
			this.onChange(e);
		}});
		return (
			<div>
				<label>chance the wrapper</label>
				{child}
			</div>
		)
	}
}

export default function Page () {
	return (
		<main>
			<h2>HOC-2 - Higher Order Components</h2>
			<div className="hoc-wrapper">
				<Wrapper>
					<Input />
					<Input />
					<Input />
				</Wrapper>
			</div>
		</main>
	)
}