import React, { Component } from 'react';


class BaseComponent extends React.Component {
	render() {
		const { className, text, title } = this.props;
		return (
			<div className={className} onClick={() => console.log('bc.click')}>
				 <h3>{title}</h3>
				<p>{text}</p>
			</div>
		);
	}
}

const makeClickable = (WrappedComponent, color) => {
	return class ClickableComponent extends React.Component {
		render() {
			const props = Object.assign({}, this.props, {
				onClick () {
					console.log('added clicker');
				}
			});
			console.log('PROPS', props);
			return (
				<WrappedComponent {...props} />
			);
		}
	}
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

const Base = makeClickable(BaseComponent);


export default function Clickers () {
	return (<div className="hoc-wrapper">
		<Base text="click me" title="the clicker" className="clicker" />
	</div>)
}
