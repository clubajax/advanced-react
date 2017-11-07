import React from 'react';

export const mix = (props, added)  => Object.assign({}, props, added);

export const clone = obj => Object.assign({}, obj);

export const isClass = (component) => component && component.prototype && typeof component.prototype.render === 'function';

const addProps = (node, props) => {
	const cloned = mix(node);
	cloned.props = mix(cloned.props, props);
	return cloned;
}

export const pure = (node) => {
	return (props) => {
		const cloned = mix(node);
		cloned.props = mix(cloned.props, props);
		return cloned;
	}
}

export const style = (node, style) => {
	return addProps(node, { style });
}

export const addProp = (node, prop) => {
	return addProps(node, { style });
}

export const logClick = (node) => {
	return addProps(node, { onClick: () => {
		console.log('you clicked on me');
	}});
}

export const addClick = (method, context, node) => {
	return addProps(node, { onClick: () => {
		console.log('clicked:', method, context);
		if (context[method]) {
			context[method].call(context);
		}
	}});
}

export const compose  = (...fns) => {
	return (...args) => {
		return fns.reduce((a, b) => {
			return b(a);
		}, ...args);
	}
}

export const withProp = (prop, Widget) => (props) => {
	if (!props[prop]) {
		return null;
	}
	return <Widget {...props} />;
}

export const withoutProp = (prop, Widget) => (props) => {
	if (props[prop]) {
		return null;
	}
	return <Widget {...props} />;
}

export const makeClickable = (component) => {
	const cmpt = clone(component);
	cmpt.props = mix(cmpt.props, {
		onClick () {
			console.log('added this sweet click');
		}
	});
	return cmpt;
}

export const toggleState = (options, component) => {
	const components = {};
	class ToggleState extends React.Component {
		constructor () {
			super();
			this.state = {
				[options.prop]: false
			};
			components.component = pure(addClick(options.method, this, component))
		}

		render () {
			console.log('render.state', this.state);
			return <components.component />;
		}
	}

	ToggleState.prototype[options.method] = function () {
		this.setState({
			[options.prop]: !this.state[options.prop]
		})
	}

	return ToggleState;
}