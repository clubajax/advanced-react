import React from 'react';

const withLogger = (WrappedComponent) => {
	return class ClickLogger extends React.Component {
		constructor(props) {
			super(props);

			this.onClick = this.onClick.bind(this);
		}

		onClick(e) {
			console.log(e);
			if (this.props.onClick) {
				this.props.onClick(e);
			}
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

		toggleColor(e) {
			this.setState({ toggled: !this.state.toggled });
			if (this.props.onClick) {
				this.props.onClick(e);
			}
		}

		render() {
			const fontColor = this.state.toggled? color: 'black';
			return (
				<WrappedComponent { ...this.props }
					style={{color: fontColor}}
					onClick={this.toggleColor} />
			);
		}
	}
}

class BaseComponent extends React.Component {
	render() {
		return (
			<div onClick={this.props.onClick} style={this.props.style}>
				<h3>{ this.props.title }</h3>
				<p>{ this.props.content }</p>
			</div>
		);
	}
}

const UpperCaseToggleableComponent = makeUpperCase(makeToggleable(BaseComponent, 'red'));


export default function HOCCOMPLEX () {
	return (
		<main>
			<h2>HOC Page - Higher Order Components</h2>
			<div className="hoc-wrapper">
				<UpperCaseToggleableComponent title="batman" content="robin" />
			</div>
		</main>
	)
}