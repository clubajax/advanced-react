import React from 'react';

export const mix = (props, added)  => Object.assign({}, props, added);

export const clone = obj => Object.assign({}, obj);

export const isClass = (component) => component && component.prototype && typeof component.prototype.render === 'function';

export const create = (node) => {
	return (props) => {
		const cloned = mix(node);
		cloned.props = mix(cloned.props, props);
		return cloned;
	}
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
};

export const withoutProp = (prop, Widget) => (props) => {
	if (props[prop]) {
		return null;
	}
	return <Widget {...props} />;
};

export const makeClickable = (component) => {
	const cmpt = clone(component);
	cmpt.props = mix(cmpt.props, {
		onClick () {
			console.log('added this sweet click');
		}
	});
	return cmpt;
}