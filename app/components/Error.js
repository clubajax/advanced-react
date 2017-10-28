import React from 'react';


export default function Error ({ error }) {
	const msg = error.message || error.error || error;
	return (
		<div className="error-display">
			<i className="icon-error" />
			<span>{msg}</span>
		</div>
	)
}