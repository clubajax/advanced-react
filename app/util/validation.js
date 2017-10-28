export function required (value) {
	return !!value ? false : 'This field is required';
}

export function password (value) {
	let msg = required(value);
	if (msg) {
		return msg;
	}
	if (!/\d{3,}/.test(value)) {
		return 'Password must be at least 3 numbers';
	}
	return false;
}