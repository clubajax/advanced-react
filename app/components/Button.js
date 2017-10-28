import React from 'react';

export default function Button ({ busyText, busy, title, children, ...all }) {
	let content = title || children;
	if (busy) {
		content = (<span><span className="spinner" /><span>{busyText || 'Loading...'}</span></span>) ;
		all.disabled = true;
	}
	return <button type="submit" {...all} >{content}</button>;
}