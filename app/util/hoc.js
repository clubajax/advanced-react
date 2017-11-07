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

export const toggleClass = (toggleProp, className, Widget) => (props) => {
	const cls = props[toggleProp] ? className : '';
	return <Widget {...props} className={cls} />;
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

export const toggleState = (options, Component) => {
	const components = {};
	class ToggleState extends React.Component {
		constructor () {
			super();
			this.state = {
				[options.prop]: false
			};
			Component = addClick(options.method, this, Component);

			components.Component = toggleClass(options.prop, options.className, (props) => {
				return <Component {...props} />;
			});

			console.log('component', components.Component({}));

			// component = pure(component);
			// console.log('toggled', toggleClass(options.prop, options.className, component)({}));
			// console.log('component()', component());
			//components.Component = Component;
		}

		render () {
			return <components.Component />;
		}
	}

	ToggleState.prototype[options.method] = function () {
		this.setState({
			[options.prop]: !this.state[options.prop]
		})
	}

	return ToggleState;
}