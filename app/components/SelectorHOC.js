import React, { Component } from 'react';
import '@clubajax/popup-list/src/drop-down';


// React.createElement(
// 	type,
// 	[props],
// 	[...children]
// )
// ReactElement = function (type, key, ref, self, source, owner, props)

function mix (props, added) {
	return Object.assign({}, props, added);
}

export const compose = (node) => {
	return (props) => {
		const cloned = mix(node);
		cloned.props = mix(cloned.props, props);
		return cloned;
	}
};

const list = (...Components) => {
	console.log('list...');
	return (props) => {
		return Components.map((c, i) => {
			const p = Object.assign({key: i + 1}, props);
			console.log('list', p);
			const o = {
				component: c
			}
			return <o.component {...p} />;
			// if (isClass(c)) {

			// 	return <o.component {...p} />;
			// }
			// return c(p);
		});
	}
}

const wrapped = (className, Widget) => {
	console.log('wrapped...');
	return (props) => {
		//console.log('wrapped', props, Widget);
		return (
			<div className={className}>
				<Widget {...props} />
			</div>
		);
	}
}

export const toggleClassName = (className, Widget) => {
	console.log('toggle...');
	//return (props) => {
		class ToggleClassName extends Component {
			constructor (p) {
				super(p);
				this.state = {
					className: ''
				};
				console.log('constructor', p);
			}
			// onClick = () => {
			// 	console.log('CLICK');
			// 	this.setState({
			// 		className: this.className ? '' : className
			// 	});
			// }

			render () {
				console.log('render....', this.props);
				const cls = `${this.props.className} ${this.state.className} classed`;
				return <Widget className={cls} {...this.props} onClick={() => {
					console.log('click-O');
				}} />
			}
		}

		return ToggleClassName;
	//}
}

const AA = compose(<span>AA</span>);

export const A = (props) => {
	return compose(<span>A</span>)(props);
}
const B = (props) => {
	return compose(<span>B</span>)(props);
}
const C = (props) => {
	return compose(<span>C</span>)(props);
}

console.log('A', A());
// console.log('A()', A());
// console.log('D', D);
// console.log('D()', D());



const HOC = wrapped('car-selector hoc', list(
	toggleClassName('selected', A),
	//A,
	B,
	C
));

const clickable = (el) => {
	console.log('clickable', el);

	const element = mix(el);
	element.props = mix(element.props, {
		onClick () {
			console.log('added this sweet click');
		}
	});

	return element;
}

const AC = compose(clickable(<span>CLICK HERE</span>));

console.log('AC', AC);

export function SelectorHOC (props) {
	return (
		<div className="selector-hoc">
			<AC className="click-this-thing"/>
		</div>
	);
}

//export toggleClassName('selected', A);

const withLogger = (WrappedComponent) => {
	return class ClickLogger extends React.Component {
		constructor(props) {
			super(props);

			this.onClick = this.onClick.bind(this);
		}

		onClick(e) {
			console.log('log!', this.props);
			this.props.onClick();
		}

		render() {
			const { title, content } = this.props;
			return (
				<div>
					<WrappedComponent {...this.props} onClick={this.onClick} />
				</div>
			);
		}
	}
}

const makeUpperCase = (WrappedComponent) => {
	return class UpperCaseComponent extends React.Component {
		render() {
			const props = Object.assign({}, this.props, {
				title: this.props.title.toUpperCase()
			});

			return <WrappedComponent { ...props } />
		}
	};
}

const makeToggleable = (WrappedComponent, color) => {
	return class ToggleableComponent extends React.Component {
		constructor(props) {
			super(props);

			this.state = { toggled: false };
			this.toggleColor = this.toggleColor.bind(this);
		}

		toggleColor() {
			this.setState({ toggled: !this.state.toggled });
		}

		render() {
			const fontColor = this.state.toggled? color: 'black';
			console.log('wrap.props', this.props);
			return (
				<WrappedComponent { ...this.props }
					style={{color: fontColor}}
					onClick={() => {
						console.log('wrap.click');
						this.toggleColor();
					}} />
			);
		}
	}
}

class BaseComponent extends React.Component {
	render() {
		console.log('BASE', this.props);
		return (
			<div onClick={() => {
				console.log('base.click');
				this.props.onClick();
			}}
				style={this.props.style}>

				<h3>{ this.props.title }</h3>
				<p>{ this.props.content }</p>
			</div>
		);
	}
}

console.log('new Base', (new BaseComponent({title: 'My Foo'})).render());
export const ToggleableComponent = makeToggleable(BaseComponent, 'blue');

export const UpperCaseToggleableComponent = makeUpperCase(makeToggleable(withLogger(BaseComponent, 'red')));
