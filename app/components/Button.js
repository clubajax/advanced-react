import React from 'react';

export default function Button (props) {
	const { busyText, busy, title, type, children } = props;
	console.log('busy:', busy, typeof busy);
	const all = {
		disabled: false,
		type: type || 'submit'
	};
	let content = title || children;
	if (busy) {
		content = (<span><span className="spinner" /><span>{busyText || 'Loading...'}</span></span>) ;
		all.disabled = true;
	}
	return <button type="submit" {...all} >{content}</button>;
}