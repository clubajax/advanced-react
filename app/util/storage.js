function storage (key, value) {
	if (value === undefined) {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : item;
	}
	window.requestAnimationFrame(() => {
		if (value === 'remove') {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});
	return value;
}

export default storage;